import express from 'express';
import multer from 'multer';
import { createDataClient, getDataClients, updateDataClient, deleteDataClient } from '../controller/DataClientController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer setup for file uploads (using memory storage to keep files in buffer)
const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.get('/dataclients', /*authenticateToken*/getDataClients);
router.post('/dataclients', /*authenticateToken*/upload.single('file'), createDataClient);
router.patch('/dataclients/:id', /*authenticateToken*/ upload.single('file'), updateDataClient);
router.delete('/dataclients/:id', /*authenticateToken*/deleteDataClient);

export default router;
