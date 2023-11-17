import React from 'react';
import { View, Text } from 'react-native';
import AgendamentoCliente from '../components/ModalConta/AgendamentoCliente';
import { FlatList } from 'react-native';
import util from '../util';
import theme from '../styles/theme.json'
import { useSelector } from 'react-redux';

const Agendamentos = () => {

  const { agendamentos } = useSelector(state => state.salao)

  return (
    <FlatList 
      style={{
          backgroundColor: util.toAlpha(theme.colors.muted, 10)
      }}
      data={agendamentos}
      renderItem={({item}) =>
      <AgendamentoCliente agendamento={item}/>}
      keyExtractor={(item) => item}
      />
  );
};

export default Agendamentos;