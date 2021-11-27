import Postcode from 'react-native-daum-postcode';
import * as React from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';

export default function FullScreenPostcode({show = true, setShow, onSelected}) {
  const styles = StyleSheet.create({
    postcode: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'black',
      top: 0,
      zIndex: show ? 1000 : -1,
    },
  });
  React.useEffect(() => {
    // ignore backkey inside postcode modal
    const event = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        if (show) {
          setShow(false);
          return true;
        } else {
          return false;
        }
      },
    );
    return () => event.remove();
  }, [show, setShow]);
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: 1000,
      }}>
      <Postcode
        style={styles.postcode}
        jsOptions={{animation: true}}
        onSelected={onSelected}
        onError={error => {
          console.log(error);
        }}
      />
    </View>
  );
}
