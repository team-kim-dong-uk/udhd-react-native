import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoGrid from '../PhotoGrid';
import UdhdHeader from "../layout/UdhdHeader";
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
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

export default SearchScreen;
