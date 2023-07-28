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
  useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Cart from './CartUI';
import ProfileAvatar from './ProfileAvatar';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        <Menu>
          <MenuButton
            size={'sm'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            as={IconButton}
            onClick={isOpen ? onClose : onOpen}
          />
          {isOpen ? (
            <MenuList
              pb={4}
              display={{ md: 'none' }}
              bg='#f2efda'
              w='full'
              size='sm'
              p={2}
            >
              {links.map(link => (
                <MenuItem
                  key={link.name}
                  color={'black'}
                  bg='#f2efda'
                >
                  <NavLink size='xs'>{link}</NavLink>
                </MenuItem>
              ))}
            </MenuList>
          ) : null}
        </Menu>
        <HStack
          spacing={8}
          alignItems={'center'}
        >
          {/* App Logo */}
          <a href='/'>
            <Avatar
              src={
                'https://res.cloudinary.com/dbdzfjr4x/image/upload/v1690506422/green-bridge/logo_lcqxhl.png'
              }
              size={'lg'}
            />
          </a>

          {isLoggedIn && (
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {links.map(link => (
                <NavLink key={link.name}>{link}</NavLink>
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
                <ProfileAvatar />
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
      </Flex>
    </Box>
  );
};

export default NavBar;
