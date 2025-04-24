import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/UserModel.js";

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User found: ", user.username);

    // Log password dari input dan password hash dari database
    console.log("Password input: ", password);
    console.log("Password hash from DB: ", user.password);

    // Cek apakah password cocok dengan hash yang disimpan di database
    const match = await bcrypt.compare(password, user.password);
    console.log("Password match: ", match); // True jika cocok, false jika tidak cocok
    if (!match) {
      console.log("Invalid password");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Password matched for user: ", username);

    // Jika password cocok, generate token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, "secret", {
      expiresIn: "1d",
    });

    console.log("Token generated: ", token);

    // Kirim token dan role ke frontend
    res.json({ token, role: user.role });
  } catch (error) {
    console.log("Error during login: ", error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Logout (Sederhana)
export const logout = (req, res) => {
  res.json({ msg: "Logout successful" });
};