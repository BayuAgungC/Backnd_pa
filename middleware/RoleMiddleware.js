
export const isAdmin = (req, res, next) => {
  // Log untuk memeriksa role user yang sudah diverifikasi
  console.log("User role:", req.user ? req.user.role : "No user data");

  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" }); // Mengembalikan 403 jika bukan admin
  }

  next(); // Melanjutkan ke route jika role admin
};
