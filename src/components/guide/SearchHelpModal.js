import React from 'react';
import {
    StyleSheet, 
} from 'react-native';
import HelpModal from './HelpModal';

const SearchHelpModal = ({show}) => {

  const guides = [{
    textBox: {
      width: 170,
      height: 70,
      top: 69.5,
      left: 158,
      text: '검색 메뉴 - 검색창에서 나에게 없는 사진들을 태그별 찾아볼 수 있어요',
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
  },
];

  return (
    <HelpModal show={show} guides={guides}/>
  );
}

const styles = StyleSheet.create({
});

export default SearchHelpModal;
