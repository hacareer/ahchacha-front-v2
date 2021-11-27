import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation';
import {Provider as ReduxProvider, useDispatch} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/redux/reducers';
import LinkingConfiguration from './LinkingConfiguration';
import {Provider as PaperProvider} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import SensitiveInfo from 'react-native-sensitive-info';
import {
  API,
  fetchAllDatas,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './src/redux/actions/fetch';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  const dispatch = useDispatch();
  async function requestPermissionAndroid() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      if (granted) {
        console.log('permission granted');
      } else {
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function requestPermissionIOS() {
    try {
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status === 'granted') {
        console.log('permission granted');
      } else {
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function getTokenFromLocal() {
    const accessToken = await getAccessToken();
    setAccessToken(accessToken);

    const success = await fetchAllDatas(dispatch);
    if (!success) {
      requestTokenWithRefreshToken();
    } else {
      // hide boot splash
      RNBootSplash.hide();
    }
  }
  async function requestTokenWithRefreshToken() {
    const refreshToken = await getRefreshToken();
    console.log(refreshToken);
    try {
      const {data} = await API.get('/user/auth/accessToken', {
        headers: {Authorization: `Bearer ${refreshToken?.refreshToken}`},
      });
      setAccessToken(data.data.access_token);
      await fetchAllDatas(dispatch);
    } catch (err) {
      setAccessToken('');
      setRefreshToken('');
      console.error(err);
    } finally {
      // hide boot splash
      RNBootSplash.hide();
    }
  }
  async function forceSetTokens(access: string, refresh: string) {
    setAccessToken(access);
    setRefreshToken(refresh);
  }
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissionAndroid();
    }
    if (Platform.OS === 'ios') {
      requestPermissionIOS();
    }
    getTokenFromLocal();
    // forceSetTokens('', '');
    
  }, []);
  return <RootNavigator />;
};

const Navigation = () => {
  const [ready, setReady] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  function handleNavigationReady() {
    setReady(true);
  }
  return (
    <ReduxProvider store={createStore(reducers)}>
      <PaperProvider>
        <SafeAreaProvider>
          <StatusBar
            animated={true}
            backgroundColor={isDarkMode ? 'black' : 'white'}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <NavigationContainer
            onReady={handleNavigationReady}
            linking={LinkingConfiguration}>
            {ready && <App />}
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default Navigation;
