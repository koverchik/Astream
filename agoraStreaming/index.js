import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';

/**
 * @format
 */
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
