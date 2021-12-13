import {GeoType} from '../../Screens/Home/types';

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
    coords?: GeoType;
  };
};

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
}
