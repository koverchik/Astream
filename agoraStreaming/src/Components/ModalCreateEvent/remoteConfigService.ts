import remoteConfig from '@react-native-firebase/remote-config';

export const remoteConfigService = {
  initialize: async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 300,
    });
    await remoteConfig().fetchAndActivate();
  },
  getRemoteValueString: (key: string) => remoteConfig().getString(key),
  getRemoteValueBoolean: (key: string) => remoteConfig().getBoolean(key),
};
