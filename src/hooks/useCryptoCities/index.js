import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

import CryptoCitiesArtifact from '../../config/artifacts/CryptoCities';

const { address, abi } = CryptoCitiesArtifact;

const useCryptoCities = () => {
  const { active, library, chainId } = useWeb3React();

  const cryptoCities = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return cryptoCities;
};

export default useCryptoCities;
