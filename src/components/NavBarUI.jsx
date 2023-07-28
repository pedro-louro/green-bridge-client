import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Cart from './CartUI';
import logo from '../assets/logo.png';

const links = [
  { name: 'For Plants Lovers', to: '/stores' },
  { name: 'My Orders', to: '/myorders' },
  { name: 'For Sellers', to: '/mystore' },
  { name: 'For Drivers', to: '/driver/orders' }
];
const authLinks = [
  { name: 'Signup', to: '/signup' },
  { name: 'Login', to: '/login' }
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('green.400', 'gray.700')
    }}
    href={`${children.to}`}
  >
    {children.name}
  </Link>
);

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const userImg = localStorage.getItem('userImg');

  return (
    <Box
      bg={useColorModeValue('green.600', 'gray.900')}
      px={4}
      position='fixed'
      w='100%'
      zIndex={200}
      textColor={'white'}
      fontSize='lg'
      fontWeight={'semibold'}
    >
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          spacing={8}
          alignItems={'center'}
        >
          <Box bg={'white'}>
            <Image
              src={logo}
              h={16}
              alignSelf={'baseline'}
            />
          </Box>
          {isLoggedIn && (
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          )}
        </HStack>
        {isLoggedIn && (
          <Flex alignItems={'center'}>
            <Cart />
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={userImg}
                />
              </MenuButton>
              <MenuList>
                <MenuItem color={'black'}>
                  <NavLink>
                    {{ name: 'Update User', to: '/userdetails' }}
                  </NavLink>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  color={'black'}
                  onClick={logOutUser}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
        {!isLoggedIn && (
          <Flex alignItems={'center'}>
            {authLinks.map(link => (
              <NavLink key={link.name}>{link}</NavLink>
            ))}
          </Flex>
        )}

        {isOpen ? (
          <Box
            pb={4}
            display={{ md: 'none' }}
          >
            <Stack
              as={'nav'}
              spacing={4}
            >
              {links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default NavBar;
