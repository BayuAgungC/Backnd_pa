import express from "express";
import {
  createClient,
  getClients,
  getClientsById,
  updateClient,
  deleteClient,
  getClientByNIK
} from "../controller/ClientController.js";
//import { authenticateToken*/ } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for Clients
router.get("/clients",/* authenticateToken*/  getClients);
router.get("/clients/:id", /*authenticateToken*/ getClientsById);
router.post("/clients", /*authenticateToken*/ createClient);
router.patch("/clients/:id", /*authenticateToken*/ updateClient);
router.delete("/clients/:id", /*authenticateToken*/ deleteClient);


export default router;
