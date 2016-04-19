/// <reference path='../typings/browser.d.ts' />

import * as axios from 'axios';   // d.tsがあるとimportで書ける。ないと var axios = require('axios')
import { clearAuthData } from './vuex/actions'
import { API_ENDPOINT } from './App'

export function configAxios(router, store) {
  
  axios.defaults.baseURL = API_ENDPOINT;
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  
  axios.interceptors.response.use((config) => {
    return config;
  }, (error) => {
      console.log(error.data);
      if (error.status === 401) {
        clearAuthData(store)
        router.go('/login')
        return Promise.reject(error)
      }
  });
}
