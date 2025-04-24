import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Client = db.define(
  "Client",
  {
    nama: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    contact: { type: DataTypes.STRING, allowNull: false },
    layanan: { type: DataTypes.STRING, allowNull: false },
    dataTanah: { type: DataTypes.STRING, allowNull: true },
    luasTanah: { type: DataTypes.FLOAT, allowNull: true },
    tglMasuk: { type: DataTypes.DATE, allowNull: false },
    tglSelesai: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false },
    alamat: { type: DataTypes.STRING, allowNull: true },
    deskripsi: { type: DataTypes.STRING, allowNull: true },
    tarif: { type: DataTypes.FLOAT, allowNull: false }, // Tambahkan tarif
    terbayar: { type: DataTypes.FLOAT, defaultValue: 0 }, // Tambahkan total pembayaran yang sudah dilakukan
    kekurangan: { 
      type: DataTypes.VIRTUAL,
      get() {
        return this.tarif - this.terbayar;
      }
    },
    keterangan: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.kekurangan > 0 ? "Belum Lunas" : "Lunas";
      }
    },
  },
  {
    freezeTableName: true,
  }
);

export default Client;

(async () => {
  await db.sync({ alter: true }); // Update skema tabel jika ada perubahan
})();
