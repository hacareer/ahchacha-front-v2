import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CalendarParamList} from '../../types/types';
import CalendarAddAlarmScreen from '../screens/AppScreens/CalendarScreens/CalendarAddAlarmScreen';
import CalendarAddScheduleScreen from '../screens/AppScreens/CalendarScreens/CalendarAddScheduleScreen';
import CalendarDetailScreen from '../screens/AppScreens/CalendarScreens/CalendarDetailScreen';
import CalendarMainScreen from '../screens/AppScreens/CalendarScreens/CalendarMainScreen';
import TextHeader from '../components/Header/TextHeader';
import {HEADER_STYLE} from '../../styles/header';
import CalendarSelectAlarmTime from '../screens/AppScreens/CalendarScreens/CalendarSelectAlarmTime';

const Calendar = createStackNavigator<CalendarParamList>();
export default function CalendarNavigator() {
  return (
    <Calendar.Navigator>
      <Calendar.Screen
        name="Main"
        component={CalendarMainScreen}
        options={{
          headerTitle: '',
          headerStyle: HEADER_STYLE,
        }}
      />
      <Calendar.Screen
        name="AddAlarm"
        component={CalendarAddAlarmScreen}
        options={{
          headerTitle: () => <TextHeader title="알람 예약" />,
          headerStyle: HEADER_STYLE,
          headerTitleAlign: 'center',
        }}
      />
      <Calendar.Screen
        name="SelectAlarmTime"
        component={CalendarSelectAlarmTime}
        options={{
          headerTitle: () => <TextHeader title="알림 시간" />,
          headerStyle: HEADER_STYLE,
          headerTitleAlign: 'center',
        }}
      />
      <Calendar.Screen
        name="AddSchedule"
        component={CalendarAddScheduleScreen}
        options={{
          headerTitle: () => <TextHeader title="일정 추가" />,
          headerStyle: HEADER_STYLE,
          headerTitleAlign: 'center',
        }}
      />
      <Calendar.Screen
        name="Detail"
        component={CalendarDetailScreen}
        options={{
          headerTitle: () => <TextHeader title="캘린더" />,
          headerStyle: HEADER_STYLE,
          headerTitleAlign: 'center',
        }}
      />
    </Calendar.Navigator>
  );
}
