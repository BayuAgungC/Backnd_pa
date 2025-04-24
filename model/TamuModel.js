import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Tamu = db.define(
  "Tamu",
  {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    noTelp: DataTypes.STRING,
    keperluan: DataTypes.STRING,
    tglKunjungan: DataTypes.DATE,
    jamKunjungan: DataTypes.TIME,
  },
  {
    freezeTableName: true,
  }
);

export default Tamu;

(async () => {
  await db.sync({ alter: true });
})();
