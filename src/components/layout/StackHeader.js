import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { height, width, colors, fonts } from '../../util/StyleUtil';
import BackButton from '../../../assets/back-button.svg';


export const StackHeader = ({ navigation, route, options, back }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <BackButton
            width={10 * width}
            height={20 * height}
            viewBox='0 0 40 80'
          />
        </TouchableOpacity>
        <Text style={styles.title}> {options.title} </Text>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 360 * width,
      height: 55 * height,
      backgroundColor: colors.white,
    },
    backButton: {
      position: 'absolute',
      left: 15 * width,
    },
    title: {
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 16 * width,
      fontWeight: "500",
      fontStyle: "normal",
      lineHeight: 22 * height,
      letterSpacing: 0,
      textAlign: "center",
      color: colors.black,
    },
    rightItem: {
      position: 'absolute',
      right: 15 * width,
    },
});