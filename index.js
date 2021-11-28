/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {
  AndroidImportance,
  AndroidBigPictureStyle,
  AndroidStyle,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

notifee.createChannelGroups([{id: 'group', name: '일반'}]);
notifee.createChannel({
  importance: AndroidImportance.HIGH,
  id: 'channel',
  name: '기타',
  description: '기타 알림입니다.',
  groupId: 'group',
});
function messageReceiveHandler(message) {
  console.log(message);
}
messaging().onMessage(messageReceiveHandler);
AppRegistry.registerComponent(appName, () => App);
