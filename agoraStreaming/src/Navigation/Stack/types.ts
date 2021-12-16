import {LatLng, Region} from 'react-native-maps';

export enum LiveType {
  CREATE = 'create',
  JOIN = 'join',
}

export type RootStackParamList = {
  Main: undefined;
  Live: {
    type: LiveType;
    channelId: string;
    isVideo: boolean;

    name?: string;
    coords?: LatLng | Region;
  };
};

export enum MainStackScreens {
  Main = 'Main',
  Live = 'Live',
}
