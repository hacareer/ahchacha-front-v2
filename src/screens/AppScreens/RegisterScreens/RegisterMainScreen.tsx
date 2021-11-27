import {StackScreenProps} from '@react-navigation/stack';
import {
  // getProfile as getKakaoProfile,
  login,
  KakaoOAuthToken,
  unlink,
  // KakaoProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import SensitiveInfo from 'react-native-sensitive-info';
import * as React from 'react';
import {Image, View, Pressable} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {RegisterParamList} from '../../../../types/types';
import Button from '../../../components/Atoms/Button';
import Text from '../../../components/Atoms/Text';
import {
  API,
  fetchAllDatas,
  setAccessToken,
  setRefreshToken,
} from '../../../redux/actions/fetch';
import {useDispatch} from 'react-redux';
import Character from '../../../../assets/images/character/character2.png';
import star1 from '../../../../assets/images/atoms/star1.png';
import kakaoLogin from '../../../../assets/images/etc/kakao-login.svg';
import ahChaCha from '../../../../assets/images/logo/ahchacha.svg';
import Svg, {SvgXml} from 'react-native-svg';

interface IProps {}
type Props = StackScreenProps<RegisterParamList, 'Main'>;

export default function RegisterMainScreen({navigation}: Props & IProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  async function IsAlreadyUser(kakaoToken: string, fcmToken: string) {
    console.log(kakaoToken);
    const datas = {
      kakaoToken: kakaoToken,
      // email,
      // fcmToken: fcmToken,
    };
    // 비회원일경우, 401 No Auth로 catch문으로 걸러짐
    const response = await API.post('/user/auth/login', datas);
    const {success, code, data} = response.data;

    return data;
  }
  async function signInWithKakao(isKakaoTalk?: boolean) {
    try {
      const kakaoToken: KakaoOAuthToken = isKakaoTalk
        ? await login()
        : await loginWithKakaoAccount();
      // const {email}: KakaoProfile = await getKakaoProfile();
      console.log(kakaoToken.accessToken);
      // login process
      try {
        const fcmToken = await messaging().getToken();
        const data = await IsAlreadyUser(kakaoToken.accessToken, fcmToken);

        // 일회성 유저
        if (data.type === 'once') {
          setAccessToken(data.once_token);
          navigateToRegisterPage();
        }
        if (data.type === 'login') {
          // 기존 유저
          await handleAvailableUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleAvailableUser(data) {
    if (data.access_token) {
      // 모든 request에 jwt 삽입
      setAccessToken(data.access_token);
      setRefreshToken(JSON.stringify(data.refresh_token));
    }
    // redux에 모든 appData저장
    fetchAllDatas(dispatch);
  }
  function navigateToRegisterPage() {
    navigation.navigate('Terms');
  }
  async function unlinkKakao() {
    try {
      await unlink();
    } catch (err) {
      console.log(err);
    }
  }
  function handleLoginPress(isKakaoTalk: boolean) {
    setIsLoading(true);
    signInWithKakao(isKakaoTalk);
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={star1}
        width={10}
        style={{
          position: 'absolute',
          top: 58,
          right: 16,
          width: 176,
          height: 176,
        }}
      />
      <Image
        source={Character}
        style={{
          position: 'absolute',
          left: 25,
          top: 161,
          width: 265,
          height: 265,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 437,
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
        }}>
        <SvgXml xml={ahChaCha} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 100,
          width: '100%',
        }}>
        <Pressable
          style={{
            width: 227,
            borderRadius: 1000,
            backgroundColor: '#FEE500',
            height: 46,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleLoginPress(true)}>
          <SvgXml xml={kakaoLogin} />
        </Pressable>
        <Text
          children="다른 카카오 계정으로 로그인"
          style={{
            marginTop: 8,
          }}
          onPress={() => handleLoginPress(false)}
        />
      </View>

      {/* <Button
        text="카카오 로그인"
        style={{position: 'absolute', bottom: 0}}
      />
       */}
    </View>
  );
}
