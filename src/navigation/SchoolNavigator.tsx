import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SchoolMainScreen from '../screens/AppScreens/SchoolScreens/SchoolMainScreen';
import {SchoolParamList} from '../../types/types';
import SchoolBoardScreen from '../screens/AppScreens/SchoolScreens/SchoolBoardScreen';
import SchoolWriteScreen from '../screens/AppScreens/SchoolScreens/SchoolWriteScreen';
import TextHeader from '../components/Header/TextHeader';
import {HEADER_STYLE} from '../../styles/header';

const School = createStackNavigator<SchoolParamList>();
export default function SchoolNavigator() {
  return (
    <School.Navigator>
      <School.Screen
        name="Board"
        component={SchoolBoardScreen}
        options={{
          headerTitle: () => <TextHeader title="담벼락" />,
          headerTitleAlign: 'center',
          headerStyle: HEADER_STYLE,
        }}
      />
      <School.Screen name="Main" component={SchoolMainScreen} />
      <School.Screen
        name="Write"
        component={SchoolWriteScreen}
        options={{
          headerTitle: () => <TextHeader title="담벼락 글 남기기" />,
          headerTitleAlign: 'center',
          headerStyle: HEADER_STYLE,
        }}
      />
    </School.Navigator>
  );
}
