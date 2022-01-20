import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector';

const connector = new InjectedConnector({
  supportedChainIds: [
    1, //Mainnet
    4, //Rinkeby
  ],
});

const getLibrary = (provider) => {
  return new Web3(provider);
};

export { getLibrary, connector };