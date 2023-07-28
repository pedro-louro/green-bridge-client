import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  Image,
  Box,
  VStack
} from '@chakra-ui/react';
import { PiPlant } from 'react-icons/pi';
import { MdStorefront } from 'react-icons/md';
import { MdDeliveryDining } from 'react-icons/md';

const HomePage = () => {
  return (
    <Box
      bg='#f2efda'
      h={'100vh'}
    >
      <Box h={'50px'}></Box>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 15 }}
        >
          <VStack>
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            >
              <Text
                as={'span'}
                color={'#F2B13A'}
              >
                Shop{' '}
              </Text>
              <Icon
                fontSize={{ base: '1xl', sm: '2xl', md: '4xl' }}
                as={MdStorefront}
                color={'#00923A'}
              />{' '}
              <Text
                as={'span'}
                color={'#F2B13A'}
              >
                Sell{' '}
              </Text>
              <Icon
                fontSize={{ base: '1xl', sm: '2xl', md: '4xl' }}
                as={MdDeliveryDining}
                color={'#00923A'}
              />{' '}
              <Text
                as={'span'}
                color={'#F2B13A'}
              >
                Deliver
              </Text>
            </Heading>
            <Image
              height={{ sm: '24rem', lg: '35rem' }}
              src='https://res.cloudinary.com/dbdzfjr4x/image/upload/v1690560007/green-bridge/7542099_bgi1hw.png'
            />
            <Heading
              color={'#00923A'}
              fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
            >
              <Icon
                fontSize={{ base: '1xl', sm: '2xl', md: '4xl' }}
                as={PiPlant}
                color={'#00923A'}
              />{' '}
              Green Bridge
            </Heading>
            <Text
              color={'gray.500'}
              maxW={'3xl'}
            >
              Never miss a meeting. Never be late for one too. Keep track of
              your meetings and receive smart reminders in appropriate times.
              Read your smart “Daily Agenda” every morning.
            </Text>
            <Stack
              spacing={6}
              direction={'row'}
            >
              <Button
                rounded={'full'}
                px={6}
                colorScheme={'orange'}
                bg={'orange.400'}
                _hover={{ bg: 'orange.500' }}
              >
                Get started
              </Button>
              <Button
                rounded={'full'}
                px={6}
              >
                Learn more
              </Button>
            </Stack>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
