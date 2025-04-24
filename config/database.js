import { Sequelize } from "sequelize";

const db = new Sequelize("si_notaris", "root", "", {
  host: "localhost", // Host database
  dialect: "mysql", // Dialek database
});

export default db;
