import {ReactNode} from 'react';

export type RoundButtonPropsType = {
  handler: () => void;
  icon: ReactNode;

  color?: string;
};
