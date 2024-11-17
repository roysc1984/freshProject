/* eslint-disable @typescript-eslint/no-unsafe-call */
import Reactotron, {
  asyncStorage,
  networking,
  trackGlobalErrors,
} from 'reactotron-react-native';

const reactotron = Reactotron.configure({ name: 'fresh project' }) // controls connection & communication settings
  .useReactNative()
  .use(trackGlobalErrors())
  .use(networking())
  .use(asyncStorage());

reactotron.connect(); // let's connect!

export default reactotron;
