import React from 'react';
import { View, Text, Button } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

function AgendamentoScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <Svg height="100" width="100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="green"
          strokeWidth="2.5"
          fill="green"
        />
        <Rect
          x="15"
          y="40"
          width="70"
          height="20"
          fill="white"
        />
      </Svg>
      <Text style={{ margin: 20, fontSize: 18, fontWeight: 'bold' }}>Login realizado com sucesso!</Text>
      <Button title="Voltar para Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default AgendamentoScreen;



// import React from 'react';
// import { View, Text, Button } from 'react-native';

// function AgendamentoScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Tela de Agendamento</Text>
//       <Button title="Voltar para Login" onPress={() => navigation.navigate('Login')} />
//     </View>
//   );
// }

// export default AgendamentoScreen;
