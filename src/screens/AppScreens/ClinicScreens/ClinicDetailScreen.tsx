import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '../../../components/Atoms/Text';
import Button from '../../../components/Atoms/Button';
import Icon from '../../../components/Atoms/Icon';
import {useLinkTo} from '@react-navigation/native';
import TextHeader from '../../../components/Header/TextHeader';
import {HEADER_STYLE} from '../../../../styles/header';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../../redux/actions/fetch';
import {IClinic} from '../../../redux/types';

export default function ClinicDetailScreen({route}) {
  const {id = 49} = route.params;
  console.log(id);
  const [clinicData, setClinicData] = React.useState<IClinic>({});
  const [comments, setComments] = React.useState([]);
  const [commentsCount, setCommentsCount] = React.useState(0);
  const navigation = useNavigation();
  const linkto = useLinkTo();
  const [center, setCenter] = React.useState({
    latitude: 37.564362,
    longitude: 126.977011,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  function setNavigationConfig() {
    navigation.setOptions({
      headerTitle: () => (
        <TextHeader
          title={clinicData.name || ''}
          subTitle={clinicData.address || ''}
        />
      ),
      headerTitleAlign: 'center',
      headerTitleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerStyle: HEADER_STYLE,
    });
  }
  function handleAddReviewPress() {
    navigation.navigate('Review', {
      key: `clinic-detail-${id}`,
      id,
    });
  }
  const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 249,
    },
    remainingTimeWrap: {
      height: 107,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 20,
      paddingLeft: 20,
      backgroundColor: 'white',
    },
    timeInfo: {
      height: 211,
      backgroundColor: '#D3D3D3',
    },
    reviewItem: {
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: '#EBEBEB',
      height: 43,
      borderRadius: 22,
      justifyContent: 'center',
      paddingLeft: 19,
      marginTop: 16,
    },
  });
  async function getClinicData() {
    try {
      const {data} = await API.get(`clinic/${id}`);
      setClinicData(data.data);
      const {data: data1} = await API.get(`/clinic-comment/clinic/${id}`);
      console.log(data1);
      const count = data1.data.reduce((prev, cur) => prev + cur.number, 0);
      setCommentsCount(count);
      setComments(data1.data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (clinicData.id) {
      setNavigationConfig();
      setCenter({
        latitude: clinicData.latitude,
        longitude: clinicData.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [clinicData]);
  React.useEffect(() => {
    setNavigationConfig();
  }, []);
  React.useEffect(() => {
    getClinicData();
  }, [id]);
  const RemainingTime = (
    <View style={styles.remainingTimeWrap}>
      <View>
        <Text style={{fontSize: 12, marginBottom: 2}}>예상 대기 시간</Text>
        <Text style={{fontSize: 20}}>1시간</Text>
      </View>
      <Button
        text="길찾기"
        style={{width: 138, height: 40}}
        textStyle={{fontSize: 12}}
      />
    </View>
  );
  const OpenCloseTime = ({name, time}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 22}}>
      <View
        style={{
          width: 50,
          height: 25,
          borderRadius: 9,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text children={name} style={{fontSize: 16}} />
      </View>
      <Text children={time} style={{marginLeft: 29}} />
    </View>
  );
  const ReviewTitle = (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 16,
      }}>
      <Text children="후기" style={{fontSize: 20}} />
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          backgroundColor: '#EBEBEB',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="add" size={19} noPadding onPress={handleAddReviewPress} />
      </View>
    </View>
  );

  const GoogleMap = (
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
  );
  React.useEffect(() => {}, []);
  return (
    <ScrollView>
      {GoogleMap}
      {RemainingTime}
      <View style={styles.timeInfo}>
        <OpenCloseTime name="오픈" time="오전 10:00" />
        <View style={{height: 9}} />
        <OpenCloseTime name="마감" time="오후 07:00" />
      </View>
      <View style={{paddingBottom: 40}}>
        {ReviewTitle}
        <ReviewItem
          text="검사가 빨리 끝나요 💨"
          percentage={`${(comments[0]?.number / commentsCount) * 100}%`}
        />
        <ReviewItem
          text="교통이 불편해요 😣"
          percentage={`${(comments[1]?.number / commentsCount) * 100}%`}
        />
        <ReviewItem
          text="늦게까지 해요 🌙"
          percentage={`${(comments[2]?.number / commentsCount) * 100}%`}
        />
        <ReviewItem
          text="근처에 주차공간이 있어요 🚘"
          percentage={`${(comments[3]?.number / commentsCount) * 100}%`}
        />
        <ReviewItem
          text="검사자수가 많아요 👥"
          percentage={`${(comments[4]?.number / commentsCount) * 100}%`}
        />
      </View>
    </ScrollView>
  );
}
const ReviewItem = ({text, percentage}) => {
  const styles = StyleSheet.create({
    reviewItem: {
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: '#EBEBEB',
      height: 43,
      borderRadius: 22,
      justifyContent: 'center',
      marginTop: 16,
    },
    bar: {
      position: 'absolute',
      left: 0,
      height: 43,
      width: percentage || 0,
      backgroundColor: '#FFC715',
      borderRadius: 22,
    },
    text: {fontSize: 14, paddingLeft: 19},
  });
  return (
    <View style={styles.reviewItem}>
      <View style={styles.bar} />
      <Text children={text} style={styles.text} />
    </View>
  );
};
