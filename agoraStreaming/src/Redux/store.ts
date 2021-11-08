// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = any; //ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = any; //typeof store.dispatch;
