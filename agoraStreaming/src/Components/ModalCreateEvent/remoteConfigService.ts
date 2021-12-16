import remoteConfig from '@react-native-firebase/remote-config';

export const RemoteConfigService = {
  initialize: async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 300,
    });
    await remoteConfig().setDefaults({type_stream: false});
    await remoteConfig().fetchAndActivate();
  },
  getRemoteValueString: (key: string) => remoteConfig().getString(key),
  getRemoteValueBoolean: (key: string) => remoteConfig().getBoolean(key),
};
