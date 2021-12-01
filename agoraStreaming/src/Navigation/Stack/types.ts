import {Region} from 'react-native-maps';

export enum LiveType {
  CREATE = 'create',
  JOIN = 'join',
}

export type RootStackParamList = {
  Home: undefined;
  Live: {
    type: LiveType;
    channelId: string;
    isVideo: boolean;
    name?: string;
    coords?: Region;
  };
};

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
}
