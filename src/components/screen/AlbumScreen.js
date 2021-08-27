import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";

const AlbumScreen = () => {
  const auth = useSelector(state => state.auth);
  console.log(auth);
  return (
      <View>
        <UdhdHeader/>
        <PhotoGrid/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlbumScreen;
