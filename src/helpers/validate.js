export const validateUser = (req) => {
  if (!req.body.nombre) {
    throw new Error("El campo 'nombre' es requerido");
  }

  if (!req.body.balance) {
    throw new Error("El campo 'balance' es requerido");
  }
}

export const validateTransfer = (req) => {

  if (!req.body.monto) {
    throw new Error("El campo 'monto' es requerido");
  }

  if (!req.body.emisor) {
    throw new Error("El campo 'Emisor' es requerido");
  }

  if (!req.body.receptor) {
    throw new Error("El campo 'Receptor' es requerido");
  }

  if (req.body.emisor == req.body.receptor) {
    throw new Error("El emisor y el receptor no pueden ser el mismo usuario");
  }
}
