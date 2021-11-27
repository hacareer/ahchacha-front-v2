import * as React from 'react';
import {StyleSheet, Text as DefaultText, TextProps} from 'react-native';

type IText = TextProps & {
  isBold?: boolean;
  isReg?: boolean;
  isMed?: boolean;
  isBlack?: boolean;
};
export default function Text(props: IText) {
  const {style, isBold, isReg, isBlack} = props;
  const styles = StyleSheet.create({
    text: {
      fontFamily: isBold
        ? 'AppleSDGothicNeo-Bold'
        : isReg
        ? 'AppleSDGothicNeo-Regular'
        : 'AppleSDGothicNeo-Medium',
      color: isBlack ? 'black' : '#494949',
    },
  });

  return <DefaultText {...props} style={[styles.text, style]} />;
}
