// model/LembarKerjaHistoriModel.js

import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const LembarKerjaHistori = db.define('LembarKerjaHistori', {
  lembarKerjaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'LembarKerja', // Menghubungkan dengan tabel LembarKerja
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggalStatus: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

export default LembarKerjaHistori;

// Sinkronisasi database untuk histori
(async () => {
  await db.sync();
})();
