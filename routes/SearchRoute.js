// routes/SearchRoute.js
import express from "express";
import { getClientByNIK } from "../controller/ClientController.js"; // Pastikan mengimpor fungsi yang benar

const router = express.Router();

// Rute untuk mencari client berdasarkan NIK
router.get('/clients/nik/:nik', getClientByNIK); 

export default router;
