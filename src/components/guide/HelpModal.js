import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
  Pressable,
    StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts, height, width } from '../../util/StyleUtil';
import ModalTemplate from '../ModalTemplate';
import ArrowBox from './ArrowBox';
import TargetBox from './TargetBox';
import TextBox from './TextBox';

const HelpModal = ({show, guides}) => {
  const [idx, setIdx] = useState(0);
  const [showState, setShowState] = useState(show);

  const onGuidePress = (idx, guides) => {
    if (idx === guides.length - 1) {
      setShowState(false);
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <ModalTemplate
      style={styles.container}
      show={showState}
      onControlModal={()=>{}}
      onShow={()=>{}}
    >
    <Pressable style={styles.container} onPress={() => onGuidePress(idx, guides)}>
      <TextBox item={guides[idx].textBox}></TextBox>
      <ArrowBox item={guides[idx].arrowBox}></ArrowBox>
      <TargetBox item={guides[idx].targetBox}></TargetBox>
    </Pressable>
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360 * width,
    height: 628 * height,
    marginTop:StatusBar.currentHeight,
    backgroundColor: colors.black,
    opacity: 0.7,
    zIndex: 3,
  },
});

export default HelpModal;
