import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Grid,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import { useCryptoCitiesData } from '../../hooks/useCryptoCitiesData';
import Loading from '../../components/Loading';
import CityCard from '../../components/CityCard';
import RequestAccess from '../../components/RequestAccess';

const Cities = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [address, setAddress] = useState(
    new URLSearchParams(search).get('address')
  );
  const [submitted, setSubmitted] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const { active, library } = useWeb3React();
  const { cities, loading } = useCryptoCitiesData({
    owner: submitted && isValidAddress ? address : null,
  });

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setIsValidAddress(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (address) {
      const isValid = library.utils.isAddress(address);
      setIsValidAddress(isValid);
      setSubmitted(true);

      if (isValid) navigate(`/cities?address=${address}`);
    } else {
      navigate('/cities');
    }
  };

  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />
            <Input
              isInvalid={false}
              value={address ?? ''}
              onChange={handleAddressChange}
              placeholder='Search by address'
            />
            <InputRightElement width='5.5rem'>
              <Button colorScheme='orange' type='submit' h='1.75rem' size='sm'>
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !isValidAddress && (
            <FormHelperText>Invalid address</FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
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
      )}
    </>
  );
};

export default Cities;
