import globalApiSlice from "../globalApiSlice";

const userInfo = globalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useSaveUserMutation } = userInfo;
