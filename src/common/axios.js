import axios from 'axios';

// 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://dev-admin.hyundaicapital.com:8443',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
