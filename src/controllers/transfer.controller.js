import { errorMessage } from '../helpers/message.js';
import { validateTransfer } from '../helpers/validate.js';

import TransferService from '../services/transfer.service.js';

export const getAll = async (req, res) => {
  try {
    const transfers = await TransferService.getAll();
    return res.status(200).json(transfers);
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export const create = async (req, res) => {
  try {
    validateTransfer(req);

    const { emisor, receptor, monto } = req.body;

    const transfer = await TransferService.create({
      emisor,
      receptor,
      monto,
    });

    return res.status(201).json(transfer);
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
}