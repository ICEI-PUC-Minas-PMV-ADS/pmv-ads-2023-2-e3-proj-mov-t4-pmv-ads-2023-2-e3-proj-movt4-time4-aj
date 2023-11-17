import React from 'react';

import {Text, Title, Spacer, Box, Cover} from '../../styles';
import util from '../../util';
import theme from '../../styles/theme.json';

const ModalResume = ({servico}) => {

  return (
    <Box
      justify="flex-start"
      direction="column"
      hasPadding
      background={util.toAlpha(theme.colors.muted, 5)}>
      <Box align="center">
         <Cover
          width="80px"
          height="80px"
          image={
            servico?.arquivos
              ? `${util.AWS.bucketURL}/${servico?.arquivos[0]?.caminho}`
              : ''
          }
        />
        <Box direction="column">
          <Title small bold>
            {servico?.titulo}
          </Title>

          <Spacer />
            <Text color="success" bold underline small>
              R$ {servico?.preco.toFixed(2)}
            </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalResume;
