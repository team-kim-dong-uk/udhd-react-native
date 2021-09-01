import React, {useEffect, useRef} from 'react';
import {BackHandler, Dimensions, Platform, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import { API_URL } from '@env';
import { loginSuccess } from '../../../core/redux/auth';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const userAgent = `userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'`;
const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
const LoginWebviewModal = () => {
  const dispatch = useDispatch();
  const webview = useRef(null);

  const _handleMessage = async event => {
    const data = JSON.parse(event.nativeEvent.data);
    dispatch(loginSuccess(data));
  };


  const onAndroidBackPress = ()=> {
    if (webview.current) {
      webview.current.goBack();
      return true; // 앱 종료 방지
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []); // 다시 적용되는 것 방지

  return (
      <WebView
        ref={webview}
        originWhitelist={['*']}
        source={{ html: `
          <head>
            <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
            <style>
            a {
              color: black;
              text-decoration: none;
              text-align: center;
              width: 90%;
              padding: 10;
              font-size: 20;
              border: 1px solid black;
              border-collapse: separate; 
              border-radius: 5;
            }
            </style>
          </head>
          <body>
            <div style='width: 100%; height: 100%'>
              <div id='logo-container' style='height:60%;display:flex;flex-direction:column;justify-content:center;align-items:center'>
                <h1>로고 여기</h1>
              </div>
              <div id='button-container' style='height:35%;display:flex;flex-direction:column;justify-content:space-around;align-items:center'>
                <a href='${API_URL}/oauth2/authorization/kakao' style='background-color:yellow'>
                  카카오 계정으로 로그인
                </a>
                <a href='${API_URL}/oauth2/authorization/google'>
                  구글 계정으로 로그인
                </a>
                <a href='${API_URL}/oauth2/authorization/apple' style='background-color:black; color:white${Platform.OS === 'android' ? ';display:none':''}'>
                  애플 계정으로 로그인
                </a>
              </div>
            </div>
          </body>
          ` }}
        userAgent={userAgent}
        useWebKit={true}
        javaScriptEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={_handleMessage}
        style={styles.webview}
      />
  );
}

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    width: width,
  }
});

export default LoginWebviewModal;
