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
