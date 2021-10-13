import React from 'react';
import {
    StyleSheet, 
} from 'react-native';
import HelpModal from './HelpModal';

const AlbumHelpModal = ({show}) => {

  const guides = [{
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

  return (
    <HelpModal show={show} guides={guides}/>
  );
}

const styles = StyleSheet.create({
});

export default AlbumHelpModal;
