import { produce } from 'immer';
import types from './types';

const INITIAL_STATE = {
  behavior: 'create', // create, update, read
  clientes: [],
  components: {
    confirmDelete: false,
    drawer: false,
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  cliente: {
    email: '',
    nome: '',
    telefone: '',
    dataNascimento: '',
    documento: {
      tipo: 'cpf',
      numero: '',
    },
    endereco: {
      cidade: '',
      uf: '',
      cep: '',
      logradouro: '',
      numero: '',
      pais: 'BR',
    },
  },
  
};

    function cliente(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_CLIENTE: {
      console.log(action)
      return produce(state, (draft) => {
        draft = {...draft, ...action.payload };
        return draft;
      });
    }
    
    case types.RESET_CLIENTE: {
      console.log(action)
      return produce(state, (draft) => {
        draft.cliente = INITIAL_STATE.cliente;
        return draft;
      });
    }
    default: return state;
}

}

export default cliente;
