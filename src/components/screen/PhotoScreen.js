import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Dimensions } from 'react-native';

const PhotoScreen = ({route}) => {
  console.log(route);

  return (
    <View style={styles.container}>
      {/*<View stlye={styles.photoContainer}>*/}
      {/*TODO 누르면 뒤로가기*/}
      <Pressable>
        <Image
            source={{uri: route.params.image}}
            style={styles.photoContainer}
        />
      </Pressable>
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  photoContainer: {
    backgroundColor: "gray",
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  photo: {
    width: '100',
    height: '100',
  },

});

export default PhotoScreen;
