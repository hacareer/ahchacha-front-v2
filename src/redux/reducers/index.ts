import {
  IMAGE_DATA_FETCHED,
  DATA_LOADING,
  FETCH_MORE,
  SET_USER_INFO,
  SET_TEMP_DATA,
  SET_USER_ADDRESS,
  SET_CLINIC_DATA,
  SET_TEMP_DATA_1,
  SET_CHECK_UP_RESULT,
} from '../actions/fetch';
import {IAddress, IReduxState} from '../types';
interface Action {
  type: string;
  payload: any;
}

const initialState: IReduxState = {
  data: [],
  loading: false,
  // userInfo: null,
  clinicData: [],
  tempData1: [],
  checkUpResult: [],
  /*
  userInfo: {
    deviceId:
      'dJ-a_a3iTniSjayEqM6aLV:APA91bHsUOZHCUh2QwTg5Qzc-Jnb6Zyeyfp2vuohOBpLF_wGRgCGXgR-ilHjemCjRV_M5tsEDiEBJdbIjzrDL6s2UVAd0KoD2cZqbdTdXWkQ7NuKfXM9oHfRnblm7yRQeOlWv5j1Zt6o',
    id: 5,
    kakaoAccount: '1982731221',
    location: {
      address: '서울 성동구 한림말길 4',
      id: 5,
      latitude: 37.540983,
      longitude: 127.0115826,
    },
    nickname: 'dongzoolee',
    refreshToken:
      'U2FsdGVkX18fDieokQJJTta+dv59bK+PVo6H5WhEC0uuiyioU6mIYuNFsk/dT/Tyrv7s+aWdyS+lAOx5zxKblMq48t0few59cQsGZP8ArjnayS3TBZ5jTDMp4A8zc8b3YaCtTOByEWWQZCaxCYlrv5giNxyANBR4WH+7JLVkkKOnlTLpp1/25YztVcJWJ12R+4ZMiYjdajBuRxsdJFCNGssmvZTH7QbYJth3z/ek3JeMgVPYb9wuhNPN80ov2QWBmUGo+M03HqwuQ3Ay0DsPTInJzdgk3iffADf6B6opR+g=',
    univ: {id: 184, name: '서강대학교'},
    vaccination: 'YES',
  },
  tempData: {} as IAddress,
  userAddress: {
    address: '',
    latitude: 0,
    longitude: 0,
  },
  */
};

export default (
  state: IReduxState = initialState,
  action: Action,
): IReduxState => {
  switch (action.type) {
    case IMAGE_DATA_FETCHED:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_MORE:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case DATA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_TEMP_DATA:
      return {
        ...state,
        tempData: action.payload,
      };
    case SET_TEMP_DATA_1:
      return {
        ...state,
        tempData1: action.payload,
      };
    case SET_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      };
    case SET_CLINIC_DATA:
      return {
        ...state,
        clinicData: action.payload,
      };
    case SET_CHECK_UP_RESULT:
      return {
        ...state,
        checkUpResult: action.payload,
      };
    default:
      return state;
  }
};
