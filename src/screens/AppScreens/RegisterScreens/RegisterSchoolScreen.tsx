import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {RegisterParamList} from '../../../../types/types';
import Button from '../../../components/Atoms/Button';
import {
  RegisterTemplateContent,
  RegisterTemplateTitle,
} from '../../../components/Register/RegisterTemplate';
import {API} from '../../../redux/actions/fetch';
interface IItem {
  value: number;
  label: string;
}
export default function RegisterSchoolScreen({route}) {
  const navigation = useNavigation<StackNavigationProp<RegisterParamList>>();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState(0);
  const [univData, setUnivData] = React.useState<IItem[]>([]);

  function handleSubmit() {
    navigation.navigate('HangOuts', {...route.params, univId: pickerValue});
  }
  async function getSchoolData() {
    const dupMap: {[name: string]: boolean} = {};
    const result: IItem[] = [];

    try {
      const {data} = await API.get('/univ');
      data.data.map((elem: {name: string; id: number}) => {
        if (!dupMap[elem.name]) {
          dupMap[elem.name] = true;
          result.push({value: elem.id, label: elem.name});
        }
      });
      setUnivData(result);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    getSchoolData();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <RegisterTemplateTitle
        title={`${route.params.nickname}님의\n학교를 선택해주세요`}
      />
      <RegisterTemplateContent>
        <DropDownPicker
          language="KR"
          searchable
          open={pickerOpen}
          value={pickerValue}
          items={univData}
          setOpen={setPickerOpen}
          setValue={setPickerValue}
          setItems={setUnivData}
          style={{backgroundColor: '#EAEAEA', borderWidth: 0}}
        />
      </RegisterTemplateContent>
      <Button
        text="선택 완료"
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        onPress={handleSubmit}
      />
    </View>
  );
}
