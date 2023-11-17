import React from 'react';
import { Cover, GradientView, Title, Text, Badge, Box, Touchable, Button, TextInput} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.json'
import {useSelector, useDispatch} from 'react-redux';
import {Linking, Share} from 'react-native';
import {updateForm} from '../../store/modules/salao/actions';

const Header = () =>{

    const dispatch = useDispatch();
  const {salao, servicos, form} = useSelector((state) => state.salao);

  const openGps = (coords) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${coords[0]},${coords[1]}`,
    );
  };

  return (
    <>
      <Cover 
        image={salao.capa}
        height="300px"
        width="100%">
        <GradientView 
          colors={['#21232F33', '#21232FE6']}
          hasPadding
          justify="flex-end">
          <Badge color={salao.isOpened ? 'success' : 'danger'}>
            {salao.isOpened ? 'ABERTO' : 'FECHADO'}
          </Badge>
          <Title color="light">{salao.nome}</Title>
          <Text color="light">
            {salao?.endereco?.cidade} • {salao?.distance?.toFixed(2) ?? 'N/A'} km
          </Text>
        </GradientView>
      </Cover>
      <Box background="light" align="center">
        <Box hasPadding justify="space-between">
          
          <Touchable 
          width="60px" 
          direction="column" 
          align="center"
          onPress={() => Linking.openURL(`tel:+55${salao.telefone}`)}
          >
            <Icon name="phone" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">Ligar</Text>
          </Touchable>

          <Touchable 
          width="60px" 
          direction="column" 
          align="center"
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${salao.geo.coordinates[0]},${salao.geo.coordinates[1]}`,
            );
          }}>
            <Icon name="map-marker" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">Visitar</Text>
          </Touchable>

          <Touchable 
          width="60px" 
          direction="column" 
          align="center"
          onPress={() => {
            Share.share({
              message: `${salao.nome} - Agende Já!`
            })
          }}
          >
            <Icon name="share" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">Enviar</Text>
          </Touchable>
        </Box>
        <Box haspadding direction="column" align="center" justify="center">
          <Button 
            icon="clock-check-outline"
            background="success"
            mode='contained'
            uppercase={false}
          >
            Agendar Agora
          </Button>
          <Text small spacing="10px 0 0">Horários disponíveis</Text>
        </Box>
      </Box>
      <Box hasPadding direction="column" background="light" spacing="10px 0 0">
          <Title small>Serviços ({servicos.length})</Title>
          <TextInput
            placeholder="Digite o nome do serviço..."
            onChangeText={(value) => dispatch(updateForm({ inputFiltro: value}))}
            onFocus={() => dispatch(updateForm({inputFiltroFoco: true}))}
            onBlur={() => dispatch(updateForm({inputFiltroFoco: false}))}
          />
      </Box>
    </>
  );
}

export default Header;
