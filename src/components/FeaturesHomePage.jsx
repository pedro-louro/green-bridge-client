import {
  Image,
  Flex,
  Heading,
  Box,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { PiPlant } from 'react-icons/pi';
import { MdStorefront } from 'react-icons/md';
import { MdDeliveryDining } from 'react-icons/md';

const FeaturesHomePage = () => {
  return (
    <HStack
      spacing={40}
      p={5}
    >
      <Image
        w={'md'}
        rounded={'md'}
        alt={'monstera design by pngtree.com '}
        src='https://res.cloudinary.com/dbdzfjr4x/image/upload/c_thumb,h_3000,g_auto/v1690570820/green-bridge/Pngtree_nordic_present_decoration_green_plant_3799519_hpecmt.png'
      />
      <Box
        spacing={4}
        w={'xl'}
      >
        <Heading>
          <Icon
            fontSize={{ base: '1xl', sm: '2xl', md: '4xl' }}
            as={PiPlant}
            color={'#00923A'}
          />
          <Text color={'#00923A'}>Greenery for All</Text> An App that Empowers
          Plant Shopping!
        </Heading>
        <Text
          p={5}
          color={'gray.700'}
          fontSize={'lg'}
        >
          <Text
            as={'span'}
            color={'#00923A'}
          >
            <b> Green Bridge</b>
          </Text>{' '}
          is designed to revolutionize the plant retail and delivery industry,
          making it more accessible to everyone.
        </Text>
        <Stack
          spacing={4}
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.100', 'gray.700')}
            />
          }
          textAlign={'left'}
        >
          <Stack
            p={5}
            direction={'row'}
            align={'center'}
          >
            <Flex
              w={10}
              h={10}
              align={'center'}
              justify={'center'}
              rounded={'full'}
              bg={'green.50'}
            >
              <Icon
                size='lg'
                as={PiPlant}
                color={'green.600'}
                w={7}
                h={7}
              />{' '}
            </Flex>
            <Text fontWeight={600}>
              Explore a captivating world of botanical wonders with our curated
              plant shopping experience!
            </Text>
          </Stack>
          <Stack
            p={5}
            direction={'row'}
            align={'center'}
          >
            <Flex
              w={10}
              h={10}
              align={'center'}
              justify={'center'}
              rounded={'full'}
              bg={'blue.50'}
            >
              <Icon
                as={MdStorefront}
                color={'blue.600'}
                w={7}
                h={7}
              />{' '}
            </Flex>
            <Text fontWeight={600}>
              Embrace the horticultural entrepreneur within you with our
              platform, where selling plants is made effortless and rewarding!
            </Text>
          </Stack>
          <Stack
            p={5}
            direction={'row'}
            align={'center'}
          >
            <Flex
              w={10}
              h={10}
              align={'center'}
              justify={'center'}
              rounded={'full'}
              bg={'red.50'}
            >
              <Icon
                as={MdDeliveryDining}
                color={'red.500'}
                w={7}
                h={7}
              />{' '}
            </Flex>
            <Text fontWeight={600}>
              Turn your love for plants into a lucrative venture! Earn money
              with every plant delivery through our rewarding platform.
            </Text>
          </Stack>
        </Stack>
      </Box>
    </HStack>
  );
};
export default FeaturesHomePage;
