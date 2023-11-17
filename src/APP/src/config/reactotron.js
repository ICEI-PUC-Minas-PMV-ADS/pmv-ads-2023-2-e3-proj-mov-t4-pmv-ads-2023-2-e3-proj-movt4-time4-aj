import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  Reactotron.configure({
    name: 'LoginDev', // Nome do seu aplicativo
    host: '192.168.100.2', // Substitua pelo IP do seu computador
  })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .use(reactotronRedux())
    .connect();

  console.tron = Reactotron;
}

export default Reactotron;
