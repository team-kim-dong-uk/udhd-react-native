import React, {useCallback} from 'react';
import {BackHandler, SafeAreaViewComponent, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyPageScreen from './components/screen/MyPageScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLoginScreen from './components/screen/login/SocialLoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import SearchStackScreen from './components/screen/SearchStackScreen';
import AlbumStackScreen from "./components/screen/AlbumStackScreen";
import PersonalInfoScreen from './components/screen/login/PersonalInfoScreen';
import GroupSelectScreen from './components/screen/login/GroupSelectScreen';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import {finishSearching} from "./core/redux/searching";
import MainTabScreen from "./components/screen/MainTabScreen";
import PhotoScreen from "./components/screen/PhotoScreen";

const App = () => {
  const dispatch = useDispatch();
  const {auth, searching} = useSelector(state => state);

    const onBackPressFromSearch = () => {
        if(searching.data){
            dispatch(finishSearching())
            return true;
        }   return false;
    }

    useEffect(() => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPressFromSearch);
        BackHandler.addEventListener('hardwareBackPress', onBackPressFromSearch);
    }, [searching]);

  return (
      auth.data && auth.data.nickname && auth.data.group ? (
      <SafeAreaView style={styles.container}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name='MainTab' component={MainTabScreen} options={{ headerShown: false }}/>
                  <Stack.Screen name="PhotoDetail"
                                component={PhotoScreen}
                                options={{headerShown: false}}/>
              </Stack.Navigator>
          </NavigationContainer>
      </SafeAreaView>
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
