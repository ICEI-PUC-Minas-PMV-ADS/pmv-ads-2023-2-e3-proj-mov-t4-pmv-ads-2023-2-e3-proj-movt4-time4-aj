import { combineReducers } from 'redux'

import clientes from './modules/cliente/reducer';
// import servico from './modules/servico/reducer';
// import colaborador from './modules/colaborador/reducer';
// import horario from './modules/horario/reducer';
import agendamento from './modules/agendamento/reducer';

export default combineReducers({
  clientes,
  // servico,
  // colaborador,
  // horario,
  agendamento,
});