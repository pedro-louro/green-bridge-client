import {
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
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import FeaturesHomePage from '../components/FeaturesHomePage';
import Footer from '../components/Footer';

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Box>
      <Box h={'60px'}></Box>
      <VStack>
        <Box
          bg='#f2efda'
          w='full'
        >
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
                  Green Bridge{' '}
                  <Icon
                    fontSize={{ base: '1xl', sm: '2xl', md: '4xl' }}
                    as={MdDeliveryDining}
                    color={'#00923A'}
                  />
                </Heading>
                <Text
                  color={'gray.700'}
                  maxW={'3xl'}
                >
                  It was never this easy to shop and sell plants! Find your{' '}
                  <Text
                    as={'span'}
                    color={'#00923A'}
                    fontWeight={'bold'}
                  >
                    favorite plants,
                  </Text>{' '}
                  register{' '}
                  <Text
                    as={'span'}
                    color={'#00923A'}
                    fontWeight={'bold'}
                  >
                    your shop,
                  </Text>{' '}
                  earn money with{' '}
                  <Text
                    as={'span'}
                    color={'#00923A'}
                    fontWeight={'bold'}
                    fontStyle={''}
                  >
                    plants deliveries.
                  </Text>
                </Text>
                <Stack
                  spacing={6}
                  direction={'row'}
                >
                  <Link to={isLoggedIn ? '/stores' : '/signup'}>
                    <Button
                      rounded={'full'}
                      px={6}
                      bg='#F2B13A'
                      _hover={{
                        bg: '#fcfadb'
                      }}
                    >
                      Get started
                    </Button>
                  </Link>
                </Stack>
              </VStack>
            </Stack>
          </Container>
        </Box>
        <Stack>
          <FeaturesHomePage />
        </Stack>
        <Footer />
      </VStack>
    </Box>
  );
};

export default HomePage;
