import types from './types';


export function getCliente() {
  return {type: types.GET_CLIENTE };
}

export function updateCliente(cliente) {
  return {type: types.UPDATE_CLIENTE, cliente};
}

export function getAgendaCliente() {
  return {type: types.GET_AGENDA_CLIENTE };
}

export function updateAgendaCliente(agendamentos) {
  return {type: types.UPDATE_AGENDA_CLIENTE, agendamentos};
}

export const updateClient = (clienteId) => ({
  type: types.UPDATE_CLIENTE_ID,
  payload: clienteId,
});

export function updateForm(form) {
  return {type: types.UPDATE_FORM, form};
}
export function getSalao() {
  return {type: types.GET_SALAO};
}

export function updateSalao(salao) {
  return {type: types.UPDATE_SALAO, salao};
}

export function allServicos() {
  return {type: types.ALL_SERVICOS};
}

export const setClienteId = (clienteId) => ({
  type: types.SET_CLIENTE_ID,
  payload: clienteId,
});

export const updateAgendamentos = (agendamentos) => ({
  type: types.UPDATE_AGENDAMENTOS,
  agendamentos,
});

export function updateServicos(servicos) {
  return {type: types.UPDATE_SERVICOS, servicos};
}

export function updateAgendamento(agendamento) {
  return {type: types.UPDATE_AGENDAMENTO, agendamento};
}

export function closeAgendamento(closeAgendamento) {
  return {type: types.CLOSE_AGENDAMENTO, closeAgendamento};
};

export function filterAgenda() {
  return {type: types.FILTER_AGENDA};
}

export function updateAgenda(agenda) {
  return {type: types.UPDATE_AGENDA, agenda};
}

export function updateColaboradores(colaboradores) {
  return {type: types.UPDATE_COLABORADORES, colaboradores};
}

export function resetAgendamento() {
  return {type: types.RESET_AGENDAMENTO};
}

export function saveAgendamento() {
  return {type: types.SAVE_AGENDAMENTO};
}
