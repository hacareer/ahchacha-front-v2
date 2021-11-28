import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {HEADER_STYLE} from '../../styles/header';
import {HospitalParamList as ClinicParamList} from '../../types/types';
import LocationSelectHeader from '../components/Header/LocationSelectHeader';
import TextHeader from '../components/Header/TextHeader';
import ClinicDetailScreen from '../screens/AppScreens/ClinicScreens/ClinicDetailScreen';
import ClinicListScreen from '../screens/AppScreens/ClinicScreens/ClinicListScreen';
import ClinicReviewScreen from '../screens/AppScreens/ClinicScreens/ClinicReviewScreen';

const Clinic = createStackNavigator<ClinicParamList>();
export default function ClinicNavigator() {
  return (
    <Clinic.Navigator>
      <Clinic.Screen
        name="List"
        component={ClinicListScreen}
        options={{header: () => <LocationSelectHeader />}}
      />
      <Clinic.Screen
        name="Detail"
        component={ClinicDetailScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            justifyContent: 'center',
            alignItems: 'flex-end',
          },
          headerStyle: HEADER_STYLE,
        }}
      />
      <Clinic.Screen
        name="Review"
        component={ClinicReviewScreen}
        options={{
          headerTitle: () => <TextHeader title="후기 작성" />,
          headerTitleAlign: 'center',
          headerStyle: HEADER_STYLE,
        }}
      />
    </Clinic.Navigator>
  );
}
