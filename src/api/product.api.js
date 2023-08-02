import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;
const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }

    return config;
  });
};

setAuthorizationHeaders();

export const addProduct = product => {
  return axios.post(`${baseURL}/products`, product);
};
export const deleteProduct = productID => {
  return axios.delete(`${baseURL}/products/${productID}`);
};

export const updateProduct = product => {
  return axios.put(`${baseURL}/products/${product._id}`, product);
};

export const uploadImage = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
