export type AuthStateType = {
  user: AuthDataType | null;
};

export type AuthDataType = {
  displayName: string | null;
  email: string | null;
  uid: string | null;
};
