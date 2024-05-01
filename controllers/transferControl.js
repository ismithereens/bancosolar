import {
  addTransferQuery,
  getTransferenciasQuery,
} from "../queries/consultas.js";
const addTransferControl = async (req, res) => {
  try {
    const { emisor, receptor, monto } = req.body;
    const datos = [emisor, receptor, monto];
    const result = await addTransferQuery(datos);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
const getTransferenciasControl = async (req, res) => {
  try {
    const result = await getTransferenciasQuery();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
export {
  addTransferControl,
  getTransferenciasControl,
};
