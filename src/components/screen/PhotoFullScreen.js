import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const PhotoScreen = ({route, navigation}) => {

  return (
      <View>
          <Pressable onPress={() => navigation.goBack()}>
              <Image
                  source={{uri: route.params.image}}
                  style={styles.photo}
              />
          </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    width: '100%',
    height: '100%',
  },
    photo: {
        backgroundColor: "black",
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default PhotoScreen;
