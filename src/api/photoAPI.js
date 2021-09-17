import client from './client';

export const getPhoto = (photoId) => {
    return client.get(`photos/${photoId}`);
}

export const getPhotos = ({userId, tags, findAfter}) => {
    let query = `users/${userId}/search?tags=`;
    if (tags) {
        query += tags.toString();
    }
    if (findAfter) {
        query += `&findAfter=${findAfter}`;
    }
    return client.get(query);
}

