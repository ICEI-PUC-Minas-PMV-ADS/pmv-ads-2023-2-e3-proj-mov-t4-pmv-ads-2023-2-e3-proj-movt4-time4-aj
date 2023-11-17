import React, { useState, useEffect } from 'react';
import { TextInput, Button, Box, Title, Text, Spacer} from '../../../styles';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
import { Alert } from 'react-native';


const DadosCadastrais = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
  });

  const { cliente } = useSelector(state => state.salao);

  useEffect(() => {
    // Atualiza o estado local com os dados do cliente quando o componente monta
    setFormData({
      nome: cliente.nome || '',
      telefone: cliente.telefone || '',
      email: cliente.email || '',
      senha: cliente.senha || '',
    });
  }, [cliente]);

  const handleChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleUpdateCliente = async () => {
    try {
      const { nome, telefone, email, senha } = formData;
      const clienteId = await AsyncStorage.getItem('@user_id');
      // Realiza a requisição PUT para a API
      await api.put(`/cliente/atualizar/${clienteId}`, {
        nome,
        telefone,
        email,
        senha,
      });

      Alert.alert('Sucesso', 'Dados do cliente atualizados com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar dados do cliente:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados do cliente.');
    }
  };

  return (
    <Box direction="column" hasPadding style={{ marginTop: 20 }}>
        <Box direction="column" alighn="center">
            <Title>
                Olá {formData.nome}
            </Title>
            <Text small>
                Você pode atualizar seus dados cadastrais logo abaixo
            </Text> 
        </Box>
        <Spacer />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={formData.nome}
        onChangeText={text => handleChange('nome', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={formData.telefone}
        onChangeText={text => handleChange('telefone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={formData.senha}
        onChangeText={text => handleChange('senha', text)}
      />

        <Button 
        block
        title="Atualizar Dados" 
        onPress={handleUpdateCliente}>
            Salvar
        </Button>

    </Box>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      width:'100%',
      height: 140,
    },
    input:{
        marginBottom: 10,
    }
  })

export default DadosCadastrais;
