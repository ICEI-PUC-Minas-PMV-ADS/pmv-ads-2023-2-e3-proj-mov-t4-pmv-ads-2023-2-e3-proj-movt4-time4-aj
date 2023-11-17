 import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import {
  updateColaborador,
  resetColaborador,
  allColaboradores as allColaboradoresAction,
} from './actions';
import types from './types';
import api from '../../../services/api';
import { notification } from '../../../services/rsuite';
import consts from '../../../consts';

export function* filterColaborador({ filters }) {
  console.log("Iniciando filterColaborador");
  const { form, colaborador } = yield select((state) => state.colaborador);

  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));

    const { data: res } = yield call(api.post, '/colaborador/filter', {
      filters: {
        email: colaborador.email,
        status: 'A',
      }
    });
    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    if (res.colaboradores.length > 0) {
      yield put(
        updateColaborador({
          colaborador: res.colaboradores[0],
          form: { ...form, filtering: false, disabled: true },
        })
      );
    } else {
      yield put(
        updateColaborador({
          form: { ...form, filtering: false, disabled: false },
        })
      );
    }
    console.log("filterColaborador concluído com sucesso");

    console.log(res.colaboradores);
  } catch (err) {
    console.error("Erro em filterColaborador:", err);
    // COLOCAR AQUI O ALERT DO RSUITE
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* addColaborador() {
  const { colaborador, form, components, behavior } = yield select(
    (state) => state.colaborador
  );

  try {

    yield put(updateColaborador({ form: { ...form, saving: true } }));

    let res = {};

    if (behavior == 'create'){
      const response = yield call(api.post, '/colaborador', {
        salaoId: consts.salaoId,
        colaborador,
      });
      res = response.data;

    }else{
      const response = yield call(api.put, `/colaborador/${colaborador._id}`, {
        vinculo: colaborador.vinculo,
        vinculoId: colaborador.vinculoId,
        especialidades: colaborador.especialidades,
      });
      res = response.data;
    }

    
    yield put(updateColaborador({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(allColaboradoresAction());
    yield put(
      updateColaborador({ components: { ...components, drawer: false } })
    );
    yield put(resetColaborador());

    notification('success', {
      placement: 'topStart',
      title: 'Feitoooo!!',
      description: 'Colaborador salvo com sucesso!',
    });
  } catch (err) {
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* allColaboradores() {
  console.log("Iniciando allColaboradores");

  const { form } = yield select((state) => state.colaborador);

  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));

    const { data: res } = yield call(
      api.get,
      `/colaborador/salao/${consts.salaoId}`
    );
    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message)
      return false;
    }

    console.log("allColaboradores concluído com sucesso");

    yield put(updateColaborador({ colaboradores: res.colaboradores }));
  } catch (err) {
    console.error("Erro em allColaboradores:", err);

    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    alert(err.message)
  }
}

export function* unlinkColaborador({ payload }) {
  const { form, components, colaborador } = yield select(
    (state) => state.colaborador
  );

  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));

    const { data: res } = yield call(
      api.delete,
      `/colaborador/vinculo/${colaborador.vinculoId}`
    );
    yield put(updateColaborador({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    notification('success', {
      placement: 'topStart',
      title: 'Tudo certo',
      description: 'O colaborador foi desvinculado com sucesso!',
    });

    yield put(allColaboradoresAction());
    yield put(
      updateColaborador({
        components: { ...components, drawer: false, confirmDelete: false },
      })
    );
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    yield put(updateColaborador({ form: { ...form, saving: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* allServicos() {
  const { form } = yield select(
    (state) => state.colaborador
    );

  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));

    const { data: res } = yield call(
      api.get,
      `/salao/servicos/${consts.salaoId}`
    );
    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    console.log(res);

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(updateColaborador({ servicos: res.servicos }));
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* saveColaborador() {
  const { colaborador, form, components } = yield select(
    (state) => state.colaborador
  );

  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));
    const { vinculo, vinculoId, especialidades } = colaborador;

    const { data: res } = yield call(
      api.put,
      `/colaborador/${colaborador._id}`,
      { vinculo, vinculoId, especialidades }
    );
    yield put(updateColaborador({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(allColaboradoresAction());
    yield put(
      updateColaborador({ components: { ...components, drawer: false } })
    );
    yield put(resetColaborador());
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    yield put(updateColaborador({ form: { ...form, saving: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export default all([
  takeLatest(types.ADD_COLABORADOR, addColaborador),
  takeLatest(types.FILTER_COLABORADOR, filterColaborador),
  takeLatest(types.ALL_COLABORADORES, allColaboradores),
  takeLatest(types.UNLINK_COLABORADOR, unlinkColaborador),
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.SAVE_COLABORADOR, saveColaborador),
]);
