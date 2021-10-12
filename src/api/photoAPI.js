import client from './client';

export const getPhoto = ({photoId, userId}) => {
    let query = `photos/${photoId}`
    if (userId)
        query += `?userId=${userId}`;

    return client.get(query);
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

const getSearchPhotos = ({userId, tags, findAfter, sortBy}) => {
    let query = `users/${userId}/search?tags=`;
    return putParams(query, {tags, findAfter, sortBy})
}

const getAlbumPhotos = ({userId, tags, findAfter, sortBy}) => {
    let query = `users/${userId}/album?tags=`;
    return putParams(query, {tags, findAfter, sortBy})
}

const putParams = (query, {tags, findAfter, sortBy}) => {
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
    if (sortBy) {
        query += `&sortBy=${sortBy}`
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

