import {useLinkTo} from '@react-navigation/native';
import * as React from 'react';
import {CalendarList} from 'react-native-calendars';

export default function CalendarDetailScreen() {
  return <CalendarView />;
}
function CalendarView() {
  const linkto = useLinkTo();
  const dispatch = useDispatch();
  const checkUp = useSelector((state: IReduxState) => state.checkUp);
  const [markings, setMarkings] = React.useState({});
  function handleDayPress() {
    linkto('/calendar/schedule');
  }
  async function getAlarmList() {
    try {
      fetchCheckUp(dispatch);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    getAlarmList();
  }, []);
  React.useEffect(() => {
    const to = {};
    checkUp.map(alarm => {
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
  }, [checkUp]);
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
import {useDispatch, useSelector} from 'react-redux';
import {API, fetchCheckUp} from '../../../redux/actions/fetch';
import {IReduxState} from '../../../redux/types';
import {getFormattedDate} from '../../../utils/date';
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1???',
    '2???',
    '3???',
    '4???',
    '5???',
    '6???',
    '7???',
    '8???',
    '9???',
    '10???',
    '11???',
    '12???',
  ],
  monthNamesShort: [
    '1???',
    '2???',
    '3???',
    '4???',
    '5???',
    '6???',
    '7???',
    '8???',
    '9???',
    '10???',
    '11???',
    '12???',
  ],
  dayNames: [
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '?????????',
  ],
  dayNamesShort: ['???', '???', '???', '???', '???', '???', '???'],
  today: '??????',
};
LocaleConfig.defaultLocale = 'kr';
