import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Container,
  Heading,
  Button,
  Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const StoreCard = ({ store }) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      bg='#ebf2e8'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '250px' }}
        src={store.img}
        alt={`${store.name} picture`}
      />

      <Container centerContent>
        <CardBody>
          <Heading size='lg'>{store.name}</Heading>

          <Text py='2'>Lorem</Text>
        </CardBody>

        <CardFooter>
          <Link to={`/stores/${store._id}`}>
            <Button
              variant='solid'
              colorScheme='blue'
            >
              Shop for plants!
            </Button>
          </Link>
        </CardFooter>
      </Container>
    </Card>
  );
};

export default StoreCard;
