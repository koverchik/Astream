import React, {ReactNode} from 'react';

import {CameraSvg} from '../../../Icons/CameraSvg';
import {ChatSvg} from '../../../Icons/ChatSvg';
import {SoundSvg} from '../../../Icons/SoundSvg';
import {CallTypes, StreamType} from '../../../Screens/Calendar/types';

export const getStreamTypeIcon = (type: StreamType['type']): ReactNode => {
  switch (type) {
    case CallTypes.Audio: {
      return <SoundSvg color={'#0494f3'} size={16} />;
    }
    case CallTypes.Video: {
      return <CameraSvg color={'#0494f3'} size={13} />;
    }
    case CallTypes.Chat: {
      return <ChatSvg color={'#0494f3'} size={13} />;
    }
    default:
      return <SoundSvg color={'#2997dc'} size={16} />;
  }
};
