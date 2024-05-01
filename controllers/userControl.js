import path from "path";
import {
  getUserQuery,
  addUserQuery,
  updateUserQuery,
  deleteUserQuery,
  addTransferQuery,
  getTransferenciasQuery,
} from "../queries/consultas.js";

const __dirname = import.meta.dirname;

const homeControl = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

const addUserControl = async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const datos = [nombre, balance];

    const result = await addUserQuery(datos);
    res.status(201).send(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserControl = async (req, res) => {
  try {
    const result = await getUserQuery();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUserControl = async (req, res) => {
  try {
    const { id } = req.query;
    const { nombre, balance } = req.body;

    const result = await updateUserQuery(nombre, balance, id);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteUserControl = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await deleteUserQuery(id);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

export {
  homeControl,
  addUserControl,
  getUserControl,
  updateUserControl,
  deleteUserControl,
};
