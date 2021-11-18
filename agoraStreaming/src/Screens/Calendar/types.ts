export type StreamType = {
  id: number;
  time: string;
  type: 'Audio' | 'Video' | 'Chat';
  name: string;
};
