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
import LoginScreen from './components/screen/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


import * as authAPI from './api/authAPI';
import SearchStackScreen from './components/screen/SearchStackScreen';
import HeaderContainer from "@react-navigation/stack/src/views/Header/HeaderContainer";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import AlbumStackScreen from "./components/screen/AlbumStackScreen";
// import { loginSuccess } from '../../../core/redux/auth';


const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const setUser = async () => {
    try {
      // refresh token으로 유저 정보, access token 요청
      // const tokenResponse = await authAPI.refreshToken();
      // mock data
      const tokenResponse = {data: {
        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MGUyZmVhNzRjMTdjZjUxNTJmYjViNzgiLCJleHAiOjE2Mzg1OTk4NDF9.9slnhorxY7nVWAHtxlfl90wGt1ilRqkUqJvO_NxX0ks',
        userId: '60e2fea74c17cf5152fb5b78',
      }};
      dispatch(loginSuccess(tokenResponse.data));
    } catch (e) {
      // refresh token이 잘못되어 401에러 발생시 login 페이지로 이동.
      if (e?.response?.status === 401) {
      }
    }
  };

  // useEffect(() => {
  //   if (!auth.data) {
  //     console.log(auth);
  //     setUser();
  //   }
  // }, [auth]);

  return (
    auth.data ? (
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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
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

export default App;
