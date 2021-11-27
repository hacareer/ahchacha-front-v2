import {useLinkTo} from '@react-navigation/native';
import * as React from 'react';
import {CalendarList} from 'react-native-calendars';

export default function CalendarDetailScreen() {
  return <CalendarView />;
}
function CalendarView() {
  const linkto = useLinkTo();
  const [alarmList, setAlarmList] = React.useState([]);
  const [markings, setMarkings] = React.useState({});
  function handleDayPress() {
    linkto('/calendar/schedule');
  }
  async function getAlarmList() {
    try {
      const {data} = await API.get('check-up/my');
      setAlarmList(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    getAlarmList();
  }, []);
  React.useEffect(() => {
    const to = {};
    alarmList.map(alarm => {
      const formatted = getFormattedDate(new Date(alarm.date));
      to[formatted] = {
        // disabled: true,
        startingDay: true,
        endingDay: true,
        color: '#8DFFBB',
        textColor: '#686868',
      };
    });
    setMarkings(to);
  }, [alarmList]);
  return (
    <CalendarList
      markingType={'period'}
      markedDates={markings}
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      onVisibleMonthsChange={months => {
        console.log('now these months are visible', months);
      }}
      // Max amount of months allowed to scroll to the past. Default = 50
      // pastScrollRange={50}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={50}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      showScrollIndicator={true}
      onDayPress={handleDayPress}
    />
  );
}
import {LocaleConfig} from 'react-native-calendars';
import {API} from '../../../redux/actions/fetch';
import { getFormattedDate } from '../../../utils/date';
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';
