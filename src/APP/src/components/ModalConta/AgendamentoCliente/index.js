import React from 'react';
import { Box, Text, Touchable, Spacer, Button } from '../../../styles';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { getAgendaCliente } from '../../../store/modules/salao/actions'; 




const AgendamentoCliente = ({ agendamento }) => {

    const dispatch= useDispatch();

    

    const DeleteAgendamento = async () => {
        // Exibe um pop-up de confirmação
        Alert.alert(
          'Confirmar exclusão',
          'Tem certeza que deseja cancelar este agendamento?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Confirmar',
              onPress: async () => {
                try {
                  const servicoId = agendamento.agendamentoId;
                  // Realiza a requisição DELETE para a API
                  console.log(servicoId);
                  await api.delete(`/agendamento/deletarPorAgendamento/${servicoId}`);
    
                  // Atualiza a lista de agendamentos após a exclusão
                  dispatch(getAgendaCliente());
    
                  Alert.alert('Sucesso', 'Agendamento cancelado com sucesso.');
                } catch (error) {
                  Alert.alert('Erro', 'Ocorreu algum erro ao tentar cancelar o agendamento.');
                }
              },
            },
          ],
          { cancelable: true }
        );
      };
  return (
    <Box 
        height="100px"
        hasPadding
        align="center"
        background="light"
    >
        <Box direction="column">
            <Text style={styles.title} bold color="dark">
                {agendamento.titulo}
            </Text>
            <Spacer />
            <Text style={styles.title} small>
               Valor pago: R$ {agendamento.valor}
            </Text>
            <Text style={styles.title} small>
                Especialista: {agendamento.nome}
            </Text>
            <Text style={styles.title} small>
                Data do evento: {moment(agendamento.data).format('DD/MMM')}
            </Text>
        </Box>
        <Box direction="column" align="flex-end">
        <Button
            style={styles.cancelButton}
          icon="close"
          background="danger"
          mode="contained"
          onPress={() => DeleteAgendamento()}
          >
          CANCELAR
        </Button>
      </Box>
    </Box>
   
  );
};

const styles = StyleSheet.create({
    textContainer: {
      flexDirection: 'column',
    },
    cancelButton: {
      backgroundColor: 'red',
    },
    title: {
        fontWeight: 'bold',
        color: 'dark',
      },
  });


export default AgendamentoCliente;