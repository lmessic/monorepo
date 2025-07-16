import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use((req) => {
  return req;
}, (error) => {
  return Promise.reject(error);
})

instance.interceptors.response.use((res) => {
  return res.data;
}, (error) => {
  return Promise.reject(error);
})

export default instance;
