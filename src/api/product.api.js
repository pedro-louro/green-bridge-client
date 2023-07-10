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