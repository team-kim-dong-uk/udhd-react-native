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
    <View style={[boxSize, styles.boxStyle]}>
      <View style={[styles.arrowHead, {transform: [{rotate: "45deg"}]}]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    borderBottomWidth: 2 * width,
    borderRightWidth: 2 * width,
    borderRadius: 2 * width,
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderTopWidth: 2 * width,
    borderLeftWidth: 2 * width,
    borderColor: colors.orange,
    width: 10 * width,
    height: 10 * width,
    position: 'absolute',
    top: 0,
    right: -6 * width,
  }
});

export default ArrowBox;
