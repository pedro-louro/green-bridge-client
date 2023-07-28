import {
  Box,
  Container,
  Image,
  Link,
  Stack,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ImGithub } from 'react-icons/im';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      w={'full'}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Image
          w={'55px'}
          src='https://res.cloudinary.com/dbdzfjr4x/image/upload/v1690506422/green-bridge/logo_lcqxhl.png'
        />
        <Stack
          direction={'row'}
          spacing={6}
        >
          <Link href={'#'}>Home</Link>
          <Link href={'/stores'}>Stores</Link>
          <Link href={'/drivers'}>Drivers</Link>
          <Link href={'mailto:pedrolouro93@gmail.com'}>Contact</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Link href={'https://github.com/pedro-louro/green-bridge-client'}>
            <Icon as={ImGithub} /> Open on GitHub
          </Link>
          <Stack
            direction={'row'}
            spacing={6}
          >
            <Icon
              label={'Twitter'}
              as={FaTwitter}
            />
            <Icon
              label={'Twitter'}
              as={FaYoutube}
            />
            <Icon
              label={'Twitter'}
              as={FaInstagram}
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
export default Footer;
