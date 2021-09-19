import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyPageScreen from './MyPageScreen';
import SettingScreen from './SettingScreen';

const Stack = createStackNavigator();

const MyPageStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
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

export default MyPageStackScreen;
