export type InitialStateUserType = {
  name: string;
  uidStream: number | null;
  keyDatabases: string;
};
export enum StreamTypes {
  USER_NAME = 'USER_NAME',
  INFO_STREAM = 'INFO_STREAM',
}
