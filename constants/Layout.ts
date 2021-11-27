import {Dimensions, StatusBar} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

export default {
  window: {
    width,
    height,
  },
  bottomTabHeight: 64,
  statusBarHeight,
};
