import React, {useCallback, useEffect, useRef, useState} from "react";
import {Platform, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addToAlbum, removeFromAlbum, updateAlbumTags} from "../core/redux/album";
import ModalTemplate from "./ModalTemplate";
import Tag from "./Tag";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import {colors, fonts, height, width} from "../util/StyleUtil";
import ShareIcon from '../../assets/share-icon.svg';
import DownloadIcon from '../../assets/download-icon.svg';
import HeartIcon from '../../assets/heart-icon.svg';
import HeartIconFilled from '../../assets/heart-icon-filled.svg';
import ThreeDotsIcon from '../../assets/three-dots.svg';
import ToastUtil from "../util/ToastUtil";
import useInput from "../hooks/useInput";
import CancelIcon from "../../assets/cancel-icon-round.svg";

const options = {
    mimeType: 'image/jpeg',
    dialogTitle: 'Share the image',
    UTI: 'image/jpeg',
};

const PhotoInformation = ({style, tags, isLoading, photoSimpleInfo}) => {
    const {auth, photo} = useSelector(state => state);
    const dispatch  = useDispatch();
    const inputRef = useRef();

    const [showSetting, setShowSetting] = useState(false);
    const [inAlbum, setInAlbum] = useState(photoSimpleInfo?.albumId ? true : false);

    const [editTag, setEditTag] = useState(false);
    const [inputTag, onChangeInputTag, setInputTag] = useInput('');

    const [updateTags, setUpdateTags] = useState([]);

    const onPressSetting = useCallback(() => {
        setShowSetting((prev) => !prev);
    }, []);

    const startEditTag = useCallback( () => {
        setEditTag((prev) => !prev);
        setShowSetting(false);
    }, [])

    useEffect(() => {
        if (photoSimpleInfo?.albumId)
            setInAlbum(photo.data?.photoId && !photo.data?.inAlbum ? false : true);
        else
            setInAlbum(photo.data?.photoId && photo.data?.inAlbum ? true : false);
    }, [photo])

    useEffect(() => {
        setUpdateTags(tags);
    }, [tags])

    const onClearInput = () => {
        inputRef.current.clear();
        inputRef.current.blur();
    }

    const submitTag = () => {
        dispatch(updateAlbumTags.request({
            userId: auth.data?.userId,
            albumId: photoSimpleInfo?.albumId,
            tags: updateTags
        }))
        setEditTag(false);
    }

    const insertUpdateTag = () => {
        const keyword = inputTag.replace(/\s/g, "");
        if(keyword !== '' && !updateTags.map(tag => tag).includes(keyword)) {
            setUpdateTags(updateTags => [ ...updateTags, keyword]);
            setInputTag("");
        }  else if (keyword === ''){
            ToastUtil.info('공백을 입력할 수 없습니다.');
            setInputTag("");
            return false;
        } else {
            ToastUtil.info('이미 존재하는 태그입니다.');
            return false;
        }
        ToastUtil.info('update 실행됐댕');
    };

    const updateAlbum = useCallback(() => {
        if (inAlbum){
            dispatch(removeFromAlbum.request({
                userId: auth.data.userId,
                albumId: photoSimpleInfo?.albumId
            }))
        } else {
            dispatch(addToAlbum.request({
                userId: auth.data.userId,
                photoId: photoSimpleInfo?.photoId
            }))
        }
        setInAlbum(prev => !prev);
    }, [inAlbum])

    const download = async () => {
        const perm = await MediaLibrary.requestPermissionsAsync();
        if (perm.status != 'granted') {
            return;
        }
        let fileUri = FileSystem.cacheDirectory + `${photoSimpleInfo?.photoId}.jpg`
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
                    ToastUtil.success('다운로드 성공!');
                } catch (e) {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e);
            });

    }
    const onShare = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            ToastUtil.error('공유가 불가능합니다.');
            return;
        }
        let fileUri = FileSystem.cacheDirectory + `${photoSimpleInfo?.photoId}.jpg`
        await FileSystem.downloadAsync(photo.data?.originalLink, fileUri);
        await Sharing.shareAsync(fileUri).then(() => {
                ToastUtil.success('공유 완료!');
        }).catch((e)=> {
            console.log(e);
            ToastUtil.error('다시 시도해주세요 :(');
        })

    };

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
                    <Pressable style={styles.button} onPress={updateAlbum}>
                        {!inAlbum && <HeartIcon
                                            width={25 * width}
                                            height={25 * height}
                                            viewBox='0 0 25 25'
                                        />}
                        {inAlbum && <HeartIconFilled
                                            width={25 * width}
                                            height={25 * height}
                                            viewBox='0 0 25 25'
                                        />}
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
                <View style={styles.tagTitleLine}>
                    <Text style={styles.tagTitle}>태그 {editTag && "수정"}</Text>
                    {editTag &&
                        <Pressable onPress={submitTag}>
                            <Text style={styles.tagTitle}>완료</Text>
                        </Pressable>
                    }
                </View>
                {!editTag && (
                    <View style={styles.tagBox}>
                        {!isLoading && tags?.map((tag) => {
                            return (<Tag key={tag} text={tag} onLongPress={startEditTag}/>)
                        })}
                    </View>
                )}
                {editTag && (
                    <View style={styles.tagBox}>
                        <View style={styles.newInputTag}>
                            <TextInput
                                style={{marginRight: 5}}
                                placeholder="새로운 태그를 입력하세요!"
                                onChangeText={onChangeInputTag}
                                value={inputTag}
                                onSubmitEditing={insertUpdateTag}
                                selectionColor={colors.black}
                                ref={inputRef}
                            />
                            <Pressable style={styles.cancelIcon} onPress={onClearInput}>
                                <CancelIcon
                                    width={10 * width}
                                    height={10 * height}
                                    viewBox='0 0 60 60'
                                />
                            </Pressable>
                        </View>

                        {!isLoading && updateTags?.map((tag) => {
                            return (
                                <Tag key={tag} text={tag}/>
                            )
                        })}
                    </View>
                )}


            </View>
            {showSetting && (
                <ModalTemplate style={{backgroundColor:  'rgba(0, 0, 0, 0.5)'}} show={showSetting} onControlModal={onPressSetting}>
                    <View style={styles.modal}>
                        {photoSimpleInfo?.albumId &&
                            (<Pressable style={[{borderTopLeftRadius: 5, borderTopRightRadius: 5,borderBottomWidth: 0.2,}, styles.settingBox]}
                                        onPress={startEditTag}
                            >
                                <Text style={styles.text}>태그 수정</Text>
                            </Pressable>)
                        }
                        {photoSimpleInfo?.albumId &&
                            (<Pressable style={styles.settingBox}>
                                <Text style={styles.text}>앨범에서 삭제</Text>
                            </Pressable>
                            )
                        }
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
    tagTitleLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    },
    newInputTag: {
        marginRight: 5 * width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8 * width,
        paddingRight: 5 * width,
        borderRadius: 5 * width,
        borderStyle: "solid",
        borderWidth: 1 * width,
        borderColor: colors.grey,
        height: 24 * height,
        marginBottom: 5 * height,
    },

});

