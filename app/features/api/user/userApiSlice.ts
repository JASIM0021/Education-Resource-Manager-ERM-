import { Endpoints } from "../../../services/endpoint";
import globalApiSlice from "../globalApiSlice";

const userInfo = globalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: 'user/create-user',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: Endpoints.login.url,
        method: 'POST',
        body: data,
      })
    })
  }),
});
export const { useCreateUserMutation, useLoginUserMutation } = userInfo;
