import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import db from "./config/database.js";
import TamuRoute from "./routes/TamuRoute.js";
import ClientRoute from "./routes/ClientRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import LaporanRoute from "./routes/LaporanRoute.js";
import DataClientRoute from './routes/DataClientRoute.js';
import LembarKerjaRoute from './routes/LembarKerjaRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import SearchRoute from './routes/SearchRoute.js';
import { isAdmin } from "./middleware/RoleMiddleware.js";

//import { authenticateToken, isAdmin } from './middleware/authMiddleware.js';

const app = express();
const PORT = 5000; // Gunakan PORT dari environment variable jika tersedia

// Middleware
app.use(cors());
app.use(helmet()); // Meningkatkan keamanan header HTTP
app.use(compression()); // Mengurangi ukuran respons HTTP
app.use(express.json());
app.use(morgan("combined")); // Logging aktivitas HTTP
//app.get("/test", authenticateToken, (req, res) => {
 // res.json({ msg: "Token is valid", user: req.user });
//});

/*
// Rate limiting untuk mencegah serangan brute-force/DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 permintaan per IP
});
app.use(limiter);
*/

// Database connection
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

// Routes without authentication (Public routes)
app.use(AuthRoute);
app.use(SearchRoute);
app.use(TamuRoute);


// Protected routes (Require authentication)
//app.use(authenticateToken); // Middleware autentikasi

app.use(ClientRoute);
/*app.use(LembarKerjaRoute);*/
app.use(TransactionRoute);
/*app.use(LaporanRoute);*/
app.use(DataClientRoute);


// Routes for admin only (Protected with both authentication and role-based access)
app.use("/admin", isAdmin, UserRoute);
app.use("/admin", isAdmin, LembarKerjaRoute);
app.use("/admin", isAdmin, LaporanRoute);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
