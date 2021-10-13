import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
    StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts, height, width } from '../../util/StyleUtil';
import ModalTemplate from '../ModalTemplate';
import ArrowBox from './ArrowBox';
import TargetBox from './TargetBox';
import TextBox from './TextBox';

const HelpModal = ({show, guides}) => {
  const [idx, setIdx] = useState(0);

  guides = [{
    textBox: {
      width: 165,
      height: 60,
      top: 69.5,
      left: 118,
      text: '업로드 버튼으로 언제든지 사진을 업로드해보세요',
    },
    arrowBox: {
      width: 50,
      height: 35,
      top: 64.5,
      left: 283,
    },
    targetBox: {
      width: 40,
      height: 40,
      top: 19,
      left: 313,
    },
  }]
  return (
    <ModalTemplate
      style={styles.container}
      show={show}
      onControlModal={()=>{}}
      onShow={()=>{}}
    >
    <View style={styles.container}>
      <TextBox item={guides[idx].textBox}></TextBox>
      <ArrowBox item={guides[idx].arrowBox}></ArrowBox>
      <TargetBox item={guides[idx].targetBox}></TargetBox>
    </View>
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360 * width,
    height: 628 * height,
    marginTop:StatusBar.currentHeight,
    backgroundColor: colors.black,
    opacity: 0.75,
    zIndex: 3,
  },
});

export default HelpModal;
