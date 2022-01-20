import { useWeb3React } from '@web3-react/core';
import { Grid } from '@chakra-ui/react';
import { useCryptoCitiesData } from '../../hooks/useCryptoCitiesData';
import Loading from '../../components/Loading';
import CityCard from '../../components/CityCard';
import RequestAcces from '../../components/RequestAccess';

const Cities = () => {
  const { active } = useWeb3React();
  const { cities, loading } = useCryptoCitiesData();

  if (!active) return <RequestAcces />;

  return loading ? (
    <Loading />
  ) : (
    <Grid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' gap={4}>
      {cities.map(({ tokenId, name, image }) => (
        <CityCard
          key={tokenId}
          name={name}
          image={`https://gateway.pinata.cloud/ipfs/${
            image.split('ipfs://')[1]
          }`}
        />
      ))}
    </Grid>
  );
};

export default Cities;
