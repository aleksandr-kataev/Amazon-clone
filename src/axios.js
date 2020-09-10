import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-clone-332a8.cloudfunctions.net/api',
  // http://localhost:5001/clone-332a8/us-central1/api
});

export default instance;
