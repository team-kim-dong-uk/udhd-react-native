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
import { colors, fonts, height, width } from "../util/StyleUtil";
import ShareIcon from '../../assets/share-icon.svg';
import DownloadIcon from '../../assets/download-icon.svg';
import HeartIcon from '../../assets/heart-icon.svg';
import ThreeDotsIcon from '../../assets/three-dots.svg';

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
                    <View style={styles.profileImage}/>
                    <Text style={styles.uploaderName}>{photo.data?.uploaderNickname}</Text>
                </View>
                <View style={styles.functionBox}>
                    <Pressable style={styles.button} onPress={onShare}>
                        <ShareIcon
                            width={25 * width}
                            height={25 * height}
                            viewBox='0 0 100 100'
                            fill={colors.black}
                        />
                    </Pressable>
                    {Platform.OS !== 'ios' &&
                        <Pressable style={styles.button} onPress={download}>
                            <DownloadIcon
                                width={25 * width}
                                height={25 * height}
                                viewBox='0 0 100 100'
                                fill={colors.black}
                            />
                        </Pressable>
                    }
                    <Pressable style={styles.button} onPress={addToByAlbum}>
                        {!addRequest && <HeartIcon
                                            width={25 * width}
                                            height={25 * height}
                                            viewBox='0 0 100 100'
                                            fill={colors.black}
                                        />}
                        {addRequest && <Text>하투</Text>}

                    </Pressable>
                    <Pressable style={styles.button} onPress={onPressSetting}>
                        <ThreeDotsIcon
                            width={25 * width}
                            height={25 * height}
                            viewBox='0 0 100 100'
                            fill={colors.black}
                        />
                    </Pressable>

                </View>

            </View>
            <View style={styles.tagContainer}>
                <Text style={styles.tagTitle}>태그</Text>
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
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    information: {
        width: 330 * width,
        height: 70 * height,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    uploaderBox:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    profileImage: {
        width: 40 * width,
        height: 40 * height,
        backgroundColor: colors.grey,
        borderRadius: 20 * width,
    },
    uploaderName:{
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 14 * width,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 22 * height,
        letterSpacing: 0,
        textAlign: "left",
        color: colors.black,
        marginLeft: 10 * width,
    },
    functionBox:{
        height: 25 * height,
        width: 145 * width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagContainer:{
        width: 330 * width,
        height: 145 * height,
    },
    tagTitle: {
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 14 * width,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: -0.35 * width,
        textAlign: "left",
        color: colors.black,
        marginTop: 20 * height,
    },
    tagBox:{
        width: '100%',
        marginTop: 10 * height,
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
        flexDirection: 'row',
        alignItems: 'center',
    }
});

