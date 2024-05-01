import express from "express";
import {
  homeControl,
  addUserControl,
  getUserControl,
  updateUserControl,
  deleteUserControl,
} from "../controllers/userControl.js";
import {
  addTransferControl,
  getTransferenciasControl
} from '../controllers/transferControl.js'
const router = express.Router();
router.get("/", homeControl);
router.post("/usuario", addUserControl);
router.get("/usuarios", getUserControl);
router.put("/usuario", updateUserControl);
router.delete("/usuario", deleteUserControl);
router.post("/transferencia", addTransferControl);
router.get("/transferencias", getTransferenciasControl);
export default router;
