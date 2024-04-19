import { errorMessage } from '../helpers/message.js';
import { validateUser } from '../helpers/validate.js';

import UserService from '../services/user.service.js';

export const create = async (req, res) => {
  try {
    validateUser(req);

    const { nombre, balance } = req.body;

    const user = await UserService.create({
      nombre,
      balance,
    });

    return res.status(201).json(user);
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateById = async (req, res) => {
  try {
    validateUser(req);

    const id = req.query.id;
    const { nombre, balance } = req.body;

    const userUpdated = await UserService.updateById(id, {
      nombre,
      balance
    });

    return res.status(200).json(userUpdated);
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req, res) => {
  try {

    if (!req.query.id) {
      errorMessage("El campo 'id' es requerido");
      return res.status(400).json({ message: "El campo 'id' es requerido" });
    }

    const id = req.query.id;
    await UserService.deleteById(id);
    return res.status(200).json({ message: 'Usuario eliminado!' });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
};
