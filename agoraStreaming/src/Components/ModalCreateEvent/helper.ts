import remoteConfig from '@react-native-firebase/remote-config';

export const remoteConfigTypeStream = async (key: string) => {
  await remoteConfig().fetchAndActivate();
  return remoteConfig().getBoolean(key);
};
