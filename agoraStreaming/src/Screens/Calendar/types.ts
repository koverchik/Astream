export type StreamType = {
  id: string;
  time: number;
  type: CallTypes;
  name: string;
};

export enum CallTypes {
  Audio = 'Audio',
  Video = 'Video',
  Chat = 'Chat',
}
