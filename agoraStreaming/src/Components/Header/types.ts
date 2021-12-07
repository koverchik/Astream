import {Dispatch, SetStateAction} from 'react';
import {TextInputProps} from 'react-native';

import {HeaderInputPlaceholders} from '../../Navigation/Tab/types';

export type CustomHeaderPropsType = {
  title: string;
  placeholderText: HeaderInputPlaceholders;
  filter: TextInputProps['onChange'];

  inputValue?: string;
  searchMode?: boolean;
  onChangeInputText?: Dispatch<SetStateAction<string>>;
  onChangeSearchMode?: () => void;
};
