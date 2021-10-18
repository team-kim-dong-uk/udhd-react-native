import React from 'react';
import {
    StyleSheet, 
} from 'react-native';
import HelpModal from './HelpModal';

const UploadHelpModal = ({show}) => {
  const guides = [{
    textBox: {
      width: 145,
      height: 60,
      top: 210,
      left: 15,
      text: '업로드 할 이미지를 눌러 태그를 추가하세요.',
    },
    arrowBox: {
      width: 20,
      height: 35,
      top: 200,
      left: 160,
      type: 'bottom-right',
    },
    targetBox: {
      width: 130,
      height: 130,
      top: 62,
      left: 115,
    },
  },{
    textBox: {
      width: 165,
      height: 60,
      top: 69.5,
      left: 108,
      text: '업로드 버튼을 눌러 추천태그로 바로 업로드 할 수도 있어요.',
    },
    arrowBox: {
      width: 50,
      height: 35,
      top: 70,
      left: 273,
      type: 'bottom-right',
    },
    targetBox: {
      width: 63,
      height: 40,
      top: 19,
      left: 290,
    },
  },
];

  return (
    <HelpModal show={show} guides={guides}/>
  );
}

const styles = StyleSheet.create({
});

export default UploadHelpModal;
