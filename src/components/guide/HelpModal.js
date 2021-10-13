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
      type: 'bottom-right',
    },
    targetBox: {
      width: 40,
      height: 40,
      top: 19,
      left: 313,
    },
  },{
    textBox: {
      width: 165,
      height: 60,
      top: 69.5,
      left: 158,
      text: '내 앨범 검색에서 내 사진들을 태그별로 모아 볼 수 있어요',
    },
    arrowBox: {
      width: 50,
      height: 35,
      top: 70,
      left: 108,
      type: 'bottom-left',
    },
    targetBox: {
      width: 220,
      height: 40,
      top: 19,
      left: 50,
    },
  },{
    textBox: {
      width: 140,
      height: 80,
      top: 460,
      left: 17,
      text: '검색 메뉴에서 나에게 없는 사진만을 찾아보세요',
    },
    arrowBox: {
      width: 20,
      height: 60,
      top: 490,
      left: 157,
      type: 'top-right',
    },
    targetBox: {
      width: 50,
      height: 50,
      top: 560,
      left: 155,
    },
  }
];

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
