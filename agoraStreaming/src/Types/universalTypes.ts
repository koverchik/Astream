import {Dispatch, SetStateAction} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

export type InputEventType = NativeSyntheticEvent<TextInputChangeEventData>;
export type SetStateType<T> = Dispatch<SetStateAction<T>>;

export enum AnalyticsType {
  AUDIO = 'audio',
  VIDEO = 'video',
  CREATE_STREAM = 'create_stream',
  SIGN_OUT = 'sign_out',
  CLICK_ON_TAB = 'click_on_tab',
}
