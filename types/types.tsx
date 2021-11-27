export interface ILinkingConfiguration {
  prefixes: string[];
  config: any;
}
export type RootStackParamList = {
  Register: undefined;
  BottomTab: undefined;
  Hospital: undefined;
  Calendar: undefined;
  Clinic: undefined;
  School: undefined;
  Util: undefined;
};
export type BottomTabParamList = {
  Main: undefined;
  Map: undefined;
  Calendar: undefined;
  School: undefined;
};
export type RegisterParamList = {
  Main: undefined;
  Terms: undefined;
  Nickname: undefined;
  Vaccinated: undefined;
  School: undefined;
  HangOuts: undefined;
};
export type HospitalParamList = {
  List: undefined;
  Detail: undefined;
  Review: undefined;
};
export type CalendarParamList = {
  Main: undefined;
  Detail: undefined;
  AddAlarm: undefined;
  SelectAlarmTime: undefined;
  AddSchedule: undefined;
};
export type SchoolParamList = {
  Main: undefined;
  Board: undefined;
  Write: undefined;
};
export type UtilParamList = {
  PostCode: undefined;
  AddressSearch: undefined;
};
