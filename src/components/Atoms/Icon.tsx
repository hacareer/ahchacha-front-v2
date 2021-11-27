import * as React from 'react';
import DefaultIcon from 'react-native-vector-icons/Ionicons';
import {IconButtonProps} from 'react-native-vector-icons/Icon';
import {Pressable, StyleSheet} from 'react-native';
import {transparent} from '../../../constants/Colors';
import {useThemeColor} from '../../../hooks/useThemeColor';
type ExtraProps = {
  color?: string;
  noPadding?: boolean;
  isPressable?: boolean;
  padding?: number;
};
export default function Icon(props: IconButtonProps & ExtraProps) {
  const {
    style,
    color,
    onPress,
    noPadding = false,
    isPressable = true,
    padding = 7,
    ...otherProps
  } = props;
  const themedColor = useThemeColor({light: color, dark: color}, 'icon');
  const [pressed, setPressed] = React.useState(false);
  const pressedColor = useThemeColor({light: '', dark: ''}, 'pressedColor');
  const styles = StyleSheet.create({
    icon: {
      padding: !noPadding ? padding : 0,
    },
    iconPressed: {
      borderRadius: 500,
      backgroundColor: pressed ? pressedColor : transparent,
    },
  });
  function handleStyle({pressed}: {pressed: boolean}) {
    setPressed(pressed);
    return [styles.iconPressed, style];
  }
  return (
    <>
      {isPressable ? (
        <Pressable onPress={onPress} style={handleStyle}>
          <DefaultIcon
            style={[styles.icon, styles.iconPressed]}
            color={themedColor}
            {...otherProps}
          />
        </Pressable>
      ) : (
        <DefaultIcon
          style={[styles.icon, styles.iconPressed, style]}
          color={themedColor}
          {...otherProps}
        />
      )}
    </>
  );
}
