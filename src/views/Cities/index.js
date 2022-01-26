import { useWeb3React } from '@web3-react/core';
import { Grid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useCryptoCitiesData } from '../../hooks/useCryptoCitiesData';
import Loading from '../../components/Loading';
import CityCard from '../../components/CityCard';
import RequestAccess from '../../components/RequestAccess';

const Cities = () => {
  const { active } = useWeb3React();
  const { cities, loading } = useCryptoCitiesData();

  if (!active) return <RequestAccess />;

  return loading ? (
    <Loading />
  ) : (
    <Grid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' gap={4}>
      {cities.map(({ tokenId, name, image }) => (
        <Link key={tokenId} to={`/cities/${tokenId}`}>
          <CityCard
            name={name}
            image={`https://gateway.pinata.cloud/ipfs/${
              image.split('ipfs://')[1]
            }`}
          />
        </Link>
      ))}
    </Grid>
  );
};

export default Cities;
