import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './features/api/apiSlice';
import filterSlice from './features/filter/filterSlice';

const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      filter: filterSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
