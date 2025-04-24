import LembarKerja from '../model/LembarKerjaModel.js';

// Mendapatkan semua data lembar kerja dengan format file base64
export const getLembarKerja = async (req, res) => {
  try {
    const lembarKerjas = await LembarKerja.findAll();

    const lembarKerjasWithBase64 = lembarKerjas.map((item) => {
      const fileBase64 = item.file ? Buffer.from(item.file).toString('base64') : null;
      return {
        ...item.toJSON(),
        file: fileBase64 ? `data:application/pdf;base64,${fileBase64}` : null, // MIME bisa disesuaikan
      };
    });

    res.status(200).json(lembarKerjasWithBase64);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve data', error: error.message });
  }
};

// Membuat data baru
export const createLembarKerja = async (req, res) => {
  const { nama, kepemilikan, status, kategori, tanggalSelesai, createdBy } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'File is required' });

  try {
    const newLembarKerja = await LembarKerja.create({
      nama,
      kepemilikan,
      status,
      kategori,
      tanggalSelesai,
      file: file.buffer, // Simpan file sebagai BLOB
      createdBy,
    });
    res.status(201).json(newLembarKerja);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create LembarKerja', error: error.message });
  }
};

// Memperbarui data
export const updateLembarKerja = async (req, res) => {
  const { id } = req.params;
  const { nama, kepemilikan, status, kategori, tanggalSelesai, updatedBy } = req.body;
  let fileData = null;

  try {
    const lembarKerja = await LembarKerja.findByPk(id);
    if (!lembarKerja) return res.status(404).json({ message: 'Data not found' });

    if (req.file) {
      fileData = req.file.buffer; // Jika file baru ada, gunakan file baru
    } else {
      fileData = lembarKerja.file; // Jika tidak, gunakan file lama
    }

    await lembarKerja.update({
      nama,
      kepemilikan,
      status,
      kategori,
      tanggalSelesai,
      file: fileData,
      updatedBy,
    });

    res.status(200).json(lembarKerja);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update data', error: error.message });
  }
};

// Menghapus data
export const deleteLembarKerja = async (req, res) => {
  const { id } = req.params;

  try {
    const lembarKerja = await LembarKerja.findByPk(id);
    if (!lembarKerja) return res.status(404).json({ message: 'Data not found' });

    await lembarKerja.destroy();
    res.status(200).json({ message: 'LembarKerja deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete data', error: error.message });
  }
};
