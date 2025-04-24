import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const LembarKerja = db.define('LembarKerja', {
  nama: { type: DataTypes.STRING, allowNull: false },
  kepemilikan: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: true },
  kategori: { type: DataTypes.STRING, allowNull: true },
  tanggalSelesai: { type: DataTypes.DATE, allowNull: true },
  file: { type: DataTypes.BLOB('long'), allowNull: true }, // Penyimpanan file sebagai BLOB
  createdBy: { type: DataTypes.STRING }, // Tambahan
  updatedBy: { type: DataTypes.STRING }, // Tambahan
}, {
  freezeTableName: true
});

export default LembarKerja;

// Sinkronisasi database
(async () => {
  await db.sync();
})();
