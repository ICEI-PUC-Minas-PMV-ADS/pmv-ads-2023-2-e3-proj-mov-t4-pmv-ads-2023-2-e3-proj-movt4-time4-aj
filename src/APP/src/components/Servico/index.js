import React from 'react';

import {Text, Box, Button, Cover, Spacer, Touchable} from '../../styles';
import moment from 'moment';
import util from '../../util';
import {useSelector, useDispatch} from 'react-redux';

import { updateAgendamento, filterAgenda, resetAgendamento } from '../../store/modules/salao/actions';

const Servico = ({ servico }) => {

  const dispatch= useDispatch();
  // console.log(servico)



  return (
    <Touchable
      height="100px"
      hasPadding
      align="center"
      background="light"
      onPress={() =>{
        dispatch(updateAgendamento({servicoId: servico._id}));
        dispatch(filterAgenda())
      }}>
      <Cover
        image={
          servico?.arquivos
            ? `${util.AWS.bucketURL}/${servico?.arquivos[0]?.caminho}`
            : ''
        }
      />
      <Box direction="column">
        <Text bold color="dark">
          {servico.titulo}
        </Text>
        <Spacer />
        <Text small>
          R$ {servico.preco} • {moment(servico.duracao)
            .format(' H:mm')
            .replace(/^(?:0:)?0?/, '')}{' '}
          mins
        </Text>
      </Box>
      <Box direction="column" align="flex-end">
        <Button
          icon="clock-check-outline"
          background="success"
          mode="contained">
          AGENDAR
        </Button>
      </Box>
    </Touchable>
  );
};

export default Servico;
