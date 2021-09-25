import {Dimensions} from 'react-native';

export const colors = {
  orange: '#FBAE17',
  black: '#222222',
  white: '#FFFFFF',
  grey: '#BBBBBB',
  placeholderGrey: '#AAAAAA',
  inputGrey: '#F8F8F8',
  checkboxGrey: '#F2F2F2',
  switchGrey: '#D2D2D2',
  blue: '#1E83DB',
  darkBlue: '#121262',
  red: '#FF4A4A',
  kakaoYellow: '#FFDF00',
};

export const fonts = {
  NotoSansCJKkr: 'NotoSansCJKkr',
};

export const basicDimensions = {
  height: 640,
  width: 360,
};

export const height = ( // 높이 변환 작업
  Dimensions.get('screen').height *
  (1 / basicDimensions.height)
).toFixed(2);

export const width = ( // 가로 변환 작업
  Dimensions.get('screen').width *
  (1 / basicDimensions.width)
).toFixed(2);