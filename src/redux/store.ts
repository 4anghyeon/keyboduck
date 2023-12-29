import {configureStore} from '@reduxjs/toolkit';
import userSlice from './modules/userSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    userSlice,
  },
});

export default store;
