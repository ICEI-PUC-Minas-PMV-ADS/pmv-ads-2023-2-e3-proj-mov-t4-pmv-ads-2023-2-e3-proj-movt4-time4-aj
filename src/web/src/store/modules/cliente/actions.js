import types from './types';

export function allClientes() {
  return { type: types.ALL_CLIENTES };
}

export function updateClientes(payload) {
  return { type: types.UPDATE_CLIENTES, payload };
}
