import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../../types/types';
import TabMainScreen from '../screens/AppScreens/TabScreens/TabMainScreen';
import BottomTab_ from '../components/BottomTab/BottomTab';
import LocationSelectHeader from '../components/Header/LocationSelectHeader';
import CalendarNavigator from './CalendarNavigator';
import ClinicListScreen from '../screens/AppScreens/ClinicScreens/ClinicListScreen';
import SchoolNavigator from './SchoolNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{lazy: false}}
      tabBar={props => <BottomTab_ {...props} />}>
      <BottomTab.Screen
        name="Main"
        component={TabMainScreen}
        options={{header: () => <LocationSelectHeader />, tabBarLabel: '홈'}}
      />
      <BottomTab.Screen
        name="Map"
        component={ClinicListScreen}
        options={{headerShown: false, tabBarLabel: '주변'}}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{headerShown: false, tabBarLabel: '알림'}}
      />
      <BottomTab.Screen
        name="School"
        component={SchoolNavigator}
        options={{headerShown: false, tabBarLabel: '학교'}}
      />
    </BottomTab.Navigator>
  );
}
