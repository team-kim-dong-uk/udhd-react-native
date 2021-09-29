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
import UploadSelectScreen from './components/screen/upload/UploadSelectScreen';
import GooglePickerScreen from './components/screen/upload/GooglePickerScreen';
import {finishSearching} from "./core/redux/searching";

import SettingScreen from './components/screen/SettingScreen';
import { LoginHeader } from './components/layout/LoginHeader';
import { colors } from './util/StyleUtil';
import { useFonts } from 'expo-font';
import { StackHeader } from './components/layout/StackHeader';
import SplashScreen from './components/screen/SplashScreen';
import { GoogleDriveHeader } from './components/layout/GoogleDriveHeader';
import { UploadHeader } from './components/layout/UploadHeader';

import MainTabScreen from "./components/screen/MainTabScreen";
import PhotoScreen from "./components/screen/PhotoScreen";
import PhotoFullScreen from "./components/screen/PhotoFullScreen";


const App = () => {
    let [fontsLoaded] = useFonts({
        'NotoSansCJKkr': require('../assets/fonts/NotoSansCJKkr-Regular.otf'),
    });

    const dispatch = useDispatch();
    const {auth, searching} = useSelector(state => state);


    const onBackPressFromSearch = () => {
        if(searching.data){
            dispatch(finishSearching())
            return true;
        }   return false;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPressFromSearch);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPressFromSearch)
        }
    }, [searching]);


    if (!fontsLoaded) {
        return (
            <SplashScreen/>
        )
    }
    return (
      auth.data && auth.data.nickname && auth.data.group ? (
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={MainTabScreen} options={{ headerShown: false }}/>
                <Stack.Screen 
                  name='UploadSelect' 
                  component={UploadSelectScreen} 
                  options={{ 
                    title: '이미지 업로드',
                    header: (props) => <UploadHeader {...props}/>
                  }}
                />
                <Stack.Screen 
                  name='GooglePicker' 
                  component={GooglePickerScreen} 
                  options={{ 
                    title: '구글 드라이브',
                    header: (props) => <GoogleDriveHeader {...props}/>
                  }}
                />
                <Stack.Screen
                  name='Setting'
                  component={SettingScreen}
                  options={{
                    title: '설정',
                    header: (props) => <StackHeader {...props}/>
                  }}
                />
                <Stack.Screen 
                    name="PhotoDetail"
                    component={PhotoScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name="PhotoFull"
                    component={PhotoFullScreen}
                    options={{headerShown: false}}
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
