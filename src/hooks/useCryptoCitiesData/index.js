import { useCallback, useEffect, useState } from 'react';
import useCryptoCities from '../useCryptoCities';

const getCityData = async ({ cryptoCities, tokenId }) => {
  const [tokenURI, owner] = await Promise.all([
    cryptoCities.methods.tokenURI(tokenId).call(),
    cryptoCities.methods.ownerOf(tokenId).call(),
  ]);

  const metadata = await fetch(tokenURI).then((response) => response.json());

  return {
    tokenURI,
    owner,
    ...metadata,
  };
};

const useCryptoCitiesData = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const cryptoCities = useCryptoCities();

  const update = useCallback(async () => {
    if (cryptoCities) {
      setLoading(true);

      const totalSupply = await cryptoCities.methods.totalSupply().call();
      const tokenIds = new Array(Number(totalSupply))
        .fill()
        .map((_, index) => index);

      const citiesPromise = tokenIds.map((tokenId) =>
        getCityData({ cryptoCities, tokenId })
      );

      const citiesResult = await Promise.all(citiesPromise);

      setCities(citiesResult);
      setLoading(false);
    }
  }, [cryptoCities]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    cities,
    loading,
    update,
  };
};

export { useCryptoCitiesData };
