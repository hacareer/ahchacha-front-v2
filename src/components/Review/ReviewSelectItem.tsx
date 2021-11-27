import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Text from '../Atoms/Text';

interface IProps {
  selected?: boolean;
  text: string;
}
export default function ReviewSelectItem(props: IProps) {
  const {selected = false, text} = props;
  const [isSelected, setIsSelected] = React.useState(false);
  const styles = StyleSheet.create({
    wrap: {
      height: 43,
      marginRight: 20,
      marginLeft: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 22,
      borderWidth: 0.2,
      backgroundColor: '#F8F8F8',
      borderColor: '#707070',
      marginTop: 16,
    },
    text: {
      fontSize: 16,
    },
    selectedWrap: {
      backgroundColor: '#FFC715',
      borderColor: '#FFC715',
      borderWidth: 0.2,
    },
    selectedText: {
      color: 'white',
    },
  });
  function handlePress() {
    setIsSelected(prev => !prev);
  }
  React.useEffect(() => {
    setIsSelected(selected);
  }, [selected]);
  return (
    <Pressable
      style={[styles.wrap, isSelected && styles.selectedWrap]}
      onPress={handlePress}>
      <Text
        children={text}
        style={[styles.text, isSelected && styles.selectedText]}
        isBold
      />
    </Pressable>
  );
}
