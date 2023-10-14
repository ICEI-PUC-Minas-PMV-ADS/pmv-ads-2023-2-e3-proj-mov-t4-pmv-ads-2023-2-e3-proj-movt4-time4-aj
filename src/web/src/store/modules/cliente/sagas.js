import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { updateClientes } from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allClientes() {
  try {
    const { data: res } = yield call(
      api.get,
      `/cliente/salao/${consts.salaoId}`
    );

    
    if (res.error) {
        alert(res.message)
        return false;
      }
      
    yield put(updateClientes({ clientes: res.clientes }));

  } catch (err) {
    alert(err.message)
  }
}

export default all([takeLatest(types.ALL_CLIENTES, allClientes),]);
