import { Endpoints } from '../../../services/endpoint';
import globalApiSlice from '../globalApiSlice';

const userInfo = globalApiSlice.injectEndpoints({
  endpoints: builder => ({
    getSearchResult: builder.query({
      query: ({ queryParams }) => {
        const searchparams = new URLSearchParams();

        let returnObject: any = {
          url: 'organizations',
          method: 'GET',
        };

        //

        if (queryParams && queryParams?.length > 0) {
          queryParams.forEach(element => {
            const valueString = Array.isArray(element.value)
              ? JSON.stringify(element.value)
              : String(element.value);
            if (valueString) {
              searchparams.append(element.name, valueString);
            }
          });

          returnObject.params = searchparams;
        }
        return returnObject;
        // return {
        //   url: 'organizations',
        //   method: 'GET',
        // };
      },
    }),
  }),
});
export const { useGetSearchResultQuery } = userInfo;
