import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { API_URL } from '@env';
import { loginSuccess } from '../core/redux/auth';
import { useDispatch } from 'react-redux';

const userAgent = `userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'`;
const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
const LoginWebviewModal = () => {
  const dispatch = useDispatch();

  
  const _handleMessage = async event => {
    console.log(event);
    const data = JSON.parse(event.nativeEvent.data);
    dispatch(loginSuccess(data));
    // console.log(JSON.parse(event.nativeEvent.data));
    // let result = JSON.parse(event.nativeEvent.data);
    // let success = result.success;
    // if (success) {
    //   let userToken = result.userToken;gi
    //   try {
    //     await AsyncStorage.setItem('userToken', userToken);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // props.closeSocialModal();
  };

  return (
    // <Modal>
      <WebView
        originWhitelist={['*']}
        source={{ html: `
          <head>
            <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
            <style>
            button {
              width: 100%;
              height: 50;
              font-size: 20;
              margin-top: 10;
              border: 1px solid;
              border-radius: 5;
            }
            </style>
          </head>
          <body>
            <div style='width: 100%; height: 100%'>
              <div id='logo-container' style='height:60%;display:flex;flex-direction:column;justify-content:center;align-items:center'>
                <h1>로고 여기</h1>
              </div>
              <div id='button-container' style='height:40%;padding:20'>
                <button id='kakao-login' style='background-color:yellow'>
                  카카오 계정으로 로그인
                </button>
                <button id='google-login'>
                  <a href='${API_URL}/oauth2/authorization/google'>구글 계정으로 로그인
                </button>
                <button id='apple-login' style='background-color:black;color:white'>
                  애플 계정으로 로그인
                </button>
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
    // </Modal>
  );
}

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: width,
  }
});

export default LoginWebviewModal;