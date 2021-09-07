import client from './client';

export const getTags = ({userId, keyword}) => {
    let query = `users/${userId}/search/tags/recommended?keyword=`
    if(keyword){
        query += `${keyword}`
    }
    console.log(query);
    return client.get(query);
}


