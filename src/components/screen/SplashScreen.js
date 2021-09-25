import React from "react";
import { View } from "react-native";
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { height, width } from '../../util/StyleUtil';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/drawable-xxxhdpi/symbol_black.webp')}
      />
      <Image
        style={styles.brandText}
        source={require('../../../assets/drawable-xxxhdpi/brand_text.webp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    marginTop: 224.5 * height,
    width: 100 * width,
    height: 100 * height,
  },
  brandText: {
    marginTop: 10 * height,
    width: 106.5 * width,
    height: 33 * height,
  },
});

export default SplashScreen;
