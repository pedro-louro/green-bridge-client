import { addStore } from '../api/stores.api';
import { updateUser } from '../api/auth.api';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

const AddStore = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImg] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleName = event => {
    setName(event.target.value);
  };

  const handleAddress = event => {
    setAddress(event.target.value);
  };
  // const handleImg = event => {
  //   setImg(event.target.files[0]);
  // };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const newStore = { name, address, admin: user._id };

      // if (image) {
      //   //create new formData
      //   // same as encoding type "multipart/form-data"
      //   const uploadData = new FormData();

      //   //add image to form data
      //   uploadData.append('file', image);

      //   const response = await upload(uploadData);
      //   newProject.imgUrl = response.data.fileUrl;
      // }

      const createdStore = await addStore(newStore);
      const userData = { _id: user._id, store: createdStore.data._id };
      const addToUser = await updateUser(userData);

      await toast.success('Store added successfully');
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.log(error);
    }
    setName('');
    setAddress('');
    // setImg('');

    navigate(`/myStore/`);
  };

  return (
    <div>
      <h2>Add Store</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={handleName}
        />
        <label>Address:</label>
        <input
          type='text'
          name='address'
          value={address}
          onChange={handleAddress}
        ></input>

        {/* <label>Image</label>
        <input
          type='text'
          onChange={handleImg}
        /> */}
        <button type='submit'>Create Store</button>
      </form>
    </div>
  );
};

export default AddStore;
