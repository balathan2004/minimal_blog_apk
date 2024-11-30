import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './user_slice'

const store = configureStore({
  reducer: {
    USERCRED: UserSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;