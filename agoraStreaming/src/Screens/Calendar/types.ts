export type StreamType = {
  id: string;
  time: string;
  type: 'Audio' | 'Video' | 'Chat';
  name: string;
};

export enum CallTypes {
  Audio = 'Audio',
  Video = 'Video',
  Chat = 'Chat',
}
