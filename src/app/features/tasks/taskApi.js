import apiSlice from '../api/apiSlice';

const taskApi = apiSlice.injectEndpoints({
   endpoints: ({ query, mutation }) => ({
      getTasks: query({
         query: () => ({
            url: '/tasks',
         }),
      }),

      getTask: query({
         query: (id) => ({
            url: `/tasks/${id}`,
         }),
      }),

      addTask: mutation({
         query: (data) => ({
            url: '/tasks',
            method: 'POST',
            body: data,
         }),
         onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
            try {
               const { data: task } = await queryFulfilled;
               dispatch(
                  apiSlice.util.updateQueryData(
                     'getTasks',
                     undefined,
                     (draft) => {
                        draft.push(task);
                     }
                  )
               );
            } catch (error) {
               console.log(error);
            }
         },
      }),

      editTask: mutation({
         query: ({ id, ...patch }) => ({
            url: `/tasks/${id}`,
            method: 'PATCH',
            body: patch,
         }),
         onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
            try {
               const { data: task } = await queryFulfilled;
               dispatch(
                  apiSlice.util.updateQueryData(
                     'getTasks',
                     undefined,
                     (draft) =>
                        draft.map((draftTask) => {
                           if (Number(draftTask.id) === Number(id)) return task;
                           else return draftTask;
                        })
                  )
               );
            } catch (error) {
               console.log(error);
            }
         },
      }),

      deleteTask: mutation({
         query: (id) => ({
            url: `/tasks/${id}`,
            method: 'DELETE',
         }),
         onQueryStarted: async (id, { queryFulfilled, dispatch }) => {
            //optimistic delete
            const patchResult = dispatch(
               apiSlice.util.updateQueryData('getTasks', undefined, (draft) =>
                  draft.filter((task) => Number(task.id) !== id)
               )
            );
            try {
               await queryFulfilled;
            } catch (error) {
               patchResult.undo();
            }
         },
      }),

      updateStatus: mutation({
         query: ({ id, ...patch }) => ({
            url: `/tasks/${id}`,
            method: 'PATCH',
            body: patch,
         }),
         onQueryStarted: async (
            { id, ...patch },
            { queryFulfilled, dispatch }
         ) => {
            await queryFulfilled;
            dispatch(
               apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                  const cachedTask = draft.find(
                     (task) => Number(task.id) === id
                  );
                  cachedTask.status = patch.status;
               })
            );
         },
      }),
   }),
});

export const {
   useGetTasksQuery,
   useUpdateStatusMutation,
   useDeleteTaskMutation,
   useAddTaskMutation,
   useGetTaskQuery,
   useEditTaskMutation,
} = taskApi;
export default taskApi;
