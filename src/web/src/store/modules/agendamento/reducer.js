import { produce } from 'immer';
import types from './types';


const INITIAL_STATE = {
  // agendamento: {},
  agendamentos: [],
};

function agendamento(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case '@agendamento/ALL': {
    case types.UPDATE_AGENDAMENTO: {
      return produce(state, (draft) => {
        draft.agendamentos = action.agendamentos;
        return draft;
      });
    //...
    }
    default:
      return state;
  }
}

export default agendamento;
