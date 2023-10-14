import { produce } from 'immer';
import types from './types';

const INITIAL_STATE = {
  clientes: [],
};

    function clientes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_CLIENTES: {
      console.log(action)
      return produce(state, (draft) => {
        draft = {...draft, ...action.payload };
        return draft;
      });
    }
    default: return state;
}

}

export default clientes;
