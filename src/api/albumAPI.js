import client from './client';
export const getAlbum = ({photoId}) => {
    let query = `photos/${photoId}`
    return client.get(query);
}

export const addToAlbum = ({userId, photoId, findAfter}) => {
    return client.post(`/users/${userId}/album`, {photoId: photoId});
}
