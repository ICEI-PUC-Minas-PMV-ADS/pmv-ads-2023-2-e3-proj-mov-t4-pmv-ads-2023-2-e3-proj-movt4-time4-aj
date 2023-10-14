import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AgendamentoScreen from './src/screens/AgendamentoScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastrar" component={RegisterScreen} />
        <Stack.Screen name="Agendamento" component={AgendamentoScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
