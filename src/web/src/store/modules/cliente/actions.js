import types from './types';

export function allClientes() {
  return { type: types.ALL_CLIENTES };
}

export function updateCliente(payload) {
  return { type: types.UPDATE_CLIENTE, payload };
}

export function filterClientes() {
  return { type: types.FILTER_CLIENTES };
}

export function addCliente() {
  return { type: types.ADD_CLIENTE };
}

export function resetCliente() {
  return { type: types.RESET_CLIENTE };
}

export function unlinkCliente(clienteId) {
  return { type: types.UNLINK_CLIENTE, clienteId };
}
