import * as React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Text from './Atoms/Text';
import Alert from '../../assets/images/icons/Alert.svg';

interface IFABProps {
  onPress?: (e: GestureResponderEvent) => void;
  text: string;
}
export default function FAB(props: IFABProps) {
  const {onPress = () => {}, text} = props;
  const styles = StyleSheet.create({
    wrap: {
      width: 64,
      height: 64,
      borderRadius: 5000,
      backgroundColor: '#FFC715',
      bottom: 25,
      right: 20,
      zIndex: 102,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
    },
  });
  return (
    <Pressable style={styles.wrap} onPress={onPress}>
      <SvgXml xml={Alert} color="white" stroke="white" width={24} height={22} />
    </Pressable>
  );
}
