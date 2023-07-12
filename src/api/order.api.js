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

export const addOrder = order => {
  return axios.post(`${baseURL}/orders`, order);
};

export const updateOrder = order => {
  return axios.put(`${baseURL}/orders/${order._id}`, order);
};

export const getOrder = orderId => {
  return axios.get(`${baseURL}/orders/${orderId}`);
};
