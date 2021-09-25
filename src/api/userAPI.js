import client from './client';

export const getUser = (userId) => {
    return client.get(`users/${userId}`);
}

