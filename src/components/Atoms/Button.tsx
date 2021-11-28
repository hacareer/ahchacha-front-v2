import * as React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import Colors from '../../../constants/Colors';
import Text from './Text';

export default function Button({
  text,
  backgroundColor = '#62FFA1',
  // color = '#606060',
  color = 'black',
  onPress,
  style,
  textStyle,
  disabled = false,
}: {
  text: string;
  backgroundColor?: string;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}) {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      elevation: 1,
    },
    text: {
      color: color,
      fontSize: 18,
    },
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        style,
        disabled && {
          backgroundColor:
            Colors[isDarkMode ? 'dark' : 'light']?.disabledBackground,
        },
      ]}>
      <Text
        style={[
          styles.text,
          textStyle,
          disabled && {
            color: Colors[isDarkMode ? 'dark' : 'light']?.disabledColor,
          },
        ]}
        isBold>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
