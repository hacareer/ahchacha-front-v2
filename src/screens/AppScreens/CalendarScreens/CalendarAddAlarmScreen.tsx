import * as React from 'react';
import {Animated, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Text from '../../../components/Atoms/Text';
import DatePicker from 'react-native-date-picker';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../../components/Atoms/Button';
import {calendarStyle} from './style';
import {useSelector} from 'react-redux';
import {IAddress, IClinic, IReduxState} from '../../../redux/types';
import {dateToKRString} from '../../../utils/date';
import {API} from '../../../redux/actions/fetch';
import Colors from '../../../../constants/Colors';

export default function CalendarAddAlarmScreen({navigation}) {
  const userInfo = useSelector((state: IReduxState) => state.userInfo);
  const [parsedDate, setParsedDate] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [addressData, setAddressData] = React.useState<IAddress>();
  const [clinicData, setClinicData] = React.useState<IClinic[]>([]);
  const [selectedClinic, setSelectedClinic] = React.useState<IClinic>();
  const [alarmTime, setAlarmTime] = React.useState<any[]>([]);
  const tempData = useSelector((state: IReduxState) => state.tempData);
  const tempData1 = useSelector((state: IReduxState) => state.tempData1);

  function handleDateTimePickerPress() {
    setOpen(true);
  }
  function handleSearchLocationPress() {
    navigation.navigate('Util', {
      screen: 'PostCode',
    });
  }
  async function getCoordinate(tempAddress: IAddress) {
    try {
      const {data} = await API.post('/location/coordinate', {
        address: tempAddress?.address,
      });
      setAddressData({...tempAddress, ...data.data});
    } catch (err) {
      console.log(err);
    }
  }
  async function getClinicData() {
    try {
      const {data} = await API.get(
        `/clinic/area/${addressData?.latitude}/${addressData?.longitude}`,
      );
      setClinicData(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (tempData?.address) {
      // setAddressData(tempData);
      getCoordinate(tempData);
    }
  }, [tempData]);
  React.useEffect(() => {
    if (addressData?.address) {
      getClinicData();
    }
  }, [addressData]);
  React.useEffect(() => {
    setAlarmTime(tempData1);
  }, [tempData1]);
  React.useEffect(() => {
    if (date) {
      setParsedDate(dateToKRString(date));
    }
  }, [date]);
  function handleSelectAlarmTimePress() {
    navigation.navigate('SelectAlarmTime');
  }
  async function handleSubmit() {
    const notificationTime = alarmTime.reduce(
      (prev, cur) => `${cur.value}`,
      '',
    );
    try {
      const data = {
        clinicId: selectedClinic?.id,
        date,
        notificationTime,
      };
      console.log(data);
      await API.post('check-up', data);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <ScrollView
        style={calendarStyle.scrollview}
        contentContainerStyle={{paddingBottom: 60}}>
        <Text
          style={calendarStyle.title}
          children={`${userInfo?.nickname}님이\n검사받으실 날짜를 설정해주세요`}
          isBold
        />
        <Pressable
          style={calendarStyle.pressable}
          onPress={handleDateTimePickerPress}>
          <Text
            children={parsedDate}
            style={[calendarStyle.text, {color: '#494949'}]}
            isMed
          />
        </Pressable>
        <View style={{alignItems: 'center'}}>
          <DatePicker locale="ko-KR" date={date} onDateChange={setDate} />
        </View>
        <Text
          children="어디서 검사를 받으시나요?"
          style={calendarStyle.title}
          isBold
        />
        <Pressable
          style={calendarStyle.pressable}
          onPress={handleSearchLocationPress}>
          <Text
            style={[calendarStyle.text, !!selectedClinic && {color: '#494949'}]}
            children={
              !addressData
                ? '지역 주소 검색'
                : !selectedClinic
                ? '선별진료소 선택'
                : selectedClinic.name
            }
          />
        </Pressable>
        <View style={{marginTop: 4}}>
          {clinicData.map(elem => (
            <ClinicItem
              data={elem}
              isSelected={elem.id === selectedClinic?.id}
              setSelectedClinic={setSelectedClinic}
            />
          ))}
        </View>
        <Text
          children="언제 알려드릴까요?"
          style={calendarStyle.title}
          isBold
        />
        <Pressable
          style={calendarStyle.pressable}
          onPress={handleSelectAlarmTimePress}>
          <Text
            style={[
              calendarStyle.text,
              !!alarmTime.length && {color: '#494949'},
            ]}
            children={
              alarmTime.length
                ? alarmTime.map(elem => `${elem.label}`)
                : '시간을 선택해주세요'
            }
          />
        </Pressable>
      </ScrollView>
      <Button text="예약하기" onPress={handleSubmit} />
    </>
  );
}
function ClinicItem({data, isSelected, setSelectedClinic}) {
  const styles = StyleSheet.create({
    wrap: {
      height: 61,
      paddingLeft: 20,
      backgroundColor: isSelected ? Colors.light.secondary : '',
    },
    name: {fontSize: 16, marginTop: 11},
    address: {fontSize: 14, marginTop: 6, color: '#AAAAAA'},
  });
  function handlePress() {
    setSelectedClinic(data);
  }
  return (
    <Pressable style={styles.wrap} onPress={handlePress}>
      <Text style={styles.name} children={data.name} numberOfLines={1} />
      <Text
        style={styles.address}
        children={data.address}
        numberOfLines={1}
        isReg
      />
    </Pressable>
  );
}
