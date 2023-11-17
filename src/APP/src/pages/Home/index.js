import React, {useEffect} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { getSalao, allServicos, updateClient, getCliente, getAgendaCliente} from '../../store/modules/salao/actions';

import Header from '../../components/Header';
import theme from '../../styles/theme.json'
import { Spacer } from '../../styles';
import util from '../../util';

import Servico from '../../components/Servico';
import ModalAgendamento from '../../components/ModalAgendamento';
import ModalConta from '../../components/ModalConta/ModalConta';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
    

    const dispatch = useDispatch();
    const { servicos, form  } = useSelector(state => state.salao)

    const finalServicos = form.inputFiltro.length > 0 
    ? servicos.filter((s) =>{
        const titulo = s.titulo.toLowerCase().trim();
        const arrSearch = form.inputFiltro.toLowerCase().trim().split(' ');
        return arrSearch.every((w) => titulo.search(w) != - 1 );
    })
    : servicos

    useEffect(() =>{
        dispatch(getSalao());
        dispatch(allServicos());
        dispatch(getCliente());
        dispatch(getAgendaCliente());
    }, [])

    

    return (
        <GestureHandlerRootView style={{ flex: 1}}>

            <FlatList 
                style={{
                    backgroundColor: util.toAlpha(theme.colors.muted, 10)
                }}
                ListHeaderComponent={Header}
                data={finalServicos}
                renderItem={({item}) => (
                <Servico servico={item}/>)}
                keyExtractor={(item) => item}
            />
                    <Spacer size="70px"/>

            <ModalConta />
            <ModalAgendamento />
        </GestureHandlerRootView>
    )
    
};

export default Home;
