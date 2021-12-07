import {Dispatch, SetStateAction} from 'react';

export type SwitchVideoType = {
  isEnabled: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
};
