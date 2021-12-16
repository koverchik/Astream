import {ListChannelsType} from '../../../Screens/Home/types';

export type HomeActionsType =
  | ReturnType<SetShowCalloutActionType>
  | ReturnType<SetChannelsListActionType>;

export enum HomeActions {
  SET_CHANNELS_LIST = 'SET_CHANNELS_LIST',
  SET_SHOW_CALLOUT = 'SET_SHOW_CALLOUT',
}

export type SetChannelsListActionType = (payload: ListChannelsType[]) => {
  type: HomeActions.SET_CHANNELS_LIST;
  payload: ListChannelsType[];
};

export type SetShowCalloutActionType = (payload: {
  calloutIsShow: boolean;
  channelId: string;
}) => {
  type: HomeActions.SET_SHOW_CALLOUT;
  payload: {
    calloutIsShow: boolean;
    channelId: string;
  };
};
