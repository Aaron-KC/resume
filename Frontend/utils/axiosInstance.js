import axios from 'axios'
import { BASE_URL } from './apiPaths'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('token');
  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (err) {
  if(err.response && err.response.status ==  401) {
    window.location.href == '/'
  }
  return Promise.reject(err);
});