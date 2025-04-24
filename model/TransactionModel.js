import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Transaction = db.define(
  "transactions",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Ini opsional, hanya diisi jika transaksi terkait klien
    },
  },
  {
    freezeTableName: true,
  }
);

export default Transaction;

(async () => {
  await db.sync({ alter: true });
})();
