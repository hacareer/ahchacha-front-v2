import {useLinkTo, useScrollToTop} from '@react-navigation/native';
import * as React from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Button from '../../../components/Atoms/Button';
import Text from '../../../components/Atoms/Text';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {IReduxState} from '../../../redux/types';
import {
  formatRemainingTime,
  getConsecutiveDays,
  IDay,
} from '../../../utils/date';
import {SvgXml} from 'react-native-svg';
import clock from '../../../../assets/images/atoms/clock.svg';
import {fetchClinicData} from '../../../redux/actions/fetch';
import GlassMorphism from '../../../../assets/images/glass_morphism/main.svg';
import CharacterBody from '../../../../assets/images/character/character-body.svg';
import Character from '../../../../assets/images/character/character2.png';
import star2 from '../../../../assets/images/atoms/star2.png';

export default function TabMainScreen() {
  const userInfo = useSelector((state: IReduxState) => state.userInfo);
  const clinicData = useSelector((state: IReduxState) => state.clinicData);
  const checkUpResult = useSelector(
    (state: IReduxState) => state.checkUpResult,
  );
  const [days, setDays] = React.useState<IDay[]>([]);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const navigation = useNavigation();
  useScrollToTop(scrollViewRef);
  const dispatch = useDispatch();
  React.useEffect(() => {
    fetchClinicData(
      dispatch,
      userInfo.location.latitude,
      userInfo.location.longitude,
    );
  }, []);
  const HospitalScrollView = (
    <ScrollView horizontal nestedScrollEnabled>
      {clinicData.map(elem => (
        <ClinicCardView
          id={elem.id}
          name={elem.name}
          address={elem.address}
          // congestion={
          //   clinicCongestionCode?.seoul[`${elem.operationHourId}`]?.description
          // }
        />
      ))}
    </ScrollView>
  );
  function handleAddAlarmPress() {
    // linkto('/calendar/alarm');
    navigation.push('Calendar', {
      screen: 'AddAlarm',
    });
  }
  function handleOpenVaccinationWindow() {
    Linking.openURL('https://ncvr2.kdca.go.kr/');
  }
  React.useEffect(() => {
    setDays(getConsecutiveDays(new Date(), -3, 3));
  }, []);
  return (
    <ScrollView ref={scrollViewRef} style={{backgroundColor: '#F4F4F4'}}>
      <View style={styles.mainBanner}>
        <SvgXml
          width={411.43}
          xml={GlassMorphism}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 411.43,
            zIndex: 80,
          }}
        />
        <SvgXml
          width={130}
          xml={CharacterBody}
          style={{position: 'absolute', top: -10, right: -10}}
        />
        <Image
          source={star2}
          style={{
            width: 92,
            height: 84,
            position: 'absolute',
            right: 59,
            bottom: 20,
          }}
        />
        <Image
          source={Character}
          style={{
            width: 308,
            height: 311,
            zIndex: 109,
            position: 'absolute',
            left: -31,
          }}
        />
        <Text
          style={styles.mainBannerText}
          children={'오늘도\n건강한 하루\n되세요!'}
          isBold
        />
      </View>
      <View style={styles.remainingTextContainer}>
        <Text style={styles.remainingTextTitle} children="남은 시간" isReg />
        <View style={styles.remainingTextWrap}>
          <SvgXml xml={clock} />
          <Text
            style={styles.remainingText}
            children={formatRemainingTime(
              new Date(checkUpResult[0]?.finishTime),
            )}
            isBold
          />
        </View>
      </View>
      <View style={styles.remainingBarWrap}>
        <View style={styles.remainingBar}>
          {days.map(day => (
            <RemainingDayItem
              key={`${day.year}-${day.month}-${day.date}`}
              year={day.year}
              month={day.month}
              date={day.date}
              day={day.day}
            />
          ))}
        </View>
        <Button
          text="알람 예약"
          style={styles.button}
          onPress={handleAddAlarmPress}
        />
      </View>
      <View style={styles.hospitalView}>
        <Text
          style={styles.title}
          children="내 주변 가장 가까운 검사소 🧭"
          isBold
        />
        {HospitalScrollView}
      </View>
      {/* <View style={styles.vaccinationView}>
        <Text children="백신 맞으라는 유도 문구" style={styles.title} />
        <Button
          text="백신 예약"
          style={[styles.button, {marginLeft: 0}]}
          onPress={handleOpenVaccinationWindow}
        />
      </View> */}
    </ScrollView>
  );
}
function RemainingDayItem(props) {
  const {year, month, date, day} = props;
  const styles = StyleSheet.create({
    wrap: {
      width: '14.286%',
      borderWidth: 0.5,
      borderColor: 'white',
      backgroundColor: '#EBEBEB',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    day: {
      fontSize: 20,
      marginTop: 10,
      color: '#494949',
    },
    date: {
      marginBottom: 10,
      fontSize: 16,
      color: '#7F7F7F',
      // transform: [{rotate: '-90deg'}],
    },
  });
  return (
    <View style={styles.wrap}>
      <Text style={styles.day} children={day} isBold />
      <Text style={styles.date} children={`${month}.${date}`} />
    </View>
  );
}
function ClinicCardView(props) {
  const {id, name, address, congestion} = props;
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    wrap: {
      width: 256,
      height: 180,
      borderRadius: 6,
    },
    congestion: {
      position: 'absolute',
      left: 10,
      top: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    congestionIcon: {
      width: 15,
      height: 15,
      backgroundColor: '#2CFF81',
      borderRadius: 100,
    },
    congestionText: {fontSize: 14, marginLeft: 4},
    image: {
      width: 256,
      height: 115,
    },
    infoWrap: {
      marginTop: 12,
      marginLeft: 10,
    },
    name: {
      fontSize: 20,
      marginBottom: 2,
      color: '#686868',
    },
    location: {
      fontSize: 14,
      color: '#AAAAAA',
    },
  });
  function handlePress() {
    // linkTo(`/hospital/${id}/detail`);
    navigation.navigate('Clinic', {
      key: `clinic-detail-${id}`,
      screen: 'Detail',
      params: {
        id,
      },
    });
  }
  return (
    <Pressable style={styles.wrap} onPress={handlePress}>
      <View style={styles.image} />
      {/* <View style={styles.congestion}>
        <View style={styles.congestionIcon} />
        <Text style={styles.congestionText} children={congestion} />
      </View> */}
      <View style={styles.infoWrap}>
        <Text style={styles.name} children={name} numberOfLines={1} isBold />
        <Text style={styles.location} children={address} numberOfLines={1} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainBanner: {
    height: 270,
    // backgroundColor: '#E8E8E8',
    flexDirection: 'row',
  },
  mainBannerText: {
    position: 'absolute',
    textAlign: 'right',
    right: 20,
    top: 38,
    fontSize: 24,
  },
  remainingTextContainer: {
    backgroundColor: 'rgba(73,73,73,0.36)',
    height: 108,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'flex-end',
  },
  remainingTextTitle: {
    color: '#494949',
    fontSize: 14,
    marginRight: 23,
    marginTop: 22,
  },
  remainingText: {
    color: 'white',
    fontSize: 40,
    marginRight: 20,
    // marginTop: 6,
  },
  remainingTextWrap: {
    flexDirection: 'row',
  },
  remainingBarWrap: {
    height: 368,
    backgroundColor: 'white',
    // paddingTop: 32,
    paddingBottom: 32,
  },
  remainingBar: {
    height: 224,
    width: '100%',
    flexDirection: 'row',
  },
  hospitalView: {
    marginTop: 8,
    borderRadius: 10,
    height: 308,
    paddingTop: 33,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  vaccinationView: {
    marginTop: 8,
    borderRadius: 10,
    paddingLeft: 20,
    paddingTop: 27,
    paddingBottom: 27,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
  },
  button: {marginTop: 24, marginLeft: 20, marginRight: 20},
});
