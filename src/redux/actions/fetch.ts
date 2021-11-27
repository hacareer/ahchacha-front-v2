import axios from 'axios';
import {Dispatch} from 'redux';
import SensitiveInfo from 'react-native-sensitive-info';

export const IMAGE_DATA_FETCHED = 'IMAGE_DATA_FETCHED';
export const DATA_LOADING = 'DATA_LOADING';
export const FETCH_MORE = 'FETCH_MORE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_TEMP_DATA = 'SET_TEMP_DATA';
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS';
export const SET_CLINIC_DATA = 'SET_CLINIC_DATA';
export const SET_TEMP_DATA_1 = 'SET_TEMP_DATA_1';
export const SET_CHECK_UP_RESULT = 'SET_CHECK_UP_RESULT';

export const API = axios.create({
  // baseURL: 'https://flit.co.kr/api/v1',
  baseURL: 'http://13.125.231.69/',
});
export async function setAccessToken(token: string) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log(token);
  await SensitiveInfo.setItem('accessToken', token, {
    sharedPreferencesName: 'sharedAccessToken',
    keychainService: 'myKeychain',
  });
}
export async function getAccessToken() {
  return await SensitiveInfo.getItem('accessToken', {
    sharedPreferencesName: 'sharedAccessToken',
    keychainService: 'myKeychain',
  });
}
export async function setRefreshToken(tokenData) {
  return await SensitiveInfo.setItem('refreshToken', tokenData, {
    sharedPreferencesName: 'sharedRefreshToken',
    keychainService: 'myKeychain',
  });
}
export async function getRefreshToken() {
  const refresh = await SensitiveInfo.getItem('refreshToken', {
    sharedPreferencesName: 'sharedRefreshToken',
    keychainService: 'myKeychain',
  });
  if (refresh) {
    return JSON.parse(refresh);
  } else {
    return {};
  }
}
export async function fetchAllDatas(dispatch: Dispatch) {
  try {
    await Promise.all([fetchUserInfo(dispatch), fetchCheckUpResult(dispatch)]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
export async function fetchUserInfo(dispatch: Dispatch) {
  const {data} = await API.get('/user/my');
  console.log(data.data);
  dispatch(setUserInfo(data.data));
}
export async function fetchCheckUpResult(dispatch: Dispatch) {
  const {data} = await API.get('check-up-result/my');
  console.log(data.data);
  dispatch(setCheckUpResult(data.data));
}
export async function fetchClinicData(
  dispatch: Dispatch,
  latitude: number,
  longitude: number,
) {
  const {data} = await API.get(`clinic/area/${latitude}/${longitude}`);
  dispatch(setClinicData(data.data));
}
// export function setTempData(data: any) {
//   return (dispatch: Dispatch) => {
//     dispatch(tempDataUpdated(data));
//   };
// }
export const setCheckUpResult = (data: any) => ({
  type: SET_CHECK_UP_RESULT,
  payload: data,
});
export const setClinicData = (data: any) => ({
  type: SET_CLINIC_DATA,
  payload: data,
});
export const setUserAddress = (data: any) => ({
  type: SET_USER_ADDRESS,
  payload: data,
});
export const setUserInfo = (data: any) => ({
  type: SET_USER_INFO,
  payload: data,
});
export const setTempData = (data: any) => ({
  type: SET_TEMP_DATA,
  payload: data,
});
export const setTempData1 = (data: any) => ({
  type: SET_TEMP_DATA_1,
  payload: data,
});
export const loading = (loader: boolean) => ({
  type: DATA_LOADING,
  payload: loader,
});
