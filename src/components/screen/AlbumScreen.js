import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const AlbumScreen = () => {
  const auth = useSelector(state => state.auth);
  console.log(auth);
  return (
    <View>
      <Text>AlbumScreen</Text>
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
