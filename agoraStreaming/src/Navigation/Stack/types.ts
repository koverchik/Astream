import {Region} from 'react-native-maps';

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
}

export enum LiveType {
  CREATE = 'create',
  JOIN = 'join',
}

export type RootStackParamList = {
  Home: undefined;
  Live: {
    type: LiveType;
    channelId: string;
    name?: string;
    coords?: Region;
  };
};
