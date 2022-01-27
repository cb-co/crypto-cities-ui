import { useCallback, useEffect, useState } from 'react';
import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import useCryptoCities from '../../hooks/useCryptoCities';

const Home = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [maxSupply, setMaxSupply] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const { active, account } = useWeb3React();
  const cryptoCities = useCryptoCities();
  const toast = useToast();

  const getCryptoCitiesData = useCallback(async () => {
    setImageSrc(
      `https://gateway.pinata.cloud/ipfs/QmVpDJfMPvf9x1vWZQQ9W7wUXvMxWQ44Rxe6e3U4Gsvfi2/${Math.floor(
        Math.random() * 9
      )}.png`
    );

    if (cryptoCities) {
      setTotalSupply(await cryptoCities.methods.totalSupply().call());
      setMaxSupply(await cryptoCities.methods.maxSupply().call());
    }
  }, [cryptoCities]);

  useEffect(() => {
    getCryptoCitiesData();
  }, [getCryptoCitiesData]);

  const mint = () => {
    setIsMinting(true);

    cryptoCities.methods
      .mint()
      .send({ from: account })
      .on('transactionHash', (txHash) => {
        toast({
          title: 'Transaction sent',
          description: txHash,
          status: 'info',
        });
      })
      .on('receipt', () => {
        setIsMinting(false);
        toast({
          title: 'Transaction confirmed',
          description: 'Now you can see your NFT available.',
          status: 'success',
        });
      })
      .on('error', (error) => {
        setIsMinting(false);
        toast({
          title: 'Transaction failed',
          description: error.message,
          status: 'error',
        });
      });
  };

  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 2 }}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
        >
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '30%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: '#c79f55',
              zIndex: -1,
            }}
          >
            a crypto city
          </Text>
          <br />
          <Text as={'span'} color={'#c79f55'}>
            minimal art, rich culture
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          Crypto Cities is a collection of art inspired by one of the most
          famous cities in the world, with all its data stored on-chain. Each
          possess a set of characteristics like area and population.
        </Text>
        <Text color={'#c79f55'}>
          Each Crypto City gets sequentially generated based on the order of
          your mint, use the pre-visualizer to know the various designs we've
          made.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            colorScheme={'brand'}
            bg={'#c79f55'}
            _hover={{ bg: '#b38f4d' }}
            disabled={!cryptoCities}
            isLoading={isMinting}
            onClick={mint}
          >
            Get your city
          </Button>
          <Link to='/cities'>
            <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6}>
              Gallery
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction='column'
        justify={'center'}
        align={'center'}
        position={'relative'}
        w={'full'}
      >
        <Image src={imageSrc} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge pb={1}>
                Next ID:
                <Badge ml={1} colorScheme='orange'>
                  {totalSupply}
                </Badge>
              </Badge>
              <Badge ml={2}>
                Total supply:
                <Badge ml={1} colorScheme='orange'>
                  {totalSupply}
                </Badge>
              </Badge>
              <Badge ml={2}>
                Max supply:
                <Badge ml={1} colorScheme='orange'>
                  {maxSupply}
                </Badge>
              </Badge>
            </Flex>
          </>
        ) : (
          <Badge mt={2}>Wallet disconnected</Badge>
        )}
        <Button
          onClick={getCryptoCitiesData}
          mt={4}
          size='xs'
          colorScheme='orange'
        >
          Refresh
        </Button>
      </Flex>
    </Stack>
  );
};

export default Home;
