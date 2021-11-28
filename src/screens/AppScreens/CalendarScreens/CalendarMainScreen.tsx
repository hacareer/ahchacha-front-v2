import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../../components/Atoms/Button';
import Text from '../../../components/Atoms/Text';
import {Calendar} from 'react-native-calendars';
import {useLinkTo} from '@react-navigation/native';
import FAB from '../../../components/FAB';
import {
  formatRemainingTime,
  getConsecutiveDays,
  getFormattedDate,
  get요일,
  IDay,
} from '../../../utils/date';
import {useNavigation} from '@react-navigation/core';
import {SvgXml} from 'react-native-svg';
import more from '../../../../assets/images/atoms/more.svg';
import {API, fetchCheckUp} from '../../../redux/actions/fetch';
import {useDispatch, useSelector} from 'react-redux';
import {IReduxState} from '../../../redux/types';

export default function CalendarMainScreen() {
  const dispatch = useDispatch();
  const checkUp = useSelector((state: IReduxState) => state.checkUp);
  const [days, setDays] = React.useState<IDay[]>([]);
  const checkUpResult = useSelector(
    (state: IReduxState) => state.checkUpResult,
  );
  const linkto = useLinkTo();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    remainingTime: {
      paddingLeft: 20,
      paddingBottom: 38,
      fontSize: 24,
      color: '#7F7F7F',
      lineHeight: 40,
      backgroundColor: 'white',
    },
    alarmListWrap: {
      backgroundColor: '#FFFFFF',
      paddingBottom: 38,
      paddingLeft: 20,
      paddingRight: 3,
      borderRadius: 10,
    },
    alarmListTitle: {
      fontSize: 24,
      marginTop: 36,
      marginBottom: 20,
    },
    alarmList: {
      paddingBottom: 12,
    },
    alarmItem: {
      width: 165,
      height: 300,
      justifyContent: 'space-between',
      marginRight: 10,
      backgroundColor: '#2CFF81',
      borderRadius: 10,
      elevation: 2,
    },
    alarmItemDayTime: {
      fontSize: 20,
      marginTop: 13,
      marginLeft: 18,
    },
    alarmItemDescription: {
      fontSize: 20,
      marginBottom: 14,
      marginLeft: 16,
      color: '#00CE53',
    },
    calendarWrap: {
      marginTop: 8,
      backgroundColor: 'white',
      paddingTop: 36,
      paddingBottom: 28,
      borderRadius: 8,
    },
    calendarTitleWrap: {
      paddingLeft: 20,
      paddingRight: 24,
      paddingBottom: 11,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    calendarTitle: {
      fontSize: 24,
    },
    calendarDetailButton: {
      fontSize: 14,
      color: '#AAAAAA',
    },
  });
  const AlarmItem = ({date}) => (
    <View style={styles.alarmItem}>
      <Text
        style={styles.alarmItemDayTime}
        children={`${get요일(date)}요일\n${new Date(date).getHours()}시`}
        isBold
        isBlack
      />
      <Text
        style={styles.alarmItemDescription}
        children={`검사소 방문\n잊지않기!`}
      />
      <View style={{position: 'absolute', right: 14.8, top: 18}}>
        <SvgXml xml={more} />
      </View>
    </View>
  );
  const AddAlarmItem = (
    <Pressable
      onPress={() => navigation.push('AddAlarm')}
      style={[
        styles.alarmItem,
        {
          backgroundColor: '#8DFFBB',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Text children="+" style={{fontSize: 48, color: '#686868'}} isMed />
    </Pressable>
  );
  const AlarmList = (
    <ScrollView style={styles.alarmList} horizontal nestedScrollEnabled>
      {checkUp.map(alarm => (
        <AlarmItem date={new Date(alarm.date)} />
      ))}
      {AddAlarmItem}
    </ScrollView>
  );
  function handleCalendarDetailPress() {
    linkto('/calendar/detail');
  }
  function handleAddAlarmPress() {
    linkto('/calendar/alarm');
  }
  async function getAlarmList() {
    try {
      fetchCheckUp(dispatch);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    setDays(getConsecutiveDays(new Date(), -3, 3));
    getAlarmList();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: '#F4F4F4'}}
        contentContainerStyle={{paddingBottom: 40}}>
        <Text
          children={`코로나 검사 유효기한이\n${formatRemainingTime(
            new Date(checkUpResult[0]?.finishTime),
          )} 남았어요`}
          style={styles.remainingTime}
          isBold
        />
        <View style={{flexDirection: 'row', paddingTop: 8, paddingBottom: 8}}>
          {days.map(day => (
            <DateItem month={day.month} date={day.date} day={day.day} />
          ))}
        </View>
        <View style={styles.alarmListWrap}>
          <Text
            style={styles.alarmListTitle}
            children="내가 예약한 알람 ⏰"
            isBold
            isBlack
          />
          {AlarmList}
        </View>
        <View style={styles.calendarWrap}>
          <View style={styles.calendarTitleWrap}>
            <Text
              children="캘린더 🗓"
              style={styles.calendarTitle}
              isBold
              isBlack
            />
            <Text
              children="자세히 보기"
              style={styles.calendarDetailButton}
              isMed
              onPress={handleCalendarDetailPress}
            />
          </View>
          <CalendarView alarmList={checkUp} />
        </View>
      </ScrollView>
      <FAB text="알람 예약" onPress={handleAddAlarmPress} />
    </View>
  );
}
function CalendarView({alarmList}) {
  const linkto = useLinkTo();
  const [markings, setMarkings] = React.useState({});
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
    <Calendar
      markingType={'period'}
      markedDates={markings}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      // minDate={'2012-05-10'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      // maxDate={'2012-05-30'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        console.log('selected day', day);
        linkto('/calendar/schedule');
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={day => {
        console.log('selected day', day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy년 MM월'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={month => {
        console.log('month changed', month);
      }}
      // Hide month navigation arrows. Default = false
      hideArrows
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={direction => <Arrow />}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Hide day names. Default = false
      // hideDayNames={true}
      // Show week numbers to the left. Default = false
      // showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={subtractMonth => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Disable left arrow. Default = false
      disableArrowLeft
      // Disable right arrow. Default = false
      disableArrowRight
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter
      // renderHeader={date => {
      //   /*Return JSX*/
      // }}
      // Enable the option to swipe between months. Default = false
      // enableSwipeMonths={true}
    />
  );
}

function DateItem(props) {
  const {month, date, day} = props;
  const styles = StyleSheet.create({
    wrap: {
      backgroundColor: '#EBEBEB',
      width: '14.286%',
      height: 69,
      borderWidth: 0.5,
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    day: {
      fontSize: 20,
      marginTop: 8,
    },
    monthDate: {
      marginBottom: 4,
    },
  });
  return (
    <View style={styles.wrap}>
      <Text style={styles.day} children={day} isBold />
      {!!month && !!date && (
        <Text style={styles.monthDate} children={`${month}.${date}`} />
      )}
    </View>
  );
}
