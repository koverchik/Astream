import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {AuthScreen} from '../../Screens/Auth';
import {getUserData} from '../../Screens/Auth/helpers/googleSignIn';
import {Live} from '../../Screens/Live';
import {MainTab} from '../Tab';
import {MainStackScreens, RootStackParamList} from './types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator<RootStackParamList>();

export const NavigationStack = () => {
  const userData = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const options: StackNavigationOptions = {headerShown: false};

  const webClientId =
    '1088468777432-7titji4f8tsu0oorpqfibu469sl8jvnj.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({webClientId});
    getUserData(dispatch);
  }, []);

  if (!userData) {
    return <AuthScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'}>
        <Stack.Screen
          name={MainStackScreens.Main}
          component={MainTab}
          options={options}
        />
        <Stack.Screen
          name={MainStackScreens.Live}
          component={Live}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
