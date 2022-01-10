import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';

import App from './App';
import { getLibrary } from './config/web3';

const colors = {
  brand: {
    900: '#c79f55',
    800: '#ffffff',
    700: '#141515',
  },
};

const theme = extendTheme({
  colors,
  config: { initialColorMode: 'dark' },
});

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
