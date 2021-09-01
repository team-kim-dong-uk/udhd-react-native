import React, {useEffect, useRef} from 'react';
import {BackHandler, Dimensions, Modal, Platform, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const userAgent = `userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'`;
const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
const LoginWebviewModal = (props) => {
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();
  const webview = useRef(null);

  const _handleMessage = async event => {
    const data = JSON.parse(event.nativeEvent.data);
    props.closeSocialModal(data);
  };

  // 소셜로그인 진행중에 종료했었다면 중단 지점부터 다시 시작
  useEffect(() => {
    if (auth.data) {
      navigation.navigate('PersonalInfo');
    }
  }, [auth]);


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
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      style={styles.container}
    >
      <WebView
        ref={webview}
        originWhitelist={['*']}
        source={{uri: props.source}}
        userAgent={userAgent}
        useWebKit={true}
        javaScriptEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={_handleMessage}
        style={styles.webview}
      />
    </Modal>
      
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
