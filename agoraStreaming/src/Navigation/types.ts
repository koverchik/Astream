export type RootStackParamList = {
  Home: undefined;
  Live: {type: 'create' | 'join'; channel: string};
};

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
}
