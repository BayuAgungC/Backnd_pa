import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
/*
// Memuat variabel lingkungan dari file .env
dotenv.config();

// Ambil secret key dari environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware untuk autentikasi (memeriksa keberadaan dan validitas token)
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Mendapatkan token dari header Authorization

  // Log untuk memeriksa apakah token ada
  console.log("Received Token:", token);

  if (!token) {
    console.log("Token missing in headers:", req.headers); // Log jika token tidak ada
    return res.status(401).json({ msg: "Token is missing" }); // Mengembalikan 401 jika token tidak ditemukan
  }

  // Verifikasi token dengan JWT_SECRET
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token:", err.message); // Log jika token tidak valid
      return res.sendStatus(403); // Mengembalikan 403 jika token tidak valid
    }

    // Log untuk memeriksa informasi user setelah token diverifikasi
    console.log("User verified:", user);
    req.user = user; // Menyimpan data user pada request untuk digunakan di middleware berikutnya
    next(); // Melanjutkan ke middleware berikutnya
  });
};*/

// Middleware untuk mengecek role admin (hanya memperbolehkan akses jika role adalah admin)

export const isAdmin = (req, res, next) => {
  // Log untuk memeriksa role user yang sudah diverifikasi
  console.log("User role:", req.user ? req.user.role : "No user data");

  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" }); // Mengembalikan 403 jika bukan admin
  }

  next(); // Melanjutkan ke route jika role admin
};
/*
export const checkRole = (roles) => {
  return (req, res, next) => {
    // Log untuk memeriksa role user yang sudah diverifikasi
    console.log("User role:", req.user ? req.user.role : "No user data");

    // Mengecek apakah ada user yang terverifikasi dan apakah role user sesuai dengan roles yang diizinkan
    if (req.user && roles.includes(req.user.role)) {
      return next(); // Melanjutkan ke route jika role sesuai
    }

    // Mengembalikan 403 jika role user tidak sesuai
    return res.status(403).json({ msg: "Access denied" });
  };
};
*/