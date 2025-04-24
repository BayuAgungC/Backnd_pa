import express from "express";
import {
  createTamu,
  getTamus,
  getTamusById,
  updateTamu,
  deleteTamu
} from "../controller/TamuController.js";
//import {  /*authenticateToken*/ } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/Tamus",  /*authenticateToken*/ getTamus);
router.get("/Tamus/:id",  /*authenticateToken*/ getTamusById);
router.post("/Tamus",  /*authenticateToken*/ createTamu);
router.patch("/Tamus/:id",  /*authenticateToken*/ updateTamu);
router.delete("/Tamus/:id",  /*authenticateToken*/ deleteTamu);

export default router;
