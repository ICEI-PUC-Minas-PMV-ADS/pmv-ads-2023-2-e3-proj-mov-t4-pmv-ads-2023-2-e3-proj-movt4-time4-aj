import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AgendamentoScreen({ navigation }) {
  

  const handleLogout = async () => {
    // Limpe os dados da AsyncStorage
    await AsyncStorage.removeItem('@user_id');
    await AsyncStorage.removeItem('@email');

    console.log('dados apagados do asyncStorage')
    // Redirecione para a tela de login
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <Text style={{ margin: 20, fontSize: 18, fontWeight: 'bold' }}>Login realizado com sucesso!</Text>
      <Button title="Deslogar" onPress={handleLogout} />
    </View>
  );
}

export default AgendamentoScreen;
