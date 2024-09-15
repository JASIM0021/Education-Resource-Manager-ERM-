import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '../../helper/AsyncStorage';

// let url = "https://android-manager.onrender.com";
// let url=" https://liberal-salmon-enormously.ngrok-free.app"
// let url=
let url = {
  // http://192.168.154.158
  url_dev: 'http://192.168.45.158:3000/api/v1/',
  url_prod: 'https://bupse-medical-service-api.vercel.app/api/v1/',
};
let API_URL = url['url_prod'];

const globalApiSlice = createApi({
  reducerPath: 'erm',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = await AsyncStorage.getToken();
      console.log('token', token);
      if (token) {
        headers.set('authorization', token);
      }

      return headers;
    },
  }),
  tagTypes: ['erm', 'getandpost'],
  endpoints: builder => ({}),
});

export default globalApiSlice;
