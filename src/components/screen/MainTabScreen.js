import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchStackScreen from './SearchStackScreen';
import AlbumStackScreen from "./AlbumStackScreen";
import MyPageScreen from './MyPageScreen';

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Album!"
                      component={AlbumStackScreen}
                      options={{headerShown: false}}
                      />
          <Tab.Screen name="Search"
                      component={SearchStackScreen}
                      options={{headerShown: false}}/>
          <Tab.Screen name="MyPage" component={MyPageScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
});

export default MainTabScreen;
