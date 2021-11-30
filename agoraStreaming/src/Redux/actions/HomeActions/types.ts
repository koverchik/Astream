import {CoordinatesType, ListChannelsType} from '../../../Screens/Home/types';

export type HomeActionsType =
  | ReturnType<SetCoordinatesActionType>
  | ReturnType<SetChannelsListActionType>;

export enum HomeActions {
  SET_COORDINATES = 'SET_COORDINATES',
  SET_CHANNELS_LIST = 'SET_CHANNELS_LIST',
}

export type SetCoordinatesActionType = (payload: CoordinatesType) => {
  type: HomeActions.SET_COORDINATES;
  payload: CoordinatesType;
};

export type SetChannelsListActionType = (payload: ListChannelsType[]) => {
  type: HomeActions.SET_CHANNELS_LIST;
  payload: ListChannelsType[];
};
