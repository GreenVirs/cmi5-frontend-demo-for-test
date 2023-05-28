import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';
import { initialStateUser } from '../services/reducers/user';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: initialStateUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
