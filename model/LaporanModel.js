import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Laporan = db.define(
  "laporan",
  {
    nama: DataTypes.STRING,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    jenis: DataTypes.STRING,
    file: DataTypes.BLOB("long"), // Ubah menjadi BLOB untuk menyimpan file di database
  },
  {
    freezeTableName: true,
  }
);

export default Laporan;

(async () => {
  await db.sync();
})();
