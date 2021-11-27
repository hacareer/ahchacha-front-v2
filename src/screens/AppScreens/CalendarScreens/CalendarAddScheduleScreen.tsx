import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {Pressable, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Button from '../../../components/Atoms/Button';
import Text from '../../../components/Atoms/Text';
import {API} from '../../../redux/actions/fetch';
import {IReduxState} from '../../../redux/types';
import {dateToKRString} from '../../../utils/date';
import {calendarStyle} from './style';

export default function CalendarAddScheduleScreen() {
  const navigation = useNavigation();
  const userInfo = useSelector((state: IReduxState) => state.userInfo);

  const [date, setDate] = React.useState(new Date());
  const [parsedDate, setParsedDate] = React.useState('');
  async function handleSubmit() {
    try {
      await API.post('check-up-result', {startTime: date});
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (date) {
      setParsedDate(dateToKRString(date));
    }
  }, [date]);
  return (
    <>
      <ScrollView style={calendarStyle.scrollview}>
        <Text
          style={calendarStyle.title}
          children={`${userInfo.nickname}님!\n검사 결과를 언제 받으셨나요?`}
          isBold
        />
        <Pressable style={calendarStyle.pressable}>
          <Text
            style={[calendarStyle.text, {color: '#494949'}]}
            children={parsedDate}
          />
        </Pressable>
        <View style={{alignItems: 'center'}}>
          <DatePicker locale="ko-KR" date={date} onDateChange={setDate} />
        </View>
        <Text
          style={calendarStyle.warning}
          children={
            'PCR검사 결과는 백신미접종자가 다중이용시설(헬스장, 노래방, 학교시설 등) 사용시 반드시 소지해야하며, 이용시간 기준 48시간 내에 검사받은 결과만 효력이 있습니다.'
          }
          isMed
        />
      </ScrollView>
      <Button text="예약하기" onPress={handleSubmit} />
    </>
  );
}
