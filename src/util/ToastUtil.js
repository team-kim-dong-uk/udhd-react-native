import React from "react";
import Toast from 'react-native-toast-message';


export default class ToastUtil {
    static error(msg) {
        return Toast.show({
            type: 'error',
            position: 'bottom',
            text1: msg,
            visibilityTime: 1000,
            autoHide: true,
        })
    }
    static success(msg) {
        return Toast.show({
            type: 'success',
            position: 'bottom',
            text1: msg,
            visibilityTime: 1000,
            autoHide: true,
        })
    }
    static info(msg) {
        return Toast.show({
            type: 'info',
            position: 'bottom',
            text1: msg,
            visibilityTime: 1000,
            autoHide: true,
        })
    }

}

// ToastUtil.error(msg)
