import React, {useCallback} from "react";
import {
    Image,
    Pressable,
    StyleSheet, Text,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addToAlbum} from "../core/redux/album";

const PhotoInformation = ({style, photoId}) => {
    const {auth, photo} = useSelector(state => state);
    const dispatch  = useDispatch();
    //TODO: 하트 여부는 어떻게 확인해?
    const addToByAlbum = useCallback(() => {
        dispatch(addToAlbum.request({
            userId: auth.data.userId,
            photoId: photoId
        }))
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.information}>
                <View style={styles.uploaderBox}>
                    <Image style={styles.profileImage}
                           source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
                    <Text style={styles.uploaderName}>{photo.data?.uploaderNickname}</Text>
                </View>
                <View style={styles.functionBox}>
                    <Pressable style={styles.button}>
                        <Text>공유</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text>다운</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={addToByAlbum}>
                        <Text>하트</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text>---</Text>
                    </Pressable>

                </View>

            </View>
            <View style={styles.tagBox}>
                <Text>  태그</Text>
                <Text>  태그</Text>
            </View>
        </View>
    );
};

export default PhotoInformation;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '30%',
    },
    information: {
        width: "100%",
        height: '100%',
        flex:1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    uploaderBox:{
        height: '100%',
        width: '50%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
    },
    functionBox:{
        backgroundColor: 'skyblue',
        height: '100%',
        width: '50%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tagBox:{
        flex:2,
        height: '35%',
    },
    profileImage: {
        width: 50,
        height: 50,
    },
    uploaderName:{
        marginLeft:10,
    },
    button:{
        width: 40,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    }

});

