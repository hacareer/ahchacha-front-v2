import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {IReduxState} from '../../redux/types';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import user from '../../../assets/images/icons/user.svg';
import alert from '../../../assets/images/icons/Alert.svg';
import {HEADER_STYLE} from '../../../styles/header';

export default function LocationSelectHeader() {
  const navigation = useNavigation();
  const [showLocationDrawer, setShowLocationDrawer] = React.useState(false);
  const userInfo = useSelector((state: IReduxState) => state.userInfo);
  const styles = StyleSheet.create({
    header: {
      width: '100%',
      height: HEADER_STYLE.height,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      overflow: 'visible',
      position: 'relative',
      elevation: 2,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    locationWrap: {
      marginLeft: 21,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  const LocationDrawer = (
    <Drawer style={{left: 21, top: 68 - 7}}>
      <DrawerItem text={userInfo?.location?.address} />
      <DrawerItem
        isTextOnly={false}
        style={{flexDirection: 'row', justifyContent: 'center'}}
        onPress={() => navigation.push('Util', {screen: 'AddressSearch'})}>
        <Icon
          name="search-outline"
          size={20}
          style={{paddingRight: 4}}
          noPadding
          isPressable={false}
        />
        <Text children="다른 주소 검색" style={{fontSize: 17}} isMed />
      </DrawerItem>
    </Drawer>
  );
  const handleLocationPress = () => setShowLocationDrawer(prev => !prev);
  return (
    <View
      style={styles.header}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={() => setShowLocationDrawer(false)}
      onResponderMove={() => setShowLocationDrawer(false)}>
      <Pressable style={styles.locationWrap} onPress={handleLocationPress}>
        <Text
          children={userInfo?.location?.address}
          style={{fontSize: 18}}
          isMed
        />
        <Icon
          name="chevron-down-outline"
          size={18}
          isPressable={false}
          color="#D1D1D1"
          style={{marginTop: 2}}
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
          marginRight: 24,
        }}>
        <SvgXml xml={alert} stroke="#D1D1D1" style={{marginRight: 20}} />
        <SvgXml xml={user} stroke="#D1D1D1" />
      </View>
      {showLocationDrawer && LocationDrawer}
    </View>
  );
}
interface IDrawer {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}
const Drawer = ({style, children}: IDrawer) => {
  const styles = StyleSheet.create({
    wrap: {
      minWidth: 150,
      position: 'absolute',
      zIndex: 1000,
    },
  });
  return <View style={[styles.wrap, style]} children={children} />;
};
interface IDrawerItem {
  children?: React.ReactNode;
  isTextOnly?: boolean;
  text?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
}
const DrawerItem = (props: IDrawerItem) => {
  const {children, isTextOnly = true, text, style, ...otherProps} = props;
  const styles = StyleSheet.create({
    itemWrap: {
      minWidth: 118,
      paddingRight: 16,
      paddingLeft: 16,
      height: 57,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
    },
    itemText: {
      fontSize: 18,
      textAlign: 'center',
    },
  });
  return (
    <Pressable style={[styles.itemWrap, style]} {...otherProps}>
      {isTextOnly ? (
        <Text style={styles.itemText} children={text} isMed />
      ) : (
        children
      )}
    </Pressable>
  );
};
