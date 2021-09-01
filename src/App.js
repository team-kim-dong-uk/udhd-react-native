import React from 'react';
import {SafeAreaViewComponent, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AlbumScreen from './components/screen/AlbumScreen';
import SearchScreen from './components/screen/SearchScreen';
import MyPageScreen from './components/screen/MyPageScreen';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLoginScreen from './components/screen/login/SocialLoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


import * as authAPI from './api/authAPI';
import SearchStackScreen from './components/screen/SearchStackScreen';
import HeaderContainer from "@react-navigation/stack/src/views/Header/HeaderContainer";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import AlbumStackScreen from "./components/screen/AlbumStackScreen";
import PersonalInfoScreen from './components/screen/login/PersonalInfoScreen';
import GroupSelectScreen from './components/screen/login/GroupSelectScreen';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
// import { loginSuccess } from '../../../core/redux/auth';


const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
      auth.data && auth.data.nickname && auth.data.group ? (
        <SafeAreaProvider>
          <NavigationContainer>
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
          </NavigationContainer>
        </SafeAreaProvider>
        ) : (
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name='SocialLogin' component={SocialLoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} options={{ title: '회원정보 설정' }}/>
                <Stack.Screen name='GroupSelect' component={GroupSelectScreen} options={{ title: '선호 연예인 설정' }}/>
              </Stack.Navigator>
            </NavigationContainer> 
      </SafeAreaView>
        )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight
  },

});

export default App;
