import * as React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Atoms/Button';
import {
  RegisterTemplateContent,
  RegisterTemplateTitle,
} from '../../../components/Register/RegisterTemplate';
import ReviewSelectItem from '../../../components/Review/ReviewSelectItem';
import {IReduxState} from '../../../redux/types';
export default function SchoolWriteScreen() {
  const userInfo = useSelector((state: IReduxState) => state.userInfo);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <RegisterTemplateTitle
        style={{marginBottom: 99}}
        title={`코로나19에 대하여\n${userInfo?.nickname}님의 이야기를 들려주세요`}
      />
      <RegisterTemplateContent>
        <ReviewSelectItem text="백신 미접종자 차별 화나요😡" />
        <ReviewSelectItem text="저는 이제 백신 다 맞았어요💉" />
        <ReviewSelectItem text="백신 아직 불안해요🥶" />
        <ReviewSelectItem text="마스크 불안해요😷" />
        <ReviewSelectItem text="대면 수업 힘들어요😪" />
      </RegisterTemplateContent>
    </View>
  );
}
