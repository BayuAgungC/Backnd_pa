import LembarKerja from '../model/LembarKerjaModel.js';
import LembarKerjaHistori from '../model/LembarKerjaHistoriModel.js'; // Import model histori

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
// Membuat data baru
export const createLembarKerja = async (req, res) => {
  const { nama, kepemilikan, status, kategori, tanggalSelesai, createdBy } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'File is required' });

  try {
    // Membuat LembarKerja Baru
    const newLembarKerja = await LembarKerja.create({
      nama,
      kepemilikan,
      status,
      kategori,
      tanggalSelesai,
      file: file.buffer, // Simpan file sebagai BLOB
      createdBy,
    });

    // Menyimpan histori status awal (misalnya "draft") saat pembuatan
    await LembarKerjaHistori.create({
      lembarKerjaId: newLembarKerja.id,
      status: status, // Status yang baru dibuat (misalnya "draft")
      tanggalStatus: new Date(), // Tanggal saat dibuat
      kepemilikan: kepemilikan, // Menyimpan kepemilikan pada histori
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
    if (!lembarKerja) return res.status(404).json({ message: 'Data tidak ditemukan' });

    // Simpan histori status lama jika ada perubahan status
    // Hanya simpan histori jika ada perubahan status
    if (lembarKerja.status !== status) {
      // Simpan histori perubahan status yang baru (status yang baru setelah perubahan)
      await LembarKerjaHistori.create({
        lembarKerjaId: id,
        status: status,  // Status baru yang diterima
        tanggalStatus: new Date(), // Tanggal perubahan
        kepemilikan: kepemilikan, // Menyimpan kepemilikan pada histori
      });
    }

    // Jika ada file baru, gunakan file baru
    if (req.file) {
      fileData = req.file.buffer;
    } else {
      fileData = lembarKerja.file;
    }

    // Perbarui lembar kerja dengan data baru
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
    res.status(500).json({ message: 'Gagal memperbarui data', error: error.message });
  }
};

// Menghapus data
export const deleteLembarKerja = async (req, res) => {
  const { id } = req.params;

  try {
    // Menghapus histori yang terkait dengan LembarKerja
    await LembarKerjaHistori.destroy({
      where: { lembarKerjaId: id }, // Hapus histori berdasarkan id LembarKerja
    });

    // Menghapus data LembarKerja
    const lembarKerja = await LembarKerja.findByPk(id);
    if (!lembarKerja) return res.status(404).json({ message: 'Data not found' });

    await lembarKerja.destroy();
    res.status(200).json({ message: 'LembarKerja deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete data', error: error.message });
  }
};

export const getLembarKerjaHistori = async (req, res) => {
  const { id } = req.params;

  try {
    const histori = await LembarKerjaHistori.findAll({
      where: { lembarKerjaId: id },
      order: [['tanggalStatus', 'ASC']], // Urutkan berdasarkan tanggal
    });
    res.status(200).json(histori);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan histori', error: error.message });
  }
};


export const getLembarKerjaHistoriByKepemilikan = async (req, res) => {
  const { kepemilikan } = req.params; // Ambil kepemilikan dari parameter URL

  try {
    const histori = await LembarKerjaHistori.findAll({
      where: { kepemilikan: kepemilikan }, // Filter berdasarkan kepemilikan
      order: [['tanggalStatus', 'ASC']], // Urutkan berdasarkan tanggal
    });

    if (!histori || histori.length === 0) {
      return res.status(404).json({ message: 'Histori tidak ditemukan untuk kepemilikan ini' });
    }

    res.status(200).json(histori); // Kembalikan histori yang ditemukan
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan histori berdasarkan kepemilikan', error: error.message });
  }
};


// Mendapatkan status LembarKerja berdasarkan Kepemilikan
export const getStatusByKepemilikan = async (req, res) => {
  const { kepemilikan } = req.params; // Ambil kepemilikan dari parameter URL

  try {
    // Menemukan semua data LembarKerja berdasarkan kepemilikan
    const lembarKerjas = await LembarKerja.findAll({
      where: { kepemilikan: kepemilikan }, // Filter berdasarkan kepemilikan
      attributes: ['status'], // Hanya ambil kolom status
    });

    if (!lembarKerjas || lembarKerjas.length === 0) {
      return res.status(404).json({ message: 'Tidak ada data lembar kerja untuk kepemilikan ini' });
    }

    // Mengembalikan status untuk semua lembar kerja yang ditemukan
    const statuses = lembarKerjas.map(lembarKerja => lembarKerja.status);
    res.status(200).json(statuses); // Kembalikan status
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan status LembarKerja', error: error.message });
  }
};

