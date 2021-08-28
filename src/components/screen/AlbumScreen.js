import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import { SafeAreaView } from 'react-native-safe-area-context';

const AlbumScreen = () => {
  const auth = useSelector(state => state.auth);
  console.log(auth);
  return (
    <SafeAreaView>
      <View>
        <UdhdHeader/>
        <PhotoGrid/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default AlbumScreen;
