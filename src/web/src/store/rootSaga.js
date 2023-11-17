import { all } from 'redux-saga/effects';

import cliente from './modules/cliente/sagas';
import servico from './modules/servico/sagas';
import colaborador from './modules/colaborador/sagas';
import horario from './modules/horario/sagas';
import agendamento from './modules/agendamento/sagas';

export default function* rootSaga() {
  return yield all([cliente, servico, colaborador, horario, agendamento]);
}
