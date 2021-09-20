import client from './client';

export const getPhoto = (photoId) => {
    return client.get(`photos/${photoId}`);
}

export const getSearchPhotos = ({userId, tags, findAfter}) => {
    let query = `users/${userId}/search?tags=`;
    if (tags) {
        query += tags.toString();
    }
    if (findAfter) {
        query += `&findAfter=${findAfter}`;
    }
    return client.get(query);
}

export const getAlbumPhotos = ({userId, tags, findAfter}) => {
    let query = `users/${userId}/album?tags=`;
    if (tags) {
        query += tags.toString() + '아';
    }
    if (findAfter) {
        query += `&findAfter=${findAfter}`;
    }
    return client.get(query);
}

export const getUploadPhotos = ({userId, tags, findAfter}) => {
    let query = `users/${userId}/search?tags=`;
    if (tags) {
        query += tags.toString();
    }
    if (findAfter) {
        query += `&findAfter=${findAfter}`;
    }
    return client.get(query);
}

