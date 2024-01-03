import { createSlice } from '@reduxjs/toolkit';

const initialState = { filters: [], search: '' };

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      toggleFilter: (state, { payload }) => {
         if (state.filters.includes(payload.projectName)) {
            if (!payload.check) {
               state.filters.splice(
                  state.filters.indexOf(payload.projectName),
                  1
               );
            }
         } else {
            if (payload.check) state.filters.push(payload.projectName);
         }
      },
      searchFilter: (state, { payload }) => {
         state.search = payload;
      },
   },
});

export const { toggleFilter, searchFilter } = filterSlice.actions;
export default filterSlice.reducer;
