import axios from "axios";

// const token = localStorage.getItem('wemixt');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {Authorization: `Bearer ${token}`}
  });
  export default instance;