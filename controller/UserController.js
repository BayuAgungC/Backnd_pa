import User from "../model/UserModel.js";
import bcrypt from "bcrypt";

// Allowed roles for validation
const allowedRoles = ['admin', 'staff'];

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  // Validate role
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ msg: "Invalid role" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { password, role } = req.body;

  // Validate role
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ msg: "Invalid role" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.update(
      { password: hashedPassword, role },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};