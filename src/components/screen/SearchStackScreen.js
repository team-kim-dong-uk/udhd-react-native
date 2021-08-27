import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoScreen from './PhotoScreen';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="PhotoDetail" component={PhotoScreen} />
  </Stack.Navigator>
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

export default SearchStackScreen;
