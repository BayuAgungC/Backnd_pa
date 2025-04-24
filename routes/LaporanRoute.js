import express from "express";
import { createLaporan, getLaporans, deleteLaporan, updateLaporan } from "../controller/LaporanController.js";
import multer from "multer";
//import { /*authenticateToken*/} from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer setup for file upload (use memoryStorage for BLOB storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    // Accept only images and PDF
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return cb(new Error("Only image and PDF files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Routes
router.post("/laporans", /*authenticateToken*/ upload.single("file"), createLaporan);
router.get("/laporans", /*authenticateToken*/ getLaporans);
router.patch("/laporans/:id", /*authenticateToken*/ upload.single("file"), updateLaporan); // Corrected here
router.delete("/laporans/:id", /*authenticateToken*/ deleteLaporan); // Corrected here

export default router;
