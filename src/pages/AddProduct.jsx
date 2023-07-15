import { addProduct } from '../api/product.api';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth.context';
import { updateStore } from '../api/stores.api';

const CreateProduct = ({ hideForm, refreshStores }) => {
  const { user } = useContext(AuthContext);
  const [hiddenForm, setHiddenForm] = useState('hidden');
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [img, setImg] = useState('');

  const handleName = event => {
    setName(event.target.value);
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };
  // const handleImg = event => {
  //   setImg(event.target.files[0]);
  // };
  const handleStock = event => {
    setStock(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const newProduct = { name, img, store: user.store, price, stock };

      // if (image) {
      //   //create new formData
      //   // same as encoding type "multipart/form-data"
      //   const uploadData = new FormData();

      //   //add image to form data
      //   uploadData.append('file', image);

      //   const response = await upload(uploadData);
      //   newProject.imgUrl = response.data.fileUrl;
      // }

      const createProduct = await addProduct(newProduct);
      console.log(createProduct.data);
      const objectForStore = {
        store: createProduct.data.store,
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
    hideForm();
    refreshStores();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={handleName}
          />
          {/* <label>Image</label>
        <input
          type='text'
          onChange={handleImg}
        /> */}
          <label>Price:</label>
          <input
            type='number'
            name='price'
            value={price}
            onChange={handlePrice}
          ></input>
          <label>Stock:</label>
          <input
            type='number'
            name='stock'
            value={stock}
            onChange={handleStock}
          ></input>
          <button type='submit'>Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
