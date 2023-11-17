import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Conta = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à sua tela de conta!</Text>
      <Button
        title="Voltar para a Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Conta;