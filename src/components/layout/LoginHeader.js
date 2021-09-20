import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { height, width, colors, fonts } from '../../util/StyleUtil';
import BackButton from '../../../assets/back-button.svg';


export const LoginHeader = ({ navigation, route, options, back }) => {
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
        <View style={styles.orderContainer}>
          <Text style={[styles.orderText, styles.currentOrderText]}>{options.order}</Text>
          <Text style={styles.orderText}>/</Text>
          <Text style={styles.orderText}>3</Text>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 360 * width,
      height: 55 * height,
      backgroundColor: colors.white,
    },
    backButton: {
      marginLeft: 15 * width,
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
      //custom
      flex: 1,
    },
    orderContainer: {
      width: 35 * width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 15 * width,
    },
    orderText: {
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 16 * width,
      fontWeight: "500",
      fontStyle: "normal",
      lineHeight: 22 * height,
      letterSpacing: 0,
      textAlign: "center",
      color: colors.black,
    },
    currentOrderText: {
      color: colors.orange,
    }
});