import pool from "../config/db.js";
const addUserQuery = async (datos) => {
  try {
    const addUser = {
      text: "insert into usuarios (nombre,balance) values($1,$2) returning *",
      values: datos,
    };
    const result = await pool.query(addUser);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};
const getUserQuery = async () => {
  try {
    const getUser = {
      text: "select * from usuarios",
    };
    const result = await pool.query(getUser);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};
const updateUserQuery = async (nombre, balance, id) => {
  try {
    const updateUser = {
      text: "update usuarios set nombre = $1, balance = $2 where id = $3 returning *",
      values: [nombre, balance, id],
    };
    const result = await pool.query(updateUser);
    if (result.rowCount === 0) {
      throw new Error("No se edito el usuario");
    } else {
      result.rows[0];
    }

    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const deleteUserQuery = async (id) => {
  try {
    const deleteUser = {
      text: "delete from usuarios where id = $1 returning *",
      values: [id],
    };
    const result = await pool.query(deleteUser);
    if (result.rowCount === 0) {
      throw new Error("No se elimino el usuario");
    } else {
      result.rows[0];
    }
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const addTransferQuery = async (datos) => {
  const [emisor, receptor, monto] = datos;
  const { id: emisorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
  ).rows[0];
  const { id: receptorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
  ).rows[0];
  const addTransfer = {
    text: "insert into transferencias (emisor,receptor,monto,fecha) values($1,$2,$3,now()) returning *",
    values: [emisorId, receptorId, monto],
  };

  const actualizarEmisor = {
    text: `update usuarios set balance = balance - $1 where nombre = $2 returning *`,
    values: [monto, emisor],
  };
  const actualizarReceptor = {
    text: `update usuarios set balance = balance + $1 where nombre = $2 returning *`,
    values: [monto, receptor],
  };
  try {
    await pool.query("begin");
    await pool.query(actualizarEmisor);
    await pool.query(actualizarReceptor);
    const result = await pool.query(addTransfer);
    await pool.query("commit");
    console.log(result.rows);
    return true;
  } catch (err) {
    await pool.query("rollback");
    return err;
  }
};
const getTransferenciasQuery = async () => {
  try {
    const getTransferencias = {
      text: `SELECT e.nombre 
      AS emisor,
      r.nombre AS receptor,
      t.monto,
      t.fecha
    FROM transferencias t
    JOIN usuarios e ON t.emisor = e.id
    JOIN usuarios r ON t.receptor = r.id;`,
      rowMode: "array",
    };

    const result = await pool.query(getTransferencias);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

export {
  addUserQuery,
  getUserQuery,
  updateUserQuery,
  deleteUserQuery,
  addTransferQuery,
  getTransferenciasQuery,
};
