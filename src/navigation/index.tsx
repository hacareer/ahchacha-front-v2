import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import BottomTabNavigator from './BottomTabNavigator';
import RegisterNavigator from './RegisterNavigator';
import ClinicNavigator from './ClinicNavigator';
import CalendarNavigator from './CalendarNavigator';
import UtilNavigator from './UtilNavigator';
import SchoolNavigator from './SchoolNavigator';
import {useSelector} from 'react-redux';
import {IReduxState} from '../redux/types';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator<RootStackParamList>();
export default function RootNavigator() {
  const userInfo = useSelector((state: IReduxState) => state.userInfo);
  const screenOptions = {headerShown: false};
  React.useEffect(() => {
    if (userInfo) {
      // hide boot splash
      RNBootSplash.hide({fade: true}); // fade
    }
  }, [userInfo]);
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!userInfo && (
        <Stack.Screen name="Register" component={RegisterNavigator} />
      )}
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      <Stack.Screen name="Clinic" component={ClinicNavigator} />
      <Stack.Screen name="Calendar" component={CalendarNavigator} />
      <Stack.Screen name="Util" component={UtilNavigator} />
      <Stack.Screen name="School" component={SchoolNavigator} />
    </Stack.Navigator>
  );
}
