import client from './client';
import * as SecureStore from 'expo-secure-store';

export const refreshToken = async () => {
    const token = await SecureStore.getItemAsync('refreshToken');
    if (!token) {
        throw {
            response: {
                status: 401
            }
        }
    }
    return client.post('/auth/refresh-token', {refreshToken: token});
}

export const setNickname = async ({userId, nickname}) => {
    return client.put(`/users/${userId}/nickname`, {nickname});
}

export const setGroup = async ({userId, group}) => {
    return client.put(`/users/${userId}/group`, {group});
}
