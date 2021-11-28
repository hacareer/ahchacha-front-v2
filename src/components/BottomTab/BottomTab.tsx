import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Layout from '../../../constants/Layout';
import Text from '../Atoms/Text';
import main from '../../../assets/images/icons/Main.svg';
import alert from '../../../assets/images/icons/Alert.svg';
import compass from '../../../assets/images/icons/Compass.svg';
import message from '../../../assets/images/icons/Message.svg';

export default function BottomTab(props) {
  const {state, descriptors, navigation} = props;
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const RouteIcon = (
          <>
            {route.name === 'Main' && (
              <SvgXml xml={main} stroke={isFocused ? '#686868' : '#d1d1d1'} />
            )}
            {route.name === 'Map' && (
              <SvgXml
                xml={compass}
                stroke={isFocused ? '#686868' : '#d1d1d1'}
              />
            )}
            {route.name === 'Calendar' && (
              <SvgXml xml={alert} stroke={isFocused ? '#686868' : '#d1d1d1'} />
            )}
            {route.name === 'School' && (
              <SvgXml
                xml={message}
                stroke={isFocused ? '#686868' : '#d1d1d1'}
              />
            )}
          </>
        );
        return (
          <TouchableOpacity
            key={`bottom-tab-${route.name}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.iconContainer}>
            <View style={styles.iconWrap}>
              {RouteIcon}
              <Text
                style={[
                  styles.iconText,
                  {color: isFocused ? '#686868' : '#d1d1d1'},
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: Layout.bottomTabHeight,
    backgroundColor: '#F4F4F4',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconContainer: {
    height: Layout.bottomTabHeight,
    flexDirection: 'row',
    alignItems: 'center',
    width: Layout.window.width / 5,
    justifyContent: 'center',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {marginTop: 4, fontSize: 12},
});
