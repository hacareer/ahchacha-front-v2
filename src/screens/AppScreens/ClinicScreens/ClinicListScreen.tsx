import {useLinkTo} from '@react-navigation/native';
import * as React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Text from '../../../components/Atoms/Text';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {IReduxState} from '../../../redux/types';
import {useNavigation} from '@react-navigation/core';
import star2 from '../../../../assets/images/atoms/star2.png';
import star3 from '../../../../assets/images/atoms/star3.png';
import star4 from '../../../../assets/images/atoms/star4.png';
import star5 from '../../../../assets/images/atoms/star5.png';

export default function ClinicListScreen() {
  const [center, setCenter] = React.useState({
    latitude: 37.564362,
    longitude: 126.977011,
  });
  const clinicData = useSelector((state: IReduxState) => state.clinicData);
  const [loaded, setLoaded] = React.useState(false);
  const linkto = useLinkTo();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 625,
    },
  });
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  const GoogleMap = (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{...center, latitudeDelta: 0.015, longitudeDelta: 0.0121}}>
      {clinicData.map(clinic => (
        <Marker
          key={clinic.id}
          coordinate={{latitude: clinic.latitude, longitude: clinic.longitude}}
          title={clinic.name}
          description={clinic.address}
        />
      ))}
    </MapView>
  );
  const WaitingTimeExample = ({text, color}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          width: 15,
          height: 15,
          borderRadius: 500,
          backgroundColor: color,
        }}
      />
      <Text style={{fontSize: 12, marginLeft: 4}}>{text}</Text>
    </View>
  );
  function handleHospitalItemPress(id) {
    navigation.navigate('Clinic', {
      screen: 'Detail',
      params: {
        id,
      },
    });
  }
  const ClinicItem = ({id, name, location, isOdd}) => (
    <Pressable
      style={[
        {
          height: 96,
          paddingLeft: 20,
          flexDirection: 'row',
          alignItems: 'center',
        },
        isOdd && {backgroundColor: '#F4F4F4'},
      ]}
      onPress={() => handleHospitalItemPress(id)}>
      <View style={{width: 30, height: 30, marginRight: 16}}>
        <Image
          source={
            Math.random() < 0.25
              ? star2
              : Math.random() < 0.5
              ? star3
              : Math.random() < 0.75
              ? star4
              : star5
          }
          style={{width: 30, height: 30}}
        />
      </View>
      {/* <SvgXml xml={star2} /> */}
      <View>
        <Text style={{fontSize: 16, color: '#686868'}}>{name}</Text>
        <Text style={{marginTop: 4, fontSize: 14, color: '#AAAAAA'}} isReg>
          {location}
        </Text>
      </View>
    </Pressable>
  );
  React.useEffect(() => {
    if (clinicData.length) {
      setCenter({
        latitude: clinicData[0].latitude,
        longitude: clinicData[0].longitude,
      });
    }
  }, [clinicData]);
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {GoogleMap}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: 48,
          backgroundColor: '#F7F7F7',
        }}>
        <WaitingTimeExample text="30분 이내" color="#777777" />
        <WaitingTimeExample text="60분 이내" color="#777777" />
        <WaitingTimeExample text="90분 이내" color="#777777" />
        <WaitingTimeExample text="2시간 이상" color="#FFFFFF" />
      </View>
      {clinicData.map((clinic, index) => (
        <ClinicItem
          id={clinic.id}
          name={clinic.name}
          location={clinic.address}
          isOdd={index % 2}
        />
      ))}
    </ScrollView>
  );
}
