import {Dispatch, SetStateAction} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

export type InputEventType = NativeSyntheticEvent<TextInputChangeEventData>;
export type SetStateType<T> = Dispatch<SetStateAction<T>>;
