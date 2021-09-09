import React from 'react';
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

const App = () => {
  const dispatch = useDispatch();
  const {auth, isSearching} = useSelector(state => state);

    const finishSearch = () => {
        if(isSearching.data){
            dispatch(finishSearching())
            console.log("detect bach press and finish searching")
            return true;
        }
        return false;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', finishSearch);
    }, []);

  return (
      auth.data && auth.data.nickname && auth.data.group ? (
      <SafeAreaView style={styles.container}>
          <NavigationContainer>
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
