import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Postcode from 'react-native-daum-postcode';
import {setTempData} from '../../redux/actions/fetch';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

export default function PostCodeScreen({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    postcode: {
      //   width: '100%',
      //   height: '100%',
      zIndex: 100,
    },
  });
  function handlePostCodeSelected(data) {
    dispatch(setTempData(data));
    navigation.goBack();
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Postcode
        style={styles.postcode}
        jsOptions={{animation: true}}
        onSelected={handlePostCodeSelected}
        onError={error => {
          console.log(error);
        }}
      />
    </View>
  );
}
