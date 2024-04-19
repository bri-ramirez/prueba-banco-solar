import { pool } from '../configs/db.js';

export const create = async (transfer) => {
  try {
    await pool.query('BEGIN');

    // Validar que el emisor tenga suficiente saldo
    const resultEmisor = await pool.query('SELECT * FROM usuarios WHERE id = $1', [transfer.emisor]);
    const emisor = resultEmisor.rows[0];

    if (emisor.balance < transfer.monto) {
      throw new Error('El usuario no tiene suficiente saldo para realizar la transferencia');
    }

    // Crear la transferencia
    await pool.query(
      'INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, now()) RETURNING *',
      [transfer.emisor, transfer.receptor, transfer.monto]
    );

    // Actualizar el balance del emisor
    await pool.query(
      'UPDATE usuarios SET balance = balance - $1 WHERE id = $2;',
      [transfer.monto, transfer.emisor]
    );

    // Actualizar el balance del receptor
    await pool.query(
      'UPDATE usuarios SET balance = balance + $1 WHERE id = $2;',
      [transfer.monto, transfer.receptor],
    );

    // Commit
    await pool.query('COMMIT');

    return true;
  } catch (error) {
    await pool.query('ROLLBACK');
    throw new Error(error.message);
  }
};

export const getAll = async () => {
  try {
    const transfers = await pool.query(
      `SELECT t.fecha, t.MONTO, emisor.nombre AS nombre_emisor, receptor.NOMBRE AS nombre_receptor
        FROM transferencias t 
        JOIN usuarios AS emisor ON t.EMISOR = emisor.ID
        JOIN usuarios AS receptor ON t.RECEPTOR = receptor.ID  
        ORDER BY fecha DESC;`);

    return transfers.rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default { create, getAll };
