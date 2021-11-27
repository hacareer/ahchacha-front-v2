import * as React from 'react';
import {ActivityIndicator as DefAI, View} from 'react-native';

export default function ActivityIndicator({show}) {
  if (show) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1000,
        }}>
        <DefAI />
      </View>
    );
  }
  return <></>;
}
