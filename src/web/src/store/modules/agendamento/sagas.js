import { all, takeLatest, call, put } from 'redux-saga/effects';
import types from './types'
import api from '../../../services/api';
import consts from '../../../consts'
import { updateAgendamento } from './actions'

export function* filterAgenramento({ start, end }) {
  try {
    const {data: res} = yield call(api.post, '/agendamento/filter', {
      salaoId: consts.salaoId,
      periodo:{
        inicio: start,
        final: end,
      },
    });
    
    if(res.err) {
      alert(res.message);
      return false;
    }

    yield put(updateAgendamento(res.agendamentos))

  } catch (err){
    alert(err.message);
  }
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgenramento)]);



// import { takeLatest, all, call, put, select } from 'redux-saga/effects';
// import { updateAgendamento } from './actions';
// import types from './types';
// import api from '../../../services/api';
// import { notification } from '../../../services/rsuite';
// import consts from '../../../consts';



//     if (res.error) {
//       // ALERT DO RSUITE
//       notification('error', {
//         placement: 'topStart',
//         title: 'Ops...',
//         description: res.message,
//       });
//       return false;
//     }

//     yield put(updateAgendamento({ agendamentos: res.agendamentos }));
//     // COLOCAR OS CLIENTES NO REDUCER
//   } catch (err) {
//     // COLOCAR AQUI O ALERT DO RSUITE
//     notification('error', {
//       placement: 'topStart',
//       title: 'Ops...',
//       description: err.message,
//     });
//   }
// }

// export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgenramentos)]);
