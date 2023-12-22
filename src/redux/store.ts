import {configureStore} from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {  },
});

export default store;
