export interface IReduxState {
  data: any[];
  loading: boolean;
  userInfo: IUser;
  tempData: IAddress;
  tempData1: string[];
  userAddress: {
    address: string;
    latitude: number;
    longitude: number;
  };
  clinicData: IClinic[];
  checkUpResult: ICheckUpResult[];
  checkUp: ICheckUp[];
}
export interface ILocation {
  id?: number;
  latitude: number;
  longitude: number;
  address?: string;
}
export interface IUser {
  deviceId: string;
  id: number;
  kakaoAccount: string;
  location: ILocation;
  nickname: string;
  refreshToken: string;
  univ: any;
  vaccination: 'YES' | 'NO';
}
export interface IAddress {
  address: string;
  addressEnglish: string;
  addressType: string;
  apartment: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  bcode: string;
  bname: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  bnameEnglish: string;
  buildingCode: string;
  buildingName: string;
  hname: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  noSelected: string;
  postcode: string;
  postcode1: string;
  postcode2: string;
  postcodeSeq: string;
  query: string;
  roadAddress: string;
  roadAddressEnglish: string;
  roadname: string;
  roadnameCode: string;
  roadnameEnglish: string;
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguCode: string;
  sigunguEnglish: string;
  userLanguageType: string;
  userSelectedType: string;
  zonecode: string;
  latitude?: number;
  longitude?: number;
}
export interface IClinic {
  id: number;
  name: string;
  label: 'TEMPORARY' | '';
  address: string;
  latitude: number;
  longitude: number;
  telephone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  operationHourId?: number;
  operationHour: {
    id: number;
    weekdayOpen: string;
    weekdayClose: string;
    saturdayOpen: string;
    saturdayClose: string;
    sundayOpen: string;
    sundayClose: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
  distance: number;
}
export interface ICheckUpResult {
  id: number;
  startTime: Date;
  finishTime: Date;
}
export interface ICheckUp {
  id: number;
  date: Date;
  clinic: IClinic;
}
