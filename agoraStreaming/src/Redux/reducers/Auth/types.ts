export type AuthStateType = {
  user: AuthDataType | null;
};

export type AuthDataType = {
  email: string | null;
  familyName: string | null;
  givenName: string | null;
  id: string | null;
  name: string | null;
  photo: string | null;
};
