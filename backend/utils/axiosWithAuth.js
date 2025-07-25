import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosWithAuth = axios.create({
  baseURL: 'http://localhost:5001/api',
});

axiosWithAuth.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('Current user in interceptor:', user);

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default axiosWithAuth;
