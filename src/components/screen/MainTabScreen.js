import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PhotoScreen from './PhotoScreen';
import AlbumScreen from "./AlbumScreen";
import AlbumStackScreen from "./AlbumStackScreen";
import MyPageScreen from "./MyPageScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchStackScreen from "./SearchStackScreen";

const Tab = createBottomTabNavigator();
const MainTabScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Album"
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
export default MainTabScreen;
