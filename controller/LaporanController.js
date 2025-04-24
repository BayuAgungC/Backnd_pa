import Laporan from "../model/LaporanModel.js";

// Create laporan
export const createLaporan = async (req, res) => {
  const { nama, bulan, tahun, jenis } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "File is required" });

  try {
    const newLaporan = await Laporan.create({
      nama,
      bulan,
      tahun,
      jenis,
      file: file.buffer, // Simpan file sebagai BLOB (binary data)
    });
    res.status(201).json(newLaporan);
  } catch (error) {
    res.status(500).json({ message: "Failed to create laporan", error: error.message });
  }
};

// Get all laporan
export const getLaporans = async (req, res) => {
  try {
    const laporans = await Laporan.findAll();

    // Konversi setiap file BLOB menjadi base64 untuk dikirimkan ke frontend
    const laporansWithBase64 = laporans.map((laporan) => {
      const fileBase64 = laporan.file ? Buffer.from(laporan.file).toString("base64") : null;
      return {
        ...laporan.toJSON(),
        file: fileBase64 ? `data:application/pdf;base64,${fileBase64}` : null, // sesuaikan dengan jenis file
      };
    });

    res.status(200).json(laporansWithBase64);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve laporan", error: error.message });
  }
};

// Update laporan
export const updateLaporan = async (req, res) => {
  const { id } = req.params;
  const { nama, bulan, tahun, jenis } = req.body;
  let fileData = null;

  try {
    const laporan = await Laporan.findByPk(id);
    if (!laporan) return res.status(404).json({ message: "Laporan not found" });

    if (req.file) {
      fileData = req.file.buffer; // Update file dengan buffer baru
    } else {
      fileData = laporan.file; // Gunakan file lama jika tidak ada file baru
    }

    // Update laporan
    await laporan.update({
      nama,
      bulan,
      tahun,
      jenis,
      file: fileData,
    });

    res.status(200).json({ message: "Laporan updated", laporan });
  } catch (error) {
    res.status(500).json({ message: "Failed to update laporan", error: error.message });
  }
};

// Delete laporan
export const deleteLaporan = async (req, res) => {
  const { id } = req.params;

  try {
    const laporan = await Laporan.findByPk(id);
    if (!laporan) return res.status(404).json({ message: "Laporan not found" });

    await laporan.destroy();
    res.status(200).json({ message: "Laporan deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete laporan", error: error.message });
  }
};
