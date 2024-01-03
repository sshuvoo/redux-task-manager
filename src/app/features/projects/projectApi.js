import apiSlice from '../api/apiSlice';

const projectApi = apiSlice.injectEndpoints({
   endpoints: ({ query }) => ({
      getProjects: query({
         query: () => ({
            url: '/projects',
         }),
      }),
   }),
});

export const { useGetProjectsQuery } = projectApi;
export default projectApi;
