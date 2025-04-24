import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  dayTransaction,
} from "../controller/TransactionController.js";
//import { authenticateToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// Semua endpoint dilindungi oleh autentikasi JWT
router.get("/transactions",  /*authenticateToken*/ getTransactions);
router.get("/transactions/:id",  /*authenticateToken*/ getTransactionById);
router.post("/transactions",  /*authenticateToken*/ createTransaction);
router.patch("/transactions/:id",  /*authenticateToken*/ updateTransaction);
router.delete("/transactions/:id",  /*authenticateToken*/ deleteTransaction);
router.get("/transactions/day",  /*authenticateToken*/ dayTransaction);


export default router;
