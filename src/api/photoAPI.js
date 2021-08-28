import client from './client';

export const getPhoto = (photoId) => {
    return client.get(`photos/${photoId}`); 
}

export const getPhotos = ({userId, findAfter}) => {
    let query = `users/${userId}/search?tags=오마이걸`;
    if (findAfter) {
        query += `&findAfter=${findAfter}`;
    }
    console.log(client.defaults.baseURL);
    console.log(query);
    return client.get(query);
}
