/* eslint-disable @typescript-eslint/no-unsafe-call */
import Reactotron, {
  asyncStorage,
  networking,
  trackGlobalErrors,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { navigationRef } from './src/App';

const reactotron = Reactotron.configure({ name: 'fresh project' }) // controls connection & communication settings
  .useReactNative()
  .use(trackGlobalErrors())
  .use(networking())
  .use(asyncStorage())
  .use(reactotronRedux());

navigationRef.addListener('state', (e) => {
  reactotron.log(JSON.stringify(e.data.state, null, 2));
});

reactotron.connect(); // let's connect!

export default reactotron;
