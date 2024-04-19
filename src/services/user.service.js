import { pool } from '../configs/db.js';

export const create = async (user) => {
  try {
    const userCreate = await pool.query(
      'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *',
      [user.nombre, user.balance]
    );

    return userCreate.rows[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAll = async () => {
  try {
    const users = await pool.query('SELECT * FROM usuarios ORDER BY nombre ASC');

    return users.rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateById = async (id, user) => {
  try {
    const userUpdate = await pool.query(
      'UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *',
      [user.nombre, user.balance, id]
    );

    console.log(userUpdate);

    return userUpdate.rows[0];
  } catch (error) {
    console.log(error);
    return false;
  }
  
};

export const deleteById = async (id) => {
  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default { create, getAll, updateById, deleteById };
