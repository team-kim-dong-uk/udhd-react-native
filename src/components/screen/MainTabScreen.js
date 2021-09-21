import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchStackScreen from './SearchStackScreen';
import AlbumStackScreen from "./AlbumStackScreen";
import MyPageScreen from './MyPageScreen';
import { colors, height, width } from '../../util/StyleUtil';
import SearchIcon from '../../../assets/search-icon.svg';
import SearchIconActive from '../../../assets/search-icon-active.svg';
import AlbumIcon from '../../../assets/album-icon.svg';
import AlbumIconActive from '../../../assets/album-icon-active.svg';

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60 * height,
          width: 360 * width,
          backgroundColor: colors.white,
        },
      }}
    >
      <Tab.Screen
        name="Album!"
        component={AlbumStackScreen}
        options={{
          tabBarIcon: ({focused}) => focused 
          ? <AlbumIconActive width={25 * width}
              height={25 * height}
              viewBox='0 0 100 100'
            />
          : <AlbumIcon width={25 * width}
              height={25 * height}
              viewBox='0 0 100 100'
            />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({focused}) => focused 
          ? <SearchIconActive width={25 * width}
              height={25 * height}
              viewBox='0 0 100 100'
            />
          : <SearchIcon width={25 * width}
              height={25 * height}
              viewBox='0 0 100 100'
            />,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
      />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
});

export default MainTabScreen;
