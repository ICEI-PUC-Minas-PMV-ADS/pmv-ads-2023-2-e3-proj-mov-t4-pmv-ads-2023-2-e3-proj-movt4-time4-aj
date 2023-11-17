import { takeLatest, all, call, put, select} from 'redux-saga/effects';
import api from '../../../services/api'
import consts from '../../../consts';
import types from './types';
import {
  updateSalao,
  updateServicos,
  updateAgenda,
  updateAgendamento,
  updateColaboradores,
  updateForm,
  updateCliente,
  updateAgendaCliente
} from './actions';
import moment from 'moment';
import util from '../../../util';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* getCliente() {
  try {
    const clienteId = yield call(AsyncStorage.getItem, '@user_id');
    const{ data: res } = yield call(api.get, `/cliente/${clienteId}`);

    if (res.error) {
      alert(err.message);
      return false;
  }

    yield put(updateCliente(res.cliente));
  } catch (error) {
    alert(error.message);
  }
}

  function* getAgendaCliente() {
  try {
    const clienteId = yield call(AsyncStorage.getItem, '@user_id');
    const{ data: res } = yield call(api.get, `/agendamento/filtrarPorCliente/${clienteId}`);

    if (res.error) {
      alert(err.message);
      return false;
  }

    yield put(updateAgendaCliente(res.agendamentos));
  } catch (error) {
    alert(error.message);
  }
}

export function* saveAgendamento() {
  try {
    yield put(updateForm('agendamentoLoading', true));

    const {agendamento} = yield select((state) => state.salao);
    const {data: res} = yield call(api.post, `/agendamento`, agendamento);
    
    if (res.error) {
      alert(res.message);
      return false;
    }

    Alert.alert('Ebaaaaa!!', 'Horário agendado com sucesso', [
      {text: 'Voltar', onPress: () => {}},
    ]);
    console.log(res);
    console.log(agendamento);
    yield put(updateForm('agendamentoLoading', false));
  } catch (err) {
    alert(err.message);
  }
}

export function* getSalao() {
  try {
    const{ data: res } = yield call(api.get, `/salao/${consts.salaoId}`)

        if (res.error) {
            alert(err.message);
            return false;
        }

        yield put(updateSalao(res.salao));
    }   catch(err){
        alert(err.message)
    }
}

export function* allServicos() {
    try {
      const {data: res} = yield call(api.get, `/servico/salao/${consts.salaoId}`);
      
      if (res.error) {
        alert(res.message);
        return false;
      }
  
      yield put(updateServicos(res.servicos));
    } catch (err) {
      alert(err.message);
    }
  }

export function* filterAgenda() {
  try {
    const {agendamento} = yield select(state => state.salao);
    const {data: res} = yield call(api.post, `/agendamento/dias-disponiveis`, {
      ...agendamento,
      data: moment().format('YYYY-MM-DD'),
    });

    if (res.error) {
      alert(err.message);
      return false;
    }

    console.tron.log(res)

    yield put(updateAgenda(res.agenda));
    yield put(updateColaboradores(res.colaboradores));


    const { horariosDisponiveis, data, colaboradorId } = yield call(util.selectAgendamento, res.agenda)
    yield put(updateAgendamento({
      data: moment(`${data}T${horariosDisponiveis[0][0]}`).format(),
      colaboradorId,
    }))

  } catch (err) {
    alert(err.message);
  }
}

export default all([
    takeLatest(types.GET_SALAO, getSalao),
    takeLatest(types.ALL_SERVICOS, allServicos),
    takeLatest(types.FILTER_AGENDA, filterAgenda),
    takeLatest(types.SAVE_AGENDAMENTO, saveAgendamento),
    takeLatest(types.GET_CLIENTE, getCliente),
    takeLatest(types.GET_AGENDA_CLIENTE, getAgendaCliente),
]);