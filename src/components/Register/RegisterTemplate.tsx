import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle, View} from 'react-native';
import Text from '../Atoms/Text';

const styles = StyleSheet.create({
  titleWrap: {
    marginTop: 36.2,
    marginBottom: 32,
    marginRight: 28,
    marginLeft: 28,
  },
  title: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    color: '#606060',
    fontSize: 20,
    lineHeight: 32,
  },
  //   subTitle: {
  //     marginTop: 16,
  //     marginBottom: 8,
  //     fontFamily: 'APPLESDGOTHICNEOL',
  //     fontSize: 23,
  //     lineHeight: 33,
  //   },
  contentWrap: {
    marginBottom: 36.2,
    marginRight: 28,
    marginLeft: 28,
  },
});
interface IProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  //   subTitle?: string;
}
export function RegisterTemplateTitle(props: IProps) {
  const {
    title,
    style,
    // , subTitle
  } = props;
  return (
    <View style={[styles.titleWrap, style]}>
      <Text children={title} style={styles.title} isBold />
      {/* {!!subTitle && <Text style={styles.subTitle}>{subTitle}</Text>} */}
    </View>
  );
}
interface IProps2 {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
export function RegisterTemplateContent(props: IProps2) {
  const {children, style} = props;
  return <View style={[style, styles.contentWrap]} children={children} />;
}
