import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UtilParamList} from '../../types/types';
import PostCodeScreen from '../screens/UtilScreens/PostCodeScreen';
import AddressSearchScreen from '../screens/UtilScreens/AddressSearchScreen';
import {HEADER_STYLE} from '../../styles/header';
import TextHeader from '../components/Header/TextHeader';

const Util = createStackNavigator<UtilParamList>();
export default function UtilNavigator() {
  return (
    <Util.Navigator>
      <Util.Screen
        name="AddressSearch"
        component={AddressSearchScreen}
        options={{
          headerTitle: () => <TextHeader title="다른 주소 검색" />,
          headerTitleAlign: 'center',
          headerStyle: HEADER_STYLE,
        }}
      />
      <Util.Screen
        name="PostCode"
        component={PostCodeScreen}
        options={{
          headerTitle: () => <TextHeader title="주소 검색" />,
          headerTitleAlign: 'center',
          headerStyle: HEADER_STYLE,
        }}
      />
    </Util.Navigator>
  );
}
