import {StyleSheet} from 'react-native';

export const calendarStyle = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    marginTop: 20,
    marginLeft: 8,
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 32,
  },
  pressable: {
    height: 40,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 4,
  },
  text: {fontSize: 16, color: '#D1D1D1'},
  warning: {fontSize: 12, marginTop: 20, lineHeight: 22, color: '#C9C9C9'},
});
