import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {HEADER_STYLE} from '../../../../styles/header';
import Button from '../../../components/Atoms/Button';
import TextHeader from '../../../components/Header/TextHeader';
import {
  RegisterTemplateContent,
  RegisterTemplateTitle,
} from '../../../components/Register/RegisterTemplate';
import ReviewSelectItem from '../../../components/Review/ReviewSelectItem';
import {API} from '../../../redux/actions/fetch';
import {IReduxState} from '../../../redux/types';

export default function ClinicReviewScreen({route}) {
  const {id} = route.params;
  const userInfo = useSelector((state: IReduxState) => state.userInfo);
  const navigation = useNavigation();

  async function handleSubmitPress() {
    try {
      await API.post('/clinic-comment', {clinicid: id, contents: ''});
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <RegisterTemplateTitle
        style={{marginBottom: 99}}
        title={`검사는 어떠셨나요?\n${userInfo.nickname}님의 이야기를 들려주세요`}
      />
      <RegisterTemplateContent>
        <ReviewSelectItem text="검사가 빨리 끝나요" />
        <ReviewSelectItem text="교통이 불편해요" />
        <ReviewSelectItem text="늦게까지 해요" />
        <ReviewSelectItem text="근처에 주차공간이 있어요" />
        <ReviewSelectItem text="검사자수가 많아요" />
      </RegisterTemplateContent>
      <View style={{flex: 1}} />
      <Button text="예약하기" onPress={handleSubmitPress} />
    </View>
  );
}
