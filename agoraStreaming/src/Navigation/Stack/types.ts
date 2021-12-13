import {GeoType} from '../../Screens/Home/types';

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
    coords?: GeoType;
  };
};

export enum MainStackScreens {
  Main = 'Main',
  Live = 'Live',
}
