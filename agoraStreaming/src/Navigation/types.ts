export enum LiveType {
  CREATE = 'create',
  JOIN = 'join',
}

export type RootStackParamList = {
  Home: undefined;
  Live: {type: LiveType; channel: string};
};

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
}
