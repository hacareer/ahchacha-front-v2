import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import {RegisterParamList} from '../../../../types/types';
import Button from '../../../components/Atoms/Button';
import {
  RegisterTemplateContent,
  RegisterTemplateTitle,
} from '../../../components/Register/RegisterTemplate';
import {setTempData} from '../../../redux/actions/fetch';

export default function RegisterNicknameScreen({route}) {
  const navigation = useNavigation<StackNavigationProp<RegisterParamList>>();
  const [input, setInput] = React.useState('');
  function handleSubmit() {
    navigation.navigate('Vaccinated', {
      ...route.params,
      nickname: input,
    });
  }
  function handleChange(value) {
    setInput(value);
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <RegisterTemplateTitle title="닉네임을 입력해주세요" />
      <RegisterTemplateContent>
        <TextInput
          label="닉네임"
          value={input}
          onChangeText={handleChange}
          selectionColor={Colors.light.primaryLight}
          underlineColor={Colors.light.primaryLight}
          activeUnderlineColor="#606060"
        />
      </RegisterTemplateContent>
      <Button
        text="다음"
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        onPress={handleSubmit}
      />
    </View>
  );
}
