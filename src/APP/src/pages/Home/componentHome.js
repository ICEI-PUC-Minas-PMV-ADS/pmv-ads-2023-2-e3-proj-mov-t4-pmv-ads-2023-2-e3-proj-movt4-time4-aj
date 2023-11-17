import React from 'react';
import Home from '../../pages/Home';
import {Provider as StoreProvider} from 'react-redux';
import {DefaultTheme, configureFonts, Provider as PaperProvider} from 'react-native-paper';
import { fonts } from '../../styles/theme.json'
import store from '../../store';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';


const theme = {
  ...DefaultTheme,
  fonts: configureFonts({
    ios: fonts,
    android: fonts,
  })
};

const App = () => {
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: Platform.OS === 'android' ? theme.colors.light : 'transparent'
      }}>
      <StoreProvider store={store}>
        <StatusBar 
        barStyle={Platform.OS === 'android' ? "light-content" : "dark-content"}
        backgroundColor={Platform.OS === 'android' ? theme.colors.dark : 'transparent'}
        translucent={Platform.OS === 'android'} 
        />
        <PaperProvider theme={theme}>
          <Home />
        </PaperProvider>
      </StoreProvider>
    </SafeAreaView>

  );
};

export default App;