import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// let url = "https://android-manager.onrender.com";
// let url=" https://liberal-salmon-enormously.ngrok-free.app"
// let url=
let url = {
  // http://192.168.154.158
  url_dev:"http://192.168.154.158:5699/api/v1/",
  url_prod:"https://erm-auth-service.onrender.com/api/v1/"
}
let API_URL = url['url_dev']

const globalApiSlice = createApi({
  reducerPath: "erm",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: async (headers, { getState, endpoint }) => {
    // //   const token = JSON.parse(localStorage.getItem('x-access-token'));
    // //   if (token) {
    // //     headers.set('x-access-token', token);
    // //   }

    //   return headers;
    // },
  }),
  tagTypes: ["erm", "getandpost"],
  endpoints: (builder) => ({}),
});

export default globalApiSlice;
