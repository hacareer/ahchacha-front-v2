import * as React from 'react';
import {RegisterParamList} from '../../types/types';
import RegisterMainScreen from '../screens/AppScreens/RegisterScreens/RegisterMainScreen';
import RegisterHangOutsScreen from '../screens/AppScreens/RegisterScreens/RegisterHangOutsScreen';
import RegisterSchoolScreen from '../screens/AppScreens/RegisterScreens/RegisterSchoolScreen';
import RegisterVaccinatedScreen from '../screens/AppScreens/RegisterScreens/RegisterVaccinatedScreen';
import RegisterNicknameScreen from '../screens/AppScreens/RegisterScreens/RegisterNicknameScreen';
import RegisterTermsScreen from '../screens/AppScreens/RegisterScreens/RegisterTermsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import Colors from '../../constants/Colors';
let cp = 'Main';
const RegisterProgress = createStackNavigator();

export default function RegisterProgressNavigator({navigation, route}) {
  const [progressValue, setProgressValue] = React.useState(1);
  const animatedProgressBar = React.useRef(new Animated.Value(0)).current;
  // 나중에 Constant file로 빼기
  const screenWidth = Dimensions.get('window').width;

  const translateX = animatedProgressBar.interpolate({
    inputRange: [0, 5],
    outputRange: [-204, 0],
    extrapolate: 'clamp',
  });
  React.useEffect(() => {
    Animated.timing(animatedProgressBar, {
      toValue: progressValue,
      // delay: animDelay,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [progressValue]);
  const styles = StyleSheet.create({
    progressBarLeftHider: {
      width: (screenWidth - 204) / 2,
      height: 8,
      backgroundColor: 'white',
      zIndex: 99,
    },
    progressBarWrap: {
      flexDirection: 'row',
      paddingTop: 25.8,
      paddingBottom: 25.8,
      backgroundColor: 'white',
    },
    progressBar: {
      width: 204,
      height: 8,
      backgroundColor: Colors.light.secondaryLight,
      borderRadius: 4,
    },
    progressBarBackground: {
      position: 'absolute',
      top: 25.8,
      left: (screenWidth - 204) / 2,
      width: 204,
      height: 8,
      backgroundColor: '#E3E3E3',
      zIndex: 97,
      borderRadius: 4,
    },
  });
  const ProgressBar = () => (
    <View style={styles.progressBarWrap}>
      <View style={styles.progressBarLeftHider} />
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [{translateX}],
          },
          {zIndex: 98},
        ]}
      />
      <View style={styles.progressBarBackground} />
    </View>
  );
  const Header = <ProgressBar />;

  function handleRouteChange() {
    switch (cp) {
      case 'Main':
        console.log('running...');
        setProgressValue(0);
        break;
      case 'Terms':
        console.log('running...');
        setProgressValue(1);
        break;
      case 'Nickname':
        console.log('running...');
        setProgressValue(2);
        break;
      case 'Vaccinated':
        console.log('running...');
        setProgressValue(3);
        break;
      case 'School':
        console.log('running...');
        setProgressValue(4);
        break;
      case 'HangOuts':
        console.log('running...');
        setProgressValue(5);
        break;
    }
  }
  React.useEffect(() => {
    handleRouteChange();
  }, [navigation, route]);
  return (
    <RegisterProgress.Navigator
      screenOptions={{
        header: () => cp !== 'Main' && Header,
      }}>
      <RegisterProgress.Screen
        name="RegisterNav"
        component={RegisterNavigator}
      />
    </RegisterProgress.Navigator>
  );
}
interface IRegisterNavigationProps {
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>;
}
const Register = createStackNavigator<RegisterParamList>();
function RegisterNavigator(props: IRegisterNavigationProps) {
  return (
    <Register.Navigator
      screenOptions={({route}) => {
        cp = route.name;
        return {headerShown: false};
      }}>
      <Register.Screen name="Main" component={RegisterMainScreen} />
      <Register.Screen name="Nickname" component={RegisterNicknameScreen} />
      <Register.Screen name="School" component={RegisterSchoolScreen} />
      <Register.Screen name="Terms" component={RegisterTermsScreen} />
      <Register.Screen name="Vaccinated" component={RegisterVaccinatedScreen} />
      <Register.Screen name="HangOuts" component={RegisterHangOutsScreen} />
    </Register.Navigator>
  );
}
