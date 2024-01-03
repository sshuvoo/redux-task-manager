import apiSlice from '../api/apiSlice';

const teamApi = apiSlice.injectEndpoints({
   endpoints: ({ query }) => ({
      getTeam: query({
         query: () => ({
            url: '/team',
         }),
      }),
   }),
});

export const { useGetTeamQuery } = teamApi;
export default teamApi;
