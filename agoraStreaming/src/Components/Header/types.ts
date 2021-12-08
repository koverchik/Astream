import {TextInputProps} from 'react-native';

import {HeaderInputPlaceholders} from '../../Navigation/Tab/types';
import {SetStateType} from '../../Types/universalTypes';

export type CustomHeaderPropsType = {
  title: string;
  placeholderText: HeaderInputPlaceholders;
  filter: TextInputProps['onChange'];

  inputValue?: string;
  searchMode?: boolean;
  onChangeInputText?: SetStateType<string>;
  onChangeSearchMode?: () => void;
};
