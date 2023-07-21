import { addProduct, uploadImage } from '../api/product.api';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { updateStore } from '../api/stores.api';
import { Input, Button } from '@chakra-ui/react';

const CreateProduct = ({ refreshStores, myStore }) => {
  const userId = localStorage.getItem('userId');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [img, setImg] = useState('');

  const handleName = event => {
    setName(event.target.value);
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };
  const handleImg = event => {
    setImg(event.target.files[0]);
  };
  const handleStock = event => {
    setStock(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const newProduct = { name, store: myStore._id, price, stock };
      console.log(img);

      if (img) {
        //create new formData
        const uploadData = new FormData();

        //add image to form data
        uploadData.append('file', img);

        const response = await uploadImage(uploadData);

        newProduct.img = response.data.img;
      }

      const createProduct = await addProduct(newProduct);
      const objectForStore = {
        _id: createProduct.data.store,
        products: createProduct.data._id
      };

      const addToStore = await updateStore(objectForStore);
      await toast.success('Product added successfully');
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.log(error);
    }
    setName('');
    setPrice(0);
    setStock(0);
    setImg('');
    refreshStores();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <Input
              type='text'
              name='name'
              value={name}
              onChange={handleName}
            />
          </label>
          <label>Image</label>
          <input
            type='file'
            onChange={handleImg}
          />
          <label>
            Price
            <Input
              variant='outline'
              placeholder='Price'
              type='number'
              name='price'
              value={price}
              onChange={handlePrice}
            />
          </label>
          <label>
            Stock
            <Input
              type='number'
              placeholder='Stock'
              name='stock'
              value={stock}
              onChange={handleStock}
            />
          </label>
          <Button
            type='submit'
            colorScheme='teal'
            variant='outline'
          >
            Create Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
