import React from 'react';
import {useDispatch} from 'react-redux';
import {updateForm} from '../../../../store/modules/salao/actions';
import {Box, Text, Cover, Button, Touchable} from '../../../../styles';
import theme from '../../../../styles/theme.json';
import EspecialistasModal from './modal';

const EspecialistaPicker = ({colaboradores, agendamento}) => {
  const dispatch = useDispatch();
  const colaborador = colaboradores.filter(
    (c) => c._id === agendamento.colaboradorId,
  )[0];

  return (
    <>
      <Text hasPadding bold color="dark">
        Gostaria de trocar o(a) especialista?
      </Text>

      <Box hasPadding spacing="20px 0 0" align="center" height="50px">
          <Box align="center">
            <Cover
              width="45px"
              height="45px"
              circle
              image={colaborador?.foto}
            />
            <Text small>{colaborador?.nome}</Text>
          </Box>
          <Box>
            <Touchable
            onPress={() => dispatch(updateForm({modalEspecialista: true}))}>
              <Button
                style={{ height: 40, backgroundColor: '#e3dede' }}
                uppercase={false}
                textColor={theme.colors.muted}
                background={theme.colors.light}
                mode="contained"
                block
                >
                Trocar Especialista
              </Button>
            </Touchable>
          </Box>
        </Box>
    </>
  );
};

export default EspecialistaPicker;
