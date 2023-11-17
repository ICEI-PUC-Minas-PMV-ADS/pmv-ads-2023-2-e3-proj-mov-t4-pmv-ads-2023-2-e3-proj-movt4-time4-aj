import React, { useRef, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../styles/theme.json';
import { LinearGradient } from 'expo-linear-gradient';

import { ActivityIndicator } from 'react-native-paper';
import { Button, Box, Touchable, Title, Text } from '../../styles';
import DateTimePicker from './Pickers/dateTime';
import EspecialistaPicker from './Pickers/Especialistas';
import EspecialistasModal from './Pickers/Especialistas/modal';
import ModalHeader from './header'
import ModalResume from './resume';
import PaymentPicker from './Pickers/payment';
import util from '../../util';
import moment from 'moment';


import {useSelector, useDispatch} from 'react-redux';
import { closeAgendamento, saveAgendamento, updateAgendamento } from '../../store/modules/salao/actions';

const GradientHandle = () => {
  return (
    <LinearGradient
      colors={[theme.colors.dark, theme.colors.primary]}
      start={{x: 0 , y: 0}}
      end={{x: 1 , y: 0}}
    />
  );
};

const ModalAgendamento = () => {
  const {form, agendamento, servicos, agenda, colaboradores} = useSelector((state) => state.salao);
  
  const dispatch = useDispatch();
  
  const servico = servicos.filter((s) => s._id === agendamento.servicoId)[0];
  
  const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD');
  const horaSelecionada = moment(agendamento.data).format('HH:mm')
  
  const { horariosDisponiveis, colaboradoresDia } = util.selectAgendamento(
    agenda, 
    dataSelecionada, 
    agendamento.colaboradorId
    );
    
  let sheetRef = React.useRef(null); 

  const setSnap = (Index) => {
    sheetRef.current?.snapToIndex(Index)
  }

  useEffect(() => {
    setSnap(form.modalAgendamento);
  }, [form.modalAgendamento] );

  console.tron.log('form.modalAgendamento:', form.modalAgendamento);

  
  return (
  <BottomSheet
    ref={sheetRef}
    initialSnapIndex={0}
    snapPoints={[ 1, Dimensions.get('screen').height - 120]}
    onChange={(index) => {
      console.tron.log('BottomSheet mudou para o índice:', index);
      if (index === 0) {
        dispatch(closeAgendamento())
        console.tron.log('Close agendamento chamado!');
      }
    }}
    handleComponent={GradientHandle} 
    backgroundStyle={{backgroundColor: 'none'}}
    >
      <>
          <LinearGradient
              colors={[theme.colors.dark, theme.colors.primary]}
              start={{x: 0 , y: 0}}
              end={{x: 1 , y: 0}}
              height={70}
              >
            <ModalHeader />
          </LinearGradient>

          <ScrollView
          stickyHeaderIndices={0}
          style={{ backgroundColor: '#fff' }}>
              <ModalResume 
                servico={servico}
              />

              {agenda.length > 0 && <>
                <DateTimePicker 
                  servico={servico} 
                  servicos={servicos}
                  agendamento={agendamento} 
                  agenda={agenda} 
                  dataSelecionada={dataSelecionada}
                  horaSelecionada={horaSelecionada}
                  horariosDisponiveis={horariosDisponiveis}
                />
                <EspecialistaPicker 
                  colaboradores={colaboradores}
                  agendamento={agendamento}
                />
                <PaymentPicker />
                <Box hasPadding>
                  <Touchable
                    onPress={() => dispatch(saveAgendamento())}
                  >
                    <Button 
                      loading={form.agendamentoLoading}
                      disabled={form.agendamentoLoading}
                      icon="check" 
                      style={{width:"100%"}}
                      backgroundColor="primary" 
                      mode="contained" 
                      block
                      uppercase={false}
                    >
                      Confirmar meu agendamento
                    </Button>
                  </Touchable>
                </Box>
              </>}
              
              {agenda.length === 0 && (
                <Box 
                  height={Dimensions.get('window').height -200}
                  backgroundColor="ight" 
                  direction="column" 
                  hasPadding 
                  justify="center" 
                  align="center"

                >
                  <ActivityIndicator 
                    size="large"
                    color={theme.colors.primary}
                  />
                    <Title align="center">Só um instante...</Title>
                    <Text small align="center">Estamos buscando o melhor horário para você :)</Text>
                </Box>
              )}
          </ScrollView>
        <EspecialistasModal 
        form={form}
        colaboradores={colaboradores}
        agendamento={agendamento}
        servicos={servicos}
        horaSelecionada={horaSelecionada}
        colaboradoresDia={colaboradoresDia}
        />
      </>
    </BottomSheet>
    
  );
};

const styles = StyleSheet.create({
  gradientHandle: {
    height: 20, // Altura do handle
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%', // Largura total
  },
});

export default ModalAgendamento;
