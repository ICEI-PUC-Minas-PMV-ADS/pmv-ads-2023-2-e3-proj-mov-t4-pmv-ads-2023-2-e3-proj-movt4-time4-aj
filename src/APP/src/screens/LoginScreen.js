import React, { useState } from 'react';
import { View, Image, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Recupera o ID do usuário
  const fetchUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('@user_id');
      if (userId !== null) {
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
    } catch (error) {
      console.error("Erro ao salvar o ID do usuário:", error);
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
      // Retornando a validação e o ID do usuário
      return {
        isValid: response.data.isValid,
        userId: response.data.userId
      };
    } catch (error) {
      console.error('Erro ao validar as credenciais:', error);
      return { isValid: false };
    }
  };

  const handleLogin = async () => {
    const response = await validateCredentials(email, senha);
    if (response.isValid) {
      await storeUserId(response.userId);  // Armazenando o ID do usuário
      navigation.navigate('Agendamento');
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos!');
    }
  };
  
  return (
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