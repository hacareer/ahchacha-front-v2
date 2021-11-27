import {useLinkTo} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../../../components/Atoms/Text';
import FAB from '../../../components/FAB';
export default function SchoolBoardScreen() {
  const linkto = useLinkTo();
  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: 25,
      paddingRight: 25,
    },
    scrollViewContent: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingBottom: 35,
    },
  });
  function handleWritePress() {
    linkto('/school/write');
  }
  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </ScrollView>
      <FAB text="글쓰기" onPress={handleWritePress} />
    </>
  );
}
function PostItem(props) {
  const {} = props;
  const styles = StyleSheet.create({
    wrap: {
      width: 163,
      height: 118,
      backgroundColor: '#F8F8F8',
      borderColor: '#707070',
      borderWidth: 0.2,
      borderRadius: 5,
      paddingTop: 15,
      paddingLeft: 17,
      marginTop: 16,
    },
    title: {
      fontSize: 16,
      lineHeight: 32,
    },
    writer: {
      fontSize: 12,
      bottom: 9,
      right: 13,
      position: 'absolute',
    },
  });
  return (
    <View style={styles.wrap}>
      <Text
        style={styles.title}
        children={'백신미접종자 차별\n화나요😡'}
        isBold
      />
      <Text style={styles.writer} children="ㅇㅇㅇ님" isBold />
    </View>
  );
}
