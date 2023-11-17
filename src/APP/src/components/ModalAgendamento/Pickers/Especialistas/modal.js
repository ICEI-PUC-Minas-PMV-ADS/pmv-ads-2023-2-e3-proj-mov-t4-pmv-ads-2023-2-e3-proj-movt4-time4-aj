import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import Modal from 'react-native-simple-modal';
import {Text, Box, Touchable, Cover} from '../../../../styles';
import theme from '../../../../styles/theme.json';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { updateAgendamento, updateForm } from '../../../../store/modules/salao/actions';

const EspecialistasModal = ({ 
  form, 
  colaboradores, 
  agendamento, 
  servicos, 
  colaboradoresDia, 
  horaSelecionada
}) => {

  const dispatch = useDispatch();
  const colaboradoresIdsDisponiveis = [];

  for (let colaboradorId of Object.keys(colaboradoresDia)) {
    let horarios = colaboradoresDia[colaboradorId].flat(2);
    if (horarios.includes(horaSelecionada)) {
      colaboradoresIdsDisponiveis.push(colaboradorId);
    }
  }

  const colaboradoresDisponiveis = colaboradores.filter(
    (c) => colaboradoresIdsDisponiveis.includes(c._id),
  );

  const servico = servicos.filter(s => s._id == agendamento.servicoId)[0]

  return (
    <Modal open={form.modalEspecialista}>
      <ScrollView>
      <Box hasPadding direction="column">
           <Text bold color="dark">
             {servico?.titulo}
           </Text>
           <Text small composed>
             disponíveis em {moment(agendamento.data).format('DD/MM/YYYY [às] HH:mm')}
           </Text>

           <Box wrap="wrap" height="auto" spacing="10px 0 0">
            {colaboradoresDisponiveis.map((colaborador) => (
              <Touchable
                width={(Dimensions.get('screen').width -100 ) /4}
                height="70px"
                spacing="10px 0px 0px 0px"
                direction="column"
                align="center"
                onPress={() => {
                  dispatch(updateAgendamento({colaboradorId: colaborador._id}));
                  dispatch(updateForm({ modalEspecialista: false}));
                }}
               >
                <Cover
                  height="45px"
                  width="45px"
                  circle
                  border={
                    colaborador._id === agendamento.colaboradorId
                      ? `3px solid ${theme.colors.primary}`
                      : 'none'
                  }
                  spacing="0px 0px 5px 0px"
                  image={colaborador?.foto}
                />
                <Text small>
                {colaborador?.nome}
                </Text>
              </Touchable>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </Modal>
  
  );
};

export default EspecialistasModal;
