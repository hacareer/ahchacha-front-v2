import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Atoms/Text';
import {RegisterTemplateTitle} from '../../components/Register/RegisterTemplate';
import {calendarStyle} from '../AppScreens/CalendarScreens/style';
import Geolocation from 'react-native-geolocation-service';
import ActivityIndicator from '../../components/ActivityIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {IAddress, ILocation, IReduxState} from '../../redux/types';
import {UtilParamList} from '../../../types/types';
import {StackNavigationProp} from '@react-navigation/stack';
import Button from '../../components/Atoms/Button';
import {API, fetchUserInfo} from '../../redux/actions/fetch';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function AddressSearchScreen({route}) {
  const dispatch = useDispatch();
  const tempData = useSelector((state: IReduxState) => state.tempData);
  const [userAddress, setUserAddress] = React.useState<ILocation>();
  const navigation = useNavigation<StackNavigationProp<UtilParamList>>();
  const [showAI, setShowAI] = React.useState(false);

  const [center, setCenter] = React.useState({
    latitude: 37.564362,
    longitude: 126.977011,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  React.useEffect(() => {
    if (userAddress?.latitude) {
      setCenter({
        latitude: userAddress.latitude,
        longitude: userAddress.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [userAddress]);
  function handleSearchAddressPress() {
    navigation.push('PostCode');
  }
  function handleGetCurrentLocationPress() {
    // if (hasLocationPermission) {
    setShowAI(true);
    Geolocation.getCurrentPosition(
      position => {
        setUserAddress({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position);
        setShowAI(false);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        setShowAI(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    //   }
  }
  React.useEffect(() => {
    setUserAddress(tempData);
  }, [tempData]);
  const styles = StyleSheet.create({
    setCurrentLocationText: {
      fontSize: 16,
      marginTop: 16.5,
      marginRight: 27,
      marginBottom: 26,
    },
    map: {
      flex: 1,
      height: 300,
    },
  });
  function handleSubmit() {
    try {
      API.post('/location', {address: userAddress?.address});
      fetchUserInfo(dispatch);
    } catch (err) {
      console.log(err);
    }
  }
  const GoogleMap = (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={center}>
        <Marker
          key={'0'}
          coordinate={center}
          title={'헤헤'}
          description={'호호'}
        />
      </MapView>
    </View>
  );
  return (
    <>
      <ActivityIndicator show={showAI} />
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <RegisterTemplateTitle
          title={
            '찾으시는 곳의 주소를 입력해주세요\n아차차가 근처 검사소를 찾아드릴게요'
          }
        />
        <Pressable
          style={[calendarStyle.pressable, {marginLeft: 29, marginRight: 29}]}
          onPress={handleSearchAddressPress}>
          <Text
            style={calendarStyle.text}
            children={userAddress?.address || '클릭해서 주소를 검색해보세요'}
          />
        </Pressable>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            children="현위치로 설정"
            style={styles.setCurrentLocationText}
            onPress={handleGetCurrentLocationPress}
            isBold
          />
        </View>
        {GoogleMap}
        {/* <View>
          <AddressItem title="서울특별시 용산구 이촌동" />
          <AddressItem title="서울특별시 용산구 이촌동" />
          <AddressItem title="서울특별시 용산구 이촌동" />
          <AddressItem title="서울특별시 용산구 이촌동" />
        </View> */}

        {/* <PostCodeScreen /> */}
      </ScrollView>
      <Button text="저장" onPress={handleSubmit} />
    </>
  );
}

function AddressItem({title}) {
  const styles = StyleSheet.create({
    wrap: {
      backgroundColor: '#EFEFEF',
      borderColor: '#707070',
      borderWidth: 0.2,
      height: 96,
    },
    title: {
      marginLeft: 49,
      marginTop: 24,
      fontSize: 18,
    },
  });
  return (
    <Pressable style={styles.wrap}>
      <Text children={title} style={styles.title} isMed numberOfLines={1} />
    </Pressable>
  );
}
