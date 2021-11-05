export type InitialStateUserType = {
  name: string;
  uid: number | null;
  keyDatabases: string;
};
export enum StreamTypes {
  USER_NAME = 'USER_NAME',
  INFO_STREAM = 'INFO_STREAM',
}
