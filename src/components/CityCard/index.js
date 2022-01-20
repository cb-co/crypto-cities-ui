import {
  Box,
  useColorModeValue,
  Heading,
  Stack,
  Image,
} from '@chakra-ui/react';

const CityCard = ({ image, name, ...props }) => {
  return (
    <Box
      role={'group'}
      p={4}
      w={'full'}
      maxWidth={'350px'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow='md'
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
      {...props}
    >
      <Box
        rounded={'lg'}
        pos={'relative'}
        height={'360px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 0,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: 'blur(10px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(15px)',
          },
        }}
      >
        <Image
          rounded={'lg'}
          height={360}
          width={350}
          objectFit={'cover'}
          src={image}
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
          {name}
        </Heading>
      </Stack>
    </Box>
  );
};

export default CityCard;
