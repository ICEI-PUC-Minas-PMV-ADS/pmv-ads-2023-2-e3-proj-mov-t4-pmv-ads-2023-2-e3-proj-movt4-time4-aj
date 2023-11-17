import types from './types';
import {produce} from 'immer';
import consts from '../../../consts';
import * as _ from 'lodash'

const INITIAL_STATE = {
  salao: {},
  servicos: [],
  cliente: [],
  agenda: [],
  agendamentos: [],
  colaboradores: [],
  agendamento: {
    clienteId: null,
    salaoId: consts.salaoId,
    servicoId: null,
    colaboradorId: null,
    data: null,
  },
  form: {
    inputFiltro: '',
    inputFiltroFoco: false,
    modalEspecialista: false,
    modalAgendamento: 0,
    agendamentoLoading: false,
  },
};


function salao(state = INITIAL_STATE, action) {
  switch (action.type) {

    case types.UPDATE_CLIENTE_ID:
      return produce(state, draft => {
        draft.agendamento.clienteId = action.payload;
      });

    case types.UPDATE_AGENDAMENTO: {
      return produce(state, (draft) => {
        if (action.agendamento.servicoId) {
          draft.form.modalAgendamento = 1;
        }

        draft.agendamento = {...state.agendamento, ...action.agendamento};
        return draft;
      });
    }
    case types.UPDATE_CLIENTE: {
      return produce(state, draft => {
        draft.cliente = action.cliente;
      });
    }
    
    case types.UPDATE_AGENDA_CLIENTE: {
      return produce(state, draft => {
        draft.agendamentos = action.agendamentos;
      });
    }
    case types.CLOSE_AGENDAMENTO: {
      return produce(state, (draft) => {
        if (draft.agendamento) {
        draft.agendamento.servicoId = null;
        draft.agendamento.colaboradorId = null;
        draft.agendamento.data = null;
        draft.form.modalAgendamento = 0;
        }
      });
    }
    case types.UPDATE_FORM: {
      return produce(state, (draft) => {
        draft.form = {...state.form, ...action.form };
      });
    }
    case types.UPDATE_SALAO: {
      return produce(state, (draft) => {
        draft.salao = {...draft.salao, ...action.salao};
      });
    }
    case types.UPDATE_SERVICOS: {
      return produce(state, (draft) => {
        draft.servicos = action.servicos;
      });
    }
    case types.UPDATE_AGENDA: {
      return produce(state, (draft) => {
        draft.agenda = [...state.agenda, ...action.agenda];
      });
    }
    case types.UPDATE_COLABORADORES: {
      return produce(state, (draft) => {
        draft.colaboradores = _.uniq([
          ...draft.colaboradores,
          ...action.colaboradores,
        ]);
      });
    }    
    case types.RESET_AGENDAMENTO: {
      return produce(state, (draft) => {
        draft.agenda = INITIAL_STATE.agenda;
        draft.colaboradores = INITIAL_STATE.colaboradores;
        draft.agendamento = INITIAL_STATE.agendamento;
      });
    }
    default: {
      return state;
    }
  }
}

export default salao;