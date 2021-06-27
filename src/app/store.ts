import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
