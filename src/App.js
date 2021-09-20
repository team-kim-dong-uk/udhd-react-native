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
import MainTabScreen from './components/screen/MainTabScreen';
import UploadSelectScreen from './components/screen/upload/UploadSelectScreen';
import GooglePickerScreen from './components/screen/upload/GooglePickerScreen';
import {finishSearching} from "./core/redux/searching";
import SettingScreen from './components/screen/SettingScreen';
import { LoginHeader } from './components/layout/LoginHeader';
import { colors } from './util/StyleUtil';
import { useFonts } from 'expo-font';
import { StackHeader } from './components/layout/StackHeader';


const App = () => {
  let [fontsLoaded] = useFonts({
    'NotoSansCJKkr': require('../assets/fonts/NotoSansCJKkr-Regular.otf'),
  });
  
  const dispatch = useDispatch();
  const {auth, isSearching} = useSelector(state => state);


    const onBackPressFromSearch = () => {
        if(isSearching.data){
            dispatch(finishSearching())
            return true;
        }   return false;
    }

    useEffect(() => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPressFromSearch);
        BackHandler.addEventListener('hardwareBackPress', onBackPressFromSearch);
    }, [isSearching]);


  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
      auth.data && auth.data.nickname && auth.data.group ? (
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={MainTabScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='UploadSelect' component={UploadSelectScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='GooglePicker' component={GooglePickerScreen} options={{ headerShown: false }}/>
                <Stack.Screen
                  name='Setting'
                  component={SettingScreen}
                  options={{
                    title: '설정',
                    header: (props) => <StackHeader {...props}/>
                  }}
                />
              </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name='SocialLogin' component={SocialLoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen
                  name='PersonalInfo'
                  component={PersonalInfoScreen}
                  options={{
                    title: '회원정보 설정',
                    order: 1,
                    header: (props) => <LoginHeader {...props}/>
                  }}
                />
                <Stack.Screen
                  name='GroupSelect'
                  component={GroupSelectScreen}
                  options={{
                    title: '선호 연예인 설정',
                    order: 2,
                    header: (props) => <LoginHeader {...props}/>
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
      </SafeAreaView>
        )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    backgroundColor: colors.white,
  },

});

export default App;
