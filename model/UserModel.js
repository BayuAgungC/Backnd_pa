import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

const { DataTypes } = Sequelize;

const User = db.define(
  "User",
  {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "staff"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default User;

(async () => {
  try {
    await db.sync({ alter: true }); // Sinkronisasi dengan alter
    console.log("Database synced successfully.");

    // Cek apakah pengguna awal sudah ada
    const username = "admin";
    const password = "admin123"; // Anda bisa mengganti ini sesuai kebutuhan
    const role = "admin";

    const existingUser = await User.findOne({ where: { username } });

    // Jika pengguna belum ada, buat pengguna awal
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing password
      await User.create({
        username,
        password: hashedPassword,
        role,
      });
      console.log("Initial admin user created with username:", username);
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();
