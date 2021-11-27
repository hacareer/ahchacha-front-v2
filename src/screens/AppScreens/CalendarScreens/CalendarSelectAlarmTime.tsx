import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Button from '../../../components/Atoms/Button';
import Text from '../../../components/Atoms/Text';
import {setTempData1} from '../../../redux/actions/fetch';

export default function CalendarSelectAlarmTime() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [result, setResult] = React.useState<any[]>([]);
  function handleSubmit() {
    navigation.navigate('AddAlarm');
  }
  React.useEffect(() => {
    dispatch(setTempData1(result));
  }, [result, dispatch]);
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Element label="알림 없음" value="" setResult={setResult} />
        <Element label="15분 전" value="15M" setResult={setResult} />
        <Element label="30분 전" value="30M" setResult={setResult} />
        <Element label="1시간 전" value="1H" setResult={setResult} />
        {/* <Element label="2시간 전" value="2h" setResult={setResult} /> */}
        <Element label="하루 전" value="1D" setResult={setResult} />
      </View>
      <Button text="선택 완료" onPress={handleSubmit} />
    </>
  );
}

interface IProps2 {
  label: string;
  value: string;
  setResult: React.Dispatch<React.SetStateAction<any[]>>;
}
function Element(props: IProps2) {
  const {label, value, setResult} = props;
  const [checked, setChecked] = React.useState(false);
  const styles = StyleSheet.create({
    wrap: {
      height: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 24,
    },
    label: {
      fontSize: 16,
      color: '#AAAAAA',
    },
  });
  React.useEffect(() => {
    if (checked) {
      setResult(prev => [...prev, {label, value}]);
    } else {
      setResult(prev => {
        const filtered = prev.filter(elem => elem.label !== label);
        return filtered;
      });
    }
  }, [checked, value]);
  return (
    <TouchableOpacity
      style={styles.wrap}
      onPress={() => setChecked(prev => !prev)}>
      <Text children={label} style={styles.label} isReg />
      <RadioButton
        value={value}
        status={checked ? 'checked' : 'unchecked'}
        color="#8DFFBB"
        uncheckedColor="#E8E8E8"
      />
    </TouchableOpacity>
  );
}
