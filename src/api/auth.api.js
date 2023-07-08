import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

export const updateUser = user => {
  return axios.put(`${baseURL}/user/${user._id}`, user);
};

// headers of the verify request
export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  });
};
