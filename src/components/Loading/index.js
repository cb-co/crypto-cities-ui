import { Center, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Center my={20}>
      <Spinner colorScheme='orange' />
    </Center>
  );
};

export default Loading;
