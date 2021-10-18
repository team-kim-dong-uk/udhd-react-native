import React, {useState} from 'react';
import {
    StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts, height, width } from '../../util/StyleUtil';

const ArrowBox = ({item}) => {
  const boxSize = {
    height: item.height * height,
    width: item.width * width,
    position: 'absolute',
    top: item.top * height,
    left: item.left * width,
  };

  return (
    <View style={[boxSize,
                  styles.boxStyle,
                  item.type.startsWith('bottom') ? styles.bottomBorder : null,
                  item.type.startsWith('top') ? styles.topBorder : null,
                  item.type.endsWith('left') ? styles.leftBorder : null,
                  item.type.endsWith('right') ? styles.rightBorder : null,
                  ]}>
      <View style={[
        styles.arrowHead,
        item.type === 'bottom-right' ? styles.arrowHeadBottomRight : null,
        item.type === 'bottom-left' ? styles.arrowHeadBottomLeft : null,
        item.type === 'top-right' ? styles.arrowHeadTopRight : null,
        item.type === 'top-left' ? styles.arrowHeadTopLeft : null,
        {transform: [{rotate: "45deg"}]}
        ]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    borderRadius: 2 * width,
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBorder: {
    borderBottomWidth: 2 * width,
  },
  topBorder: {
    borderTopWidth: 2 * width,
  },
  leftBorder: {
    borderLeftWidth: 2 * width,
  },
  rightBorder: {
    borderRightWidth: 2 * width,
  },
  textStyle: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 13 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.white,
  },
  arrowHead: {
    borderColor: colors.orange,
    width: 10 * width,
    height: 10 * width,
    position: 'absolute',
  },
  arrowHeadBottomRight: {
    borderTopWidth: 2 * width,
    borderLeftWidth: 2 * width,
    top: 0,
    right: -6 * width,
  },
  arrowHeadBottomLeft: {
    borderTopWidth: 2 * width,
    borderLeftWidth: 2 * width,
    top: 0,
    left: -6 * width,
  },
  arrowHeadTopRight: {
    borderBottomWidth: 2 * width,
    borderRightWidth: 2 * width,
    bottom: 0,
    right: -6 * width,
  },
  arrowHeadTopLeft: {
    borderBottomWidth: 2 * width,
    borderRightWidth: 2 * width,
    bottom: 0,
    left: -6 * width,
  },
});

export default ArrowBox;
