import {Region} from 'react-native-maps';

import {ListChannelsType} from '../../../Screens/Home/types';

export type HomeActionsType =
  | ReturnType<SetCoordinatesActionType>
  | ReturnType<SetChannelsListActionType>;

export enum HomeActions {
  SET_COORDINATES = 'SET_COORDINATES',
  SET_CHANNELS_LIST = 'SET_CHANNELS_LIST',
}

export type SetCoordinatesActionType = (payload: Region) => {
  type: HomeActions.SET_COORDINATES;
  payload: Region;
};

export type SetChannelsListActionType = (payload: ListChannelsType[]) => {
  type: HomeActions.SET_CHANNELS_LIST;
  payload: ListChannelsType[];
};
