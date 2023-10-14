import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, ScrollView} from 'react-native';
import api from '../services/api';
import { StyleSheet } from 'react-native';

function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [documentoNumero, setDocumentoNumero] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmada, setSenhaConfirmada] = useState('');

  const [isNomeEmpty, setIsNomeEmpty] = useState(false);
  const [isTelefoneEmpty, setIsTelefoneEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isSenhaEmpty, setIsSenhaEmpty] = useState(false);
  const [isSenhaConfirmadaEmpty, setIsSenhaConfirmadaEmpty] = useState(false);
  const [isDataNascimentoEmpty, setIsDataNascimentoEmpty] = useState(false);
  const [isDocumentoNumeroEmpty, setIsDocumentoNumeroEmpty] = useState(false);

  const [formattedDate, setFormattedDate] = useState('');

  // validar o CPF
  const isCpfValido = (cpf) => {
    // Implementação básica de validação de CPF
    const cpfLimpo = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
      return false;
    }
  
    let sum = 0;
    let rest;
  
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
  
    rest = (sum * 10) % 11;
  
    if (rest === 10 || rest === 11) {
      rest = 0;
    }
  
    if (rest !== parseInt(cpfLimpo.substring(9, 10))) {
      return false;
    }
  
    sum = 0;
  
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
  
    rest = (sum * 10) % 11;
  
    if (rest === 10 || rest === 11) {
      rest = 0;
    }
  
    if (rest !== parseInt(cpfLimpo.substring(10, 11))) {
      return false;
    }
  
    return true;
  };
  

  const handleDataNascimentoChange = (text) => {
    const formattedDate = text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{0,2})(\d{0,4})/, (match, p1, p2, p3) => {
        let result = '';
        if (p1) result += p1;
        if (p2) result += `/${p2}`;
        if (p3) result += `/${p3}`;
        return result;
      });
  
    setFormattedDate(formattedDate);
  
    setDataNascimento(text);
    if (text) {
      setIsDataNascimentoEmpty(false);
    }
  };

  const converterParaFormatoDesejado = (formattedDate) => {
    // Transformar "dd/mm/aaaa" para "mm/dd/aaaa"
    const [day, month, year] = formattedDate.split('/');
    return `${month}/${day}/${year}`;
  };

  const dataFormatada = converterParaFormatoDesejado(formattedDate);

  
  const handleRegister = async () => {
    // Validar CPF
    if (!isCpfValido(documentoNumero)) {
      Alert.alert('Erro', 'CPF inválido. Por favor, insira um CPF válido.');
      return;
    }

    
    
    
    

    
    if (!nome) {
      setIsNomeEmpty(true);
      Alert.alert('Erro', 'O campo Nome é obrigatório.');
      return;
    }
    if (!telefone) {
      setIsTelefoneEmpty(true);
      Alert.alert('Erro', 'O campo Telefone é obrigatório.');
      return;
    }if (!email) {
      setIsTelefoneEmpty(true);
      Alert.alert('Erro', 'O campo E-mail é obrigatório.');
      return;
    }if (!senha) {
      setIsTelefoneEmpty(true);
      Alert.alert('Erro', 'O campo Senha é obrigatório.');
      return;
    }if (!senhaConfirmada) {
      setIsTelefoneEmpty(true);
      Alert.alert('Erro', 'A confirmação de senha é obrigatório.');
      return;
    }if (!dataNascimento) {
      setIsTelefoneEmpty(true);
      Alert.alert('Erro', 'O campo data de nascimento é obrigatório.');
      return;
    }if (!documentoNumero) {
      setIsTelefoneEmpty(true);
      Alert.alert('Erro', 'O campo cpf é obrigatório.');
      return;
    }

    if (senha !== senhaConfirmada) {
      Alert.alert('Erro', 'As senhas não correspondem :(');
      return;
    }

    // Verifica se o e-mail ou CPF já foi cadastrado
try {
  const checkResponse = await api.get(`/cliente/check?email=${email.toLowerCase()}&cpf=${documentoNumero}`);
  if (checkResponse.data.emailExists && checkResponse.data.cpfExists) {
    Alert.alert('Erro', 'Tanto o e-mail quanto o CPF já estão cadastrados em nosso sistema. Por favor, faça o login.');
    return;
  } else if (checkResponse.data.emailExists) {
    Alert.alert('Erro', 'Este e-mail já está cadastrado em nosso sistema. Por favor, faça o login.');
    return;
  } else if (checkResponse.data.cpfExists) {
    Alert.alert('Erro', 'Este CPF já está cadastrado em nosso sistema. Por favor, faça o login.');
    return;
  }
} catch (error) {
  console.error('Erro ao verificar:', error);
  Alert.alert('Erro', 'Erro ao verificar!');
  return;
}

    
    const clienteData = {
      cliente: {
        nome,
        senha: senha,
        telefone,
        tipo: 'individual',
        email: email.toLowerCase(),
        dataNascimento: dataFormatada, 
        status: 'A',
        documento: {
          tipo: 'cpf',
          numero: documentoNumero,
        }
      },
      salaoId: "6518f095bbcb80c3e598553a"
    };

    try {
      const response = await api.post('/cliente', clienteData);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Erro ao criar a conta!');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      Alert.alert('Erro', 'Erro ao criar a conta!');
    }
  };

  return (
    <ScrollView 
    style={styles.container}
    contentContainerStyle={{ justifyContent: 'center' }}
    >
      <View>
        <TextInput
          placeholder="Nome"
          value={nome}
          style={isNomeEmpty ? [styles.input, styles.errorInput] : styles.input}
          onChangeText={setNome}
          returnKeyType="next"
          onSubmitEditing={() => TelefoneInput.focus()}
        />
        <TextInput
          ref={(input) => (TelefoneInput = input)}
          placeholder="Telefone"
          value={telefone}
          maxLength={11}
          style={isNomeEmpty ? [styles.input, styles.errorInput] : styles.input}
          onChangeText={setTelefone}
          returnKeyType="next"
          onSubmitEditing={() => emailInput.focus()}
        />
        <TextInput
          ref={(input) => (emailInput = input)}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={isNomeEmpty ? [styles.input, styles.errorInput] : styles.input}
          returnKeyType="next"
          onSubmitEditing={() => senhaInput.focus()}
        />
        <TextInput
          ref={(input) => (senhaInput = input)}
          placeholder="Crie uma senha"
          value={senha}
          style={isNomeEmpty ? [styles.input, styles.errorInput] : styles.input}
          onChangeText={setSenha}
          secureTextEntry={true}
          returnKeyType="next"
          onSubmitEditing={() => senhaCInput.focus()}
        />
        <TextInput
          ref={(input) => (senhaCInput = input)}
          placeholder="Confirme a senha"
          value={senhaConfirmada}
          onChangeText={setSenhaConfirmada}
          style={isNomeEmpty ? [styles.input, styles.errorInput] : styles.input}
          secureTextEntry={true}
          returnKeyType="next"
          onSubmitEditing={() => nascimentoInput.focus()}
        />
        <TextInput
          ref={(input) => (nascimentoInput = input)}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={formattedDate}
          onChangeText={handleDataNascimentoChange}
          style={isNomeEmpty ? [styles.input, styles.errorInput] : styles.input}
          returnKeyType="next"
          onSubmitEditing={() => documentoInput.focus()}
          maxLength={10}
        />
        <TextInput
          ref={(input) => (documentoInput = input)}
          placeholder="Número do Documento"
          value={documentoNumero}
          onChangeText={setDocumentoNumero}
          style={isNomeEmpty ? [styles.input, styles.errorInput] : styles.input}
          returnKeyType="done"
        />
        <TouchableOpacity 
          onPress={handleRegister} 
          style={styles.button}
        >
          <Text style={{ color: 'white' }}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  errorInput: {
    borderColor: 'red',
  },
  container: {
      flex: 1, 
      padding: 16
  },
  input: {
      padding: 12, 
      borderWidth: 1, 
      marginBottom: 10,
      alignItems: 'center',
      textAlign: 'center'
  },
  button: {
      backgroundColor: 'green', 
      color: 'white', 
      marginBottom: 10,
      padding: 12,
      alignItems: 'center',
      textAlign: 'center'
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f0f0'  // ou outra cor de fundo de sua escolha
  }
});

export default RegisterScreen;