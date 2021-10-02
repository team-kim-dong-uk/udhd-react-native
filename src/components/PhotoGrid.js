import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumPhotos, getPhotos, getSearchPhotos, getUploadPhotos } from '../core/redux/photos.js';
import { useInView } from 'react-intersection-observer';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../util/StyleUtil.js';

const PhotoGrid = ({type}) => {
    const [numCols, setColumnNo] = useState(3);
    const dispatch = useDispatch();
    const { auth, photos, loading } = useSelector(state => state);
    const navigation = useNavigation();

    const loadMorePhotos = useCallback((e) => {
        console.log("load photo :)");
    }, []);

    const data =  type === 'album' ? photos.album
        : type === 'search' ? photos.search
            :                     photos.upload;

    useEffect(() => {
        console.log(type);
        if (!data && !loading.data && !photos.error) {
            dispatch(getPhotos.request({
                type: type,
                userId: auth.data?.userId,
            }));
        }
    }, [loading.data, type]);

    const renderItem = ({ item }) => {
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight
                    style={styles.touchArea}
                    key={item.photoId}
                    onPress={() =>{
                        navigation.navigate('PhotoDetail', {
                            photoId: item.photoId,
                            image: item.thumbnailLink,
                        });
                    }}
                >
                    <Image
                        source={{uri: item.thumbnailLink}}
                        style={styles.thumbnail}
                    />
                </TouchableHighlight>
            </View>
        )
    };

    return (
        <View>
            <FlatList
                columnWrapperStyle={{justifyContent:'flex-start'}}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.albumId || item.photoId}
                numColumns={numCols}
                key={numCols}
                onEndReached={loadMorePhotos}
                onEndReachedThreshold={0.01}
                contentContainerStyle={{paddingBottom: 110* height}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    scrollBox: {
        // width: '100%',
        // height: '100%',
        width: 360 * width,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    touchArea: {
        width: 119 * width,
        height: 118 * height,
    },
});

export default PhotoGrid;
