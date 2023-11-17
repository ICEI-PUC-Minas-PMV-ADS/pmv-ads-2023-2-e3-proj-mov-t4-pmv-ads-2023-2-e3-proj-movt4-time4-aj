import {produce} from 'immer';
import types from './types';

const INITIAL_STATE = {
  behavior: 'create', // create, update, read
  components: {
    confirmDelete: false,
    drawer: false,
    tab: 'dados-cadastrais', // dados-cadastrais, agendamentos, arquivos
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  colaborador: {
    nome: '',
    email: '',
    tipo: 'individual',
    documento: {
      tipo: 'cpf',
      numero: '',
    },
    dataNascimento: '',
    telefone: '',
    status: 'A',
    especialidades: [],
    contaBancaria: {
      banco: '',
      tipoConta: 'checking',
      agencia: '',
      numero: '',
      dv: '',
    },
  },
  colaboradores: [],
  servicos: [],
};

function colaborador(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_COLABORADOR: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    case types.RESET_COLABORADOR: {
      return produce(state, (draft) => {
        draft.colaborador = INITIAL_STATE.colaborador;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default colaborador;
