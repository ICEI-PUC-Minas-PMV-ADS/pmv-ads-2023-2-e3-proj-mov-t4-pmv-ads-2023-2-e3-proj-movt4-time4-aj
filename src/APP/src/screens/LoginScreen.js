import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateClient } from '../store/modules/salao/actions';

function LoginScreen({ setClienteId, navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();

  // Recupera o ID do usuário
  const fetchUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('@user_id');
      if (userId !== null) {
        console.log("UserID recuperado:", userId); // Adicione este console.log
        return userId;
      }
    } catch (error) {
      console.error("Erro ao recuperar o ID do usuário:", error);
    }
    return null;
  };


  // Salva o ID do usuário
  const storeUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('@user_id', userId);
      await AsyncStorage.setItem('@email', email);
    } catch (error) {
      console.error("Erro ao salvar o ID do usuário e seu email:", error);
    }
  };



  // Função de validação das credenciais via servidor
  const validateCredentials = async (email, senha) => {
    try {
      const response = await api.post('/cliente/validarLogin', { email, senha });
      console.log("Dados recebidos:", response.data);
      if (response.status !== 200) {
        console.error('Resposta do servidor:', response.statusText);
        return { isValid: false };
      }

      console.log('UserId recebido:', response.data.userId);
      // Retornando a validação e o ID do usuário
      return {
        isValid: response.data.isValid,
        userId: response.data.userId,
        email: response.data.email
      };
    } catch (error) {
      console.error('Erro ao validar as credenciais:', error);
      return { isValid: false };
    }
  };

      // Chama a função fetchUserId ao carregar a tela
  useEffect(() => {
    fetchUserId();
  }, []);

  const handleLogin = async () => {
    const response = await validateCredentials(email, senha);
    if (response.isValid) {
      await storeUserId(response.userId, response.email); // Armazenando o ID do usuário e o email
      navigation.replace('Agendamento'); // Use replace para substituir a tela atual
  
      // Exibir o conteúdo da AsyncStorage após o login
      const userId = await AsyncStorage.getItem('@user_id');
      const storedEmail = await AsyncStorage.getItem('@email');
      const clienteId = userId;
      dispatch(updateClient(clienteId));
      console.log("UserID: " + userId);
      console.log("Email: " + storedEmail);
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos!');
    }
  };

  const checkLogin = async () => {
    const user = await AsyncStorage.getItem('@email');
    const userId = await AsyncStorage.getItem('@user_id');

    console.log('Email recuperado:', user); // Adicione este console.log para verificar o conteúdo
    if (user) {
      const clienteId = userId;
      dispatch(updateClient(clienteId));
      navigation.replace('Agendamento');
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);
  
  return (
    <ScrollView 
    >
      <View style={styles.container}>

        <Image style={styles.image} source={require('../../assets/logo-agendeja.png')} />

          <TextInput
              placeholder="E-mail"
              value={email.toLowerCase()}
              onChangeText={setEmail}
              style={styles.input}
          />
          <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
              style={styles.input}
          />
          <TouchableOpacity 
              onPress={handleLogin} 
              style={styles.button}
          >
              <Text style={styles.text}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={() => navigation.navigate('Cadastrar')}
              style={styles.button}
          >
              <Text style={styles.text}>Criar Conta</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
);
}


export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        padding: 16,
        alignItems: 'center',
    },
    input: {
        padding: 12, 
        borderWidth: 1, 
        marginBottom: 10,
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
    },
    button: {
        backgroundColor: '#0AA447', 
        color: 'white',
        fontWeight: 'bold', 
        marginBottom: 10,
        padding: 12,
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        width: '100%',

    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
    image:{
      alignItems: 'center',
      marginBottom: 40,
    }

});

export default LoginScreen;