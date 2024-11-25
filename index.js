/**
 * @format
 */
if (__DEV__ && !process.env.JEST_WORKER_ID ) {
    require("./ReactotronConfig");
}
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
