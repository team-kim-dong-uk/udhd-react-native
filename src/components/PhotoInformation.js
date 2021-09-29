import React, {useCallback, useState} from "react";
import {
    Image, Platform,
    Pressable,
    StyleSheet, Text, ToastAndroid,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addToAlbum} from "../core/redux/album";
import ModalTemplate from "./ModalTemplate";
import Tag from "./Tag";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const options = {
    mimeType: 'image/jpeg',
    dialogTitle: 'Share the image',
    UTI: 'image/jpeg',
};

const PhotoInformation = ({style, tags, isLoading}) => {
    const {auth, photo} = useSelector(state => state);
    const dispatch  = useDispatch();

    const [showSetting, setShowSetting] = useState(false);
    const [addRequest, setAddRequest] = useState(false);

    const onPressSetting = useCallback(() => {
        setShowSetting((prev) => !prev);
    }, []);

    const addToByAlbum = useCallback(() => {
        setAddRequest(true);
        dispatch(addToAlbum.request({
            userId: auth.data.userId,
            photoId: photo.data?.photoId
        }))
    }, [addRequest])

    const download = async () => {
        const perm = await MediaLibrary.requestPermissionsAsync();
        if (perm.status != 'granted') {
            return;
        }
        let fileUri = FileSystem.cacheDirectory + `${photo.data?.photoId}.jpg`
        FileSystem.downloadAsync(photo.data?.originalLink, fileUri, options)
            .then(async (target)=>{
                try {
                    const album = await MediaLibrary.getAlbumAsync('UDHD');
                    const asset = await MediaLibrary.createAssetAsync(fileUri);
                    if (album == null) {
                        await MediaLibrary.createAlbumAsync('UDHD', asset, false);
                    } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    }
                    ToastAndroid.show('Pictures/UDHD 에 저장 완료!', ToastAndroid.SHORT);
                } catch (e) {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e);
            });

    }

    const onShare = () => {
        let fileUri = FileSystem.cacheDirectory + `${photo.data?.photoId}.jpg`
        FileSystem.downloadAsync(photo.data?.originalLink, fileUri)
            .then(()=>{
                Sharing.shareAsync(fileUri, options)
                    .then(()=>{
                        ToastAndroid.show('공유 완료!', ToastAndroid.SHORT);
                    })
                    .catch((e) => {
                        console.log(e);
                        ToastAndroid.show('다시 시도해주세요 :(', ToastAndroid.SHORT);
                    });
            })
            .catch((e) => {
                console.log(e);
                ToastAndroid.show('다시 시도해주세요 :(', ToastAndroid.SHORT);
            });

    }

    return (
        <View style={styles.container}>
            <View style={styles.information}>
                <View style={styles.uploaderBox}>
                    <Image style={styles.profileImage}
                           source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
                    <Text style={styles.uploaderName}>{photo.data?.uploaderNickname}</Text>
                </View>
                <View style={styles.functionBox}>
                    <Pressable style={styles.button} onPress={onShare}>
                        <Text>공유</Text>
                    </Pressable>
                    {Platform.OS !== 'ios' &&
                        <Pressable style={styles.button} onPress={download}>
                            <Text>다운</Text>
                        </Pressable>
                    }
                    <Pressable style={styles.button} onPress={addToByAlbum}>
                        {!addRequest && <Text>ㅎㅌ</Text>}
                        {addRequest && <Text>하투</Text>}

                    </Pressable>
                    <Pressable style={styles.button} onPress={onPressSetting}>
                        <Text>---</Text>
                    </Pressable>

                </View>

            </View>
            <View style={styles.tagContainer}>
                <Text>  태그</Text>
                <View style={styles.tagBox}>
                    {!isLoading && tags?.map((line) => {
                        return (
                            <View style={styles.tagLine} key={line}>
                                {line?.map((tag) => {
                                    return (<Tag key={tag} text={tag}/>)
                                })}
                            </View>
                        )
                    })}
                </View>

            </View>
            {showSetting && (
                <ModalTemplate style={{backgroundColor:  'rgba(0, 0, 0, 0.5)'}} show={showSetting} onControlModal={onPressSetting}>
                    <View style={styles.modal}>
                        <Pressable style={[{borderTopLeftRadius: 5, borderTopRightRadius: 5,borderBottomWidth: 0.2,}, styles.settingBox]}>
                            <Text style={styles.text}>태그 수정</Text>
                        </Pressable>
                        <Pressable style={styles.settingBox}>
                            <Text style={styles.text}>앨범에서 삭제</Text>
                        </Pressable>
                        <Pressable style={[{marginBottom:10, borderBottomLeftRadius: 5, borderBottomRightRadius:5,
                                            borderTopWidth: 0.2,},
                                            styles.settingBox,]}>
                            <Text style={styles.redText}>신고</Text>
                        </Pressable>

                        <Pressable style={[{borderRadius: 5,}, styles.settingBox]}
                                    onPress={onPressSetting}>
                            <Text style={styles.text}>취소</Text>
                        </Pressable>
                    </View>
                </ModalTemplate>
            )}
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
        height: '100%',
        width: '50%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tagContainer:{
        flex:2,
        height: '35%',
    },
    tagBox:{
        height: '80%',
        width: '100%',
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
    },
    modal:{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    settingBox:{
        width: '90%',
        height: 50,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.2,
    },
    text: {
        width: 100,
        height: 22.3,
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#222222"
    },
    redText: {
        width: 100,
        height: 22.3,
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#e51d1d"
    },
    tagLine: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

