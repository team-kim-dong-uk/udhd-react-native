import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import { SafeAreaView } from 'react-native-safe-area-context';

const AlbumScreen = () => {
  return (
      <View>
        <UdhdHeader type='album'/>
        <PhotoGrid type='album'/>
      </View>
  );
}

const styles = StyleSheet.create({
});

export default AlbumScreen;
