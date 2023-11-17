import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Agendamento from './src/screens/HomeScreen';
import Conta from './src/screens/AccountScreen';
import { Provider } from 'react-redux';
import Agendamentos from './src/screens/Agendamentos';
import store from './src/store';

const Stack = createStackNavigator();

export default function App() {
  

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"Login"}>
            <Stack.Screen name="Agendamento" component={Agendamento} />
            <Stack.Screen name="Conta" component={Conta} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Agendamentos" component={Agendamentos} />
            <Stack.Screen name="Cadastrar" component={RegisterScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
