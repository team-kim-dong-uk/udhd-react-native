import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    auth.data && auth.data.nickname && auth.data.group ? (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Album" component={AlbumScreen} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="MyPage" component={MyPageScreen} />
          </Tab.Navigator>
      </NavigationContainer>
      ) : !auth.data ? <SocialLoginScreen/>
        : !auth.data.nickname ? <PersonalInfoScreen />
        : <GroupSelectScreen />
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
