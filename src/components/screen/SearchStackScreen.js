import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoScreen from './PhotoScreen';
import SearchScreen from './SearchScreen';
import UdhdHeader from "../layout/UdhdHeader";

const Stack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchMain"
                    component={SearchScreen}
                    options={{headerShown: false}}/>
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
