import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const DataClient = db.define('DataClient', {
  nama: { type: DataTypes.STRING, allowNull: false },
  kepemilikan: { type: DataTypes.STRING, allowNull: false },
  file: { type: DataTypes.BLOB('long'), allowNull: false }, // Ubah ke BLOB
  createdBy: { type: DataTypes.STRING }, // Tambahan
  updatedBy: { type: DataTypes.STRING }, // Tambahan
}, {
  freezeTableName: true
});


export default DataClient;

(async () => {
  await db.sync();
})();
