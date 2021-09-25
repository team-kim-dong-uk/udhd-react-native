import client from './client';

export const getPhoto = (photoId) => {
    return client.get(`photos/${photoId}`);
}

export const getPhotos = (params) => {
    switch (params.type) {
        case 'search':
            return getSearchPhotos(params);
        case 'album':
            return getAlbumPhotos(params);
        case 'upload':
            return getUploadPhotos(params);
    }
}

const getSearchPhotos = ({userId, tags, findAfter}) => {
    let query = `users/${userId}/search?tags=`;
    if (tags) {
        const uploaderSearch = tags.filter(item => item.type === 'USER');
        tags = tags.filter(item => item.type === 'TAG').map(item => item.keyword);
        query += tags.toString();
        if (uploaderSearch.length > 0) {
            query += `&uploaderId=${uploaderSearch[0].userId}`
        }
        if (findAfter) {
            query += `&findAfter=${findAfter}`;
        }
    }
    return client.get(query);
}

const getAlbumPhotos = ({userId, tags, findAfter}) => {
    let query = `users/${userId}/album?tags=`;
    if (tags) {
        const uploaderSearch = tags.filter(item => item.type === 'USER');
        tags = tags.filter(item => item.type === 'TAG').map(item => item.keyword);
            query += tags.toString();
            if (uploaderSearch.length > 0) {
                query += `&uploaderId=${uploaderSearch[0].userId}`
        }
        if (findAfter) {
            query += `&findAfter=${findAfter}`;
        }
    }
    return client.get(query);
}

const getUploadPhotos = ({userId, findAfter}) => {
    let query = `users/${userId}/uploaded`;
    if (findAfter) {
        query += `findAfter=${findAfter}`;
    }
    return client.get(query);
}

