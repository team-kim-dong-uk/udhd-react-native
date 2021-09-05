import React, {useCallback, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SearchBox from "../SearchBox";
import ModalTemplate from "../ModalTemplate";
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {getPhotos} from "../../core/redux/photos";
import Tag from "../Tag";

// TODO tag box 구현하기!

const UdhdHeader = () => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const { auth, photos, loading } = useSelector(state => state);
    const dispatch = useDispatch();
    const [showFilter, setShowFilter] = useState(false);
    const [keyword, onChangeKeyword, setKeyword] = useInput('');
    const splitKeyword = [' ', ',']
    const [searchTags, setSearchTags] = useState([]);

    const addSearchTags = (tag) => {
        tag = tag.replace(/\s/g, "");
        if(tag !== '' && !searchTags.includes(tag)) {
           setSearchTags(searchTags => [
                ...searchTags,
                tag
            ]);
        } else {
            // TODO alert?
        }
    };

    const onPressFilter = useCallback((e) => {
        setShowFilter((prev) => !prev);
    }, []);

    const onPressTag = useCallback((e) => {
        let idx = searchTags.indexOf(e);
        if(idx !== -1 ){
            searchTags.splice(searchTags.indexOf(e), 1);
            setSearchTags(searchTags);
            forceUpdate();
        }
    }, [searchTags]);

    const makeTagByKeyword = useCallback(() => {
        addSearchTags(keyword);
        setKeyword("");
    }, [keyword, searchTags]);

    const onSubmit = useCallback((e) => {
        dispatch(getPhotos.request({
            userId: auth.data?.userId,
            tags : [keyword]
        }));
        setKeyword('');
    }, [keyword, photos]);

  return (
    <View>
        <View style={styles.headerContainer}>
            <Image style={styles.tinyLogo}
                   source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
            <View style={styles.searchContainer}>
                <View style={styles.tagBox}>
                {searchTags.map((text) => {
                    return <Tag key={text} text={text} show={true} onPressTag={onPressTag}/>
                })}
                </View>
                <SearchBox keyword={keyword}
                           setKeyword={setKeyword}
                           onChangeKeyword={onChangeKeyword}
                           onSubmit={onSubmit}
                           splitKeyword={splitKeyword}
                           runByTarget={makeTagByKeyword}
                            />
            </View>
            <View style={styles.upperTap}>
                <View>
                    <TouchableOpacity activeOpacity = { 0.5 } onPress={onPressFilter}>
                        <Image style={styles.upperIcon}
                               source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
                    </TouchableOpacity>
                    {showFilter && (
                        <ModalTemplate style={styles.filter} show={showFilter} onControlModal={onPressFilter}>
                            <Pressable onPress={()=>{console.log("make function here")}}><Text style={styles.eachMenu}>hi?</Text></Pressable>
                            <Pressable><Text style={styles.eachMenu}>hi!</Text></Pressable>
                            <Pressable><Text style={styles.eachMenu}>Insert Here!</Text></Pressable>
                        </ModalTemplate>
                    )}
                </View>
                <TouchableOpacity activeOpacity = { 0.5 } onPress={() => {Alert.alert("navigate to upload page")}}>
                <Image style={styles.upperIcon}
                       source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
                </TouchableOpacity>
            </View>
        </View>
        {/*{
            <View style={styles.tagBox}>
            </View>
        }*/}

    </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      minHeight: 65,
      flexDirection: 'row',
      alignItems: 'center',
      /*justifyContent: 'space-between',*/
    },
    searchContainer: {
        flex:1,
        /*width: 170,*/
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5
    },
    tagBox:{
        /*maxWidth: '50%',*/
        flexDirection: 'row',
        alignItems: 'center',
    },
    upperTap: {
        flex:1,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
    },
    tinyLogo:{
      width: 50,
      height: 50,
      marginLeft: 10,
      /*flex:1*/
    },
    upperIcon: {
        width: 50,
        height: 50,
    },
    eachMenu:{
        width: '100%',
        height: 30
    },
    filter:{
        position: 'absolute',
        top: 35,
        right: 40,
        width: 100,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }

});

export default UdhdHeader;
