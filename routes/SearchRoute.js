// routes/SearchRoute.js
import express from "express";
import { getClientByNIK } from "../controller/ClientController.js"; // Pastikan mengimpor fungsi yang benar
import { getLembarKerjaHistoriByKepemilikan, getStatusByKepemilikan } from "../controller/LembarKerjaController.js";


const router = express.Router();

// Rute untuk mencari client berdasarkan NIK
router.get('/clients/nik/:nik', getClientByNIK); 
router.get('/LembarKerja/histori/kepemilikan/:kepemilikan', getLembarKerjaHistoriByKepemilikan);
router.get('/LembarKerja/status/kepemilikan/:kepemilikan', getStatusByKepemilikan);


export default router;
