import React from 'react';
import {Touchable, GradientView, Text, Spacer, Box} from '../../styles';
import {View, StyleSheet, Dimensions} from 'react-native';
import theme from '../../styles/theme.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalHeaderAgendamento = ({onPress = () => {}, form}) => {
  return (
    <View style={{ marginTop: 20 }}>
          <View style={styles.headerContainer}>
              <Box>
                <Touchable>
                  <Icon
                    name="chevron-up"
                    color={theme.colors.light}
                    size={30}
                  />
                  <View>
                    <Text bold color="light" small>
                      Conta
                    </Text>
                    <Spacer size="3px"/>
                    <Text color="light" small>
                      Atualizar dados cadastrais
                    </Text>
                  </View>
                </Touchable>
              </Box>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width:'100%',
    height: 140,
  }
})

export default ModalHeaderAgendamento;
