import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createLembarKerja,
  getLembarKerja,
  updateLembarKerja,
  deleteLembarKerja
} from '../controller/LembarKerjaController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Konfigurasi multer untuk file upload menggunakan memoryStorage untuk BLOB
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes for /LembarKerja
router.get('/LembarKerja',  /*authenticateToken*/ getLembarKerja);
router.post('/LembarKerja',  /*authenticateToken*/ upload.single('file'), createLembarKerja);
router.patch('/LembarKerja/:id',  /*authenticateToken*/ upload.single('file'), updateLembarKerja);
router.delete('/LembarKerja/:id',  /*authenticateToken*/ deleteLembarKerja);

export default router;
