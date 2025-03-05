import axios from "axios";

const token = localStorage.getItem('wemixt');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    // timeout: 3000,
    headers: {Authorization: `Bearer ${token}`}
  });
  export default instance;