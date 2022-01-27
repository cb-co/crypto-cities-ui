import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';

import useCryptoCities from '../useCryptoCities';

const getCityData = async ({ cryptoCities, tokenId }) => {
  const [tokenURI, owner] = await Promise.all([
    cryptoCities.methods.tokenURI(tokenId).call(),
    cryptoCities.methods.ownerOf(tokenId).call(),
  ]);

  const metadata = await fetch(tokenURI).then((response) => response.json());

  return {
    tokenId,
    tokenURI,
    owner,
    ...metadata,
  };
};

const useCryptoCitiesData = ({ owner = null } = {}) => {
  const [cities, setCities] = useState([]);
  const { library } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const cryptoCities = useCryptoCities();

  const update = useCallback(async () => {
    if (cryptoCities) {
      setLoading(true);
      let tokenIds;

      if (!library.utils.isAddress(owner)) {
        const totalSupply = await cryptoCities.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index);
      } else {
        const balanceOf = await cryptoCities.methods.balanceOf(owner).call();
        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
            cryptoCities.methods.tokenOfOwnerByIndex(owner, index).call()
          );

        tokenIds = await Promise.all(tokenIdsOfOwner);
      }

      const citiesPromise = tokenIds.map((tokenId) =>
        getCityData({ cryptoCities, tokenId })
      );

      const citiesResult = await Promise.all(citiesPromise);

      setCities(citiesResult);
      setLoading(false);
    }
  }, [cryptoCities, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    cities,
    loading,
    update,
  };
};

const useCryptoCityData = (tokenId = null) => {
  const [city, setCity] = useState({});
  const [loading, setLoading] = useState(true);
  const cryptoCities = useCryptoCities();

  const update = useCallback(async () => {
    if (cryptoCities && tokenId !== null) {
      setLoading(true);

      const cityResult = await getCityData({ tokenId, cryptoCities });
      setCity(cityResult);

      setLoading(false);
    }
  }, [cryptoCities, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    city,
    update,
  };
};

export { useCryptoCitiesData, useCryptoCityData };
