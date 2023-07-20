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
  Stack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Cart from './CartUI';

const links = [
  { name: 'Stores', to: '/stores' },
  { name: 'My Orders', to: '/myorders' },
  { name: 'My Store', to: '/mystore' },
  { name: 'Driver', to: '/driver/orders' }
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

  return (
    <>
      <Box
        bg={useColorModeValue('green.100', 'gray.900')}
        px={4}
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
            <Box>Logo</Box>
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
              {/* <Link href='/mycart'>
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                  leftIcon={<Icon as={BsCart4} />}
                >
                  Cart
                </Button>
              </Link> */}
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
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logOutUser}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
          {!isLoggedIn && (
            <Flex alignItems={'center'}>
              {authLinks.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Flex>
          )}
        </Flex>

        {isOpen ? (
          <Box
            pb={4}
            display={{ md: 'none' }}
          >
            <Stack
              as={'nav'}
              spacing={4}
            >
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavBar;
