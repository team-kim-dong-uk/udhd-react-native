import client from './client';
export const getAlbum = ({photoId}) => {
    let query = `photos/${photoId}`
    return client.get(query);
}

export const addToAlbum = ({userId, photoId, findAfter}) => {
    return client.post(`/users/${userId}/album`, {photoId: photoId});
}

export const removeFromAlbum = ({userId, albumId}) => {
    return client.delete(`/users/${userId}/album/${albumId}`);
}

export const updateAlbumTags = ({userId, albumId, tags}) => {
    let query = `/users/${userId}/album/${albumId}/tags`;
    return client.patch(query, {tags : tags})
}
