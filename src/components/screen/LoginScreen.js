import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../core/redux/auth';
import LoginWebviewModal from '../LoginWebviewModal';

const LoginScreen = () => {
  const dispatch = useDispatch();
  
  const mockLogin = () => {
    const tokenResponse = {data: {
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MGUyZmVhNzRjMTdjZjUxNTJmYjViNzgiLCJleHAiOjE2Mzg1OTk4NDF9.9slnhorxY7nVWAHtxlfl90wGt1ilRqkUqJvO_NxX0ks',
      userId: '60e2fea74c17cf5152fb5b78',
    }};
    dispatch(loginSuccess(tokenResponse.data));
  }
  return (
    <View style={styles.container}>
      <Button
        title='동진으로 로그인'
        onPress={mockLogin}
      />
      <LoginWebviewModal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: 100,
    height: 100,
  }
});

export default LoginScreen;
