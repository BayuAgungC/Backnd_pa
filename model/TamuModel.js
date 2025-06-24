import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Tamu = db.define(
  "Tamu",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,  // Menambahkan validasi agar nama tidak null
      defaultValue: 'Anonymous',  // Nilai default jika nama kosong
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Address',  // Nilai default jika alamat kosong
    },
    noTelp: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Phone',  // Nilai default jika noTelp kosong
    },
    keperluan: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Purpose',  // Nilai default jika keperluan kosong
    },
    tglKunjungan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,  // Nilai default jika tglKunjungan kosong
    },
    jamKunjungan: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '12:00:00',  // Nilai default jika jamKunjungan kosong
    },
  },
  {
    freezeTableName: true,
  }
);


export default Tamu;

(async () => {
  await db.sync({ alter: true });
})();
