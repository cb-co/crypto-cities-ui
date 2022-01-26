import {
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Tag,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router-dom';

import { useCryptoCityData } from '../../hooks/useCryptoCitiesData';
import RequestAccess from '../../components/RequestAccess';
import CityCard from '../../components/CityCard';
import Loading from '../../components/Loading';

const CityPage = () => {
  const { active, account } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, city } = useCryptoCityData(tokenId);

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack>
        <CityCard
          mx={{
            base: 'auto',
            md: 0,
          }}
          name={city.name}
          image={`https://gateway.pinata.cloud/ipfs/${
            city.image.split('ipfs://')[1]
          }`}
        />
        <Button disabled={account !== city.owner} colorScheme='orange'>
          {account !== city.owner ? 'You are not the owner' : 'Transfer'}
        </Button>
      </Stack>
      <Stack width='85%' spacing={6}>
        <Heading>{city.name}</Heading>
        <Text fontSize='xl'>{city.description}</Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme='orange'>
            {city.owner}
          </Tag>
        </Text>
        <Table size='sm' variant='simple'>
          <Thead>
            <Tr>
              <Th>Attribute</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {city.attributes.map(({ trait_type, value }) => (
              <Tr key={trait_type}>
                <Td>{trait_type}</Td>
                <Td>
                  <Tag>{value}</Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default CityPage;
