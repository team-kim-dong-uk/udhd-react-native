import React, {useState} from 'react';
import {
    StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts, height, width } from '../../util/StyleUtil';

const TargetBox = ({item}) => {
  const boxSize = {
    height: item.height * height,
    width: item.width * width,
    position: 'absolute',
    top: item.top * height,
    left: item.left * width,
  };

  return (
    <View style={[boxSize, styles.boxStyle]}>
      <Text style={styles.textStyle}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    borderWidth: 2 * width,
    borderRadius: 2 * width,
    borderColor: colors.orange,
    backgroundColor: colors.white,
    opacity: 1,
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
  }
});

export default TargetBox;
