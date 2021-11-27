import * as React from 'react';
import Text from '../Atoms/Text';
import {StyleSheet, View} from 'react-native';
interface IHeader {
  title: string;
  subTitle?: string;
}
export default function TextHeader(props: IHeader) {
  const {title, subTitle} = props;
  const styles = StyleSheet.create({
    headerTitleWrap: {},
    headerTitle: {
      fontSize: 20,
    },
    headerSubTitle: {
      fontSize: 12,
      textAlign: 'center',
      marginTop: 2,
      color: '#AAAAAA',
    },
  });
  return (
    <View style={styles.headerTitleWrap}>
      <Text children={title} style={styles.headerTitle} isMed />
      {!!subTitle && (
        <Text children={subTitle} style={styles.headerSubTitle} isReg />
      )}
    </View>
  );
}
