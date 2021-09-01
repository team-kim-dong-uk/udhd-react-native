import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
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
import PersonalInfoScreen from './components/screen/login/PersonalInfoScreen';
import GroupSelectScreen from './components/screen/login/GroupSelectScreen';
// import { loginSuccess } from '../../../core/redux/auth';


const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      {
        auth.data && auth.data.nickname && auth.data.group ? (
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name='Album' component={AlbumScreen} />
              <Tab.Screen name='Search' component={SearchStackScreen} />
              <Tab.Screen name='MyPage' component={MyPageScreen} />
            </Tab.Navigator>
        </NavigationContainer>
        ) : (
         <NavigationContainer>
           <Stack.Navigator>
             <Stack.Screen name='SocialLogin' component={SocialLoginScreen} options={{ headerShown: false }}/>
             <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} options={{ title: '회원정보 설정' }}/>
             <Stack.Screen name='GroupSelect' component={GroupSelectScreen} options={{ title: '선호 연예인 설정' }}/>
           </Stack.Navigator>
         </NavigationContainer> 
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight
  },

});

export default App;
