import React, { useRef, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../styles/theme.json';
import { LinearGradient } from 'expo-linear-gradient';
import ModalHeaderAgendamento from './header';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import util from '../../util';
import moment from 'moment';


import {useSelector, useDispatch} from 'react-redux';
import { closeAgendamento } from '../../store/modules/salao/actions';
import { Box, Button } from '../../styles';
import DadosCadastrais from './DadosCadastrais';


const GradientHandle = () => {
  return (
    <LinearGradient
      colors={[theme.colors.dark, theme.colors.primary]}
      start={{x: 0 , y: 0}}
      end={{x: 1 , y: 0}}
    />
  );
};

const ModalConta = () => {
    const { form, agendamento } = useSelector((state) => state.salao);
    const dispatch = useDispatch();
    const navigation = useNavigation(); 
  
    let sheetRef = React.useRef(null);
  
    const setSnap = () => {
      sheetRef.current?.snapToIndex(1);
    };
  
    useEffect(() => {
      // Certifique-se de que o índice está dentro do intervalo permitido
      const snapIndex = Math.max(0, Math.min(1, form.modalAgendamento));
      sheetRef.current?.snapToIndex(snapIndex);
    }, [form.modalAgendamento]);
  
    console.tron.log('form.modalAgendamento:', form.modalAgendamento);

    const deslogar = async () => {
        // Limpar os dados do AsyncStorage
        await AsyncStorage.clear();
    
        // Redirecionar para a tela de login
        navigation.replace('Login'); // Certifique-se de que 'LoginScreen' é o nome correto da tela
      };
  
    return (
      <BottomSheet
        ref={sheetRef}
        initialSnapIndex={0}
        snapPoints={[70, 1, Dimensions.get('screen').height - 120]}
        handleComponent={GradientHandle}
        backgroundStyle={{ backgroundColor: 'none' }}
      >
      <>
          <LinearGradient
              colors={[theme.colors.dark, theme.colors.primary]}
              start={{x: 0 , y: 0}}
              end={{x: 1 , y: 0}}
              height={70}
              >
            <ModalHeaderAgendamento />
          </LinearGradient>

          <ScrollView
          stickyHeaderIndices={0}
          style={{ backgroundColor: '#fff' }}>
            <Box hasPadding  justify="space-around">
              <Button 
              icon="check" 
              backgroundColor="success" 
              onPress={() => navigation.navigate('Agendamentos')}>
                Ver agendamentos
              </Button>

              <Button 
              style={{ backgroundColor: theme.colors.danger }}
              icon="close" 
              backgroundColor="danger" 
              mode="contained" 
              onPress={deslogar}>
                Deslogar
              </Button>
            </Box>

            <DadosCadastrais />
          </ScrollView>
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

export default ModalConta;
