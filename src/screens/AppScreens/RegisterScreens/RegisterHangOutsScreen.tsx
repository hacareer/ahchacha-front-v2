import * as React from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import Button from '../../../components/Atoms/Button';
import {
  RegisterTemplateContent,
  RegisterTemplateTitle,
} from '../../../components/Register/RegisterTemplate';
import {useLinkTo} from '@react-navigation/native';
import Text from '../../../components/Atoms/Text';
import Icon from '../../../components/Atoms/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {IAddress, IReduxState} from '../../../redux/reducers';
import {RootStackParamList} from '../../../../types/types';
import {StackScreenProps} from '@react-navigation/stack';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import {
  API,
  fetchAllDatas,
  setAccessToken,
  setRefreshToken,
} from '../../../redux/actions/fetch';
import useLoading from '../../../../hooks/useLoading';
import messaging from '@react-native-firebase/messaging';
type IProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, 'Register'>,
  StackScreenProps<RootStackParamList>
>;

export default function RegisterHangOutsScreen({navigation, route}: IProps) {
  const dispatch = useDispatch();
  const tempData = useSelector((state: IReduxState) => state.tempData);
  const linkto = useLinkTo();
  // const loading = useLoading();
  const [addressData, setAddressData] = React.useState<IAddress>();
  const styles = StyleSheet.create({
    pressable: {
      backgroundColor: '#EAEAEA',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
    },
    button: {position: 'absolute', bottom: 0, width: '100%'},
  });
  function handleSearchAddressPress() {
    navigation.navigate('Util', {
      screen: 'PostCode',
    });
  }
  React.useEffect(() => {
    setAddressData(tempData);
  }, [tempData]);
  async function getDeviceId() {
    return await messaging().getToken();
  }
  async function handleRegisterPress() {
    // setIsLoading(true);
    const deviceId = await getDeviceId();
    try {
      const postDatas = {
        ...route.params,
        address: addressData?.address,
        deviceId,
      };
      console.log(postDatas);
      const {data} = await API.post('user/auth/signup', postDatas);
      
      // set authentication
      setAccessToken(data.data.access_token);
      setRefreshToken(JSON.stringify(data.data.refresh_token));
      console.log(data);

      fetchAllDatas(dispatch);
    } catch (err) {
      console.log(err);
      Alert.alert('잘못된 접근입니다.');
      linkto('/register');
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <RegisterTemplateTitle
        title={
          '자주 가는 곳의 주소를 입력해주세요\n아차차가 근처 검사소를 찾아드릴게요'
        }
      />
      <RegisterTemplateContent>
        <Pressable onPress={handleSearchAddressPress} style={styles.pressable}>
          <Text
            children={
              !addressData ? '주소를 선택해주세요' : addressData.address
            }
            style={{fontSize: 20}}
          />
          <Icon name="search-outline" size={20} noPadding isPressable={false} />
        </Pressable>
      </RegisterTemplateContent>
      <Button
        text="입력 완료"
        style={styles.button}
        onPress={handleRegisterPress}
      />
    </View>
  );
}
