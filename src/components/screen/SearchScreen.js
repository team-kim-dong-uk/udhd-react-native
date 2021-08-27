import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoGrid from '../PhotoGrid';

const SearchScreen = () => {
  return (
    <View>
      <Text>SearchScreen</Text>
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
