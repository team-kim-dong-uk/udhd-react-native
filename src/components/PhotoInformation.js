import React, {useCallback, useState} from "react";
import {
    Image,
    Pressable,
    StyleSheet, Text,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addToAlbum} from "../core/redux/album";
import ModalTemplate from "./ModalTemplate";

const PhotoInformation = ({style, photoId}) => {
    const {auth, photo} = useSelector(state => state);
    const dispatch  = useDispatch();

    const [showSetting, setShowSetting] = useState(false);
    const onPressSetting = useCallback(() => {
        setShowSetting((prev) => !prev);
    }, []);

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
                    <Pressable style={styles.button} onPress={onPressSetting}>
                        <Text>---</Text>
                    </Pressable>

                </View>

            </View>
            <View style={styles.tagBox}>
                <Text>  태그</Text>
                <Text>  태그</Text>
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
});

