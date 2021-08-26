// import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';

import App from './src/App';
import configureStore from './src/core/config/configureStore';

const store = configureStore();

const RNReduxApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
registerRootComponent(RNReduxApp);
