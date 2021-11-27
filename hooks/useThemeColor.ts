import {useColorScheme} from 'react-native';
import Colors from '../constants/Colors';

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorFromProps = isDarkMode ? props.dark : props.light;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[isDarkMode ? 'dark' : 'light'][colorName];
  }
}
