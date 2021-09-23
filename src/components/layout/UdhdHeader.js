import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert, BackHandler,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text, ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import SearchBox from "../SearchBox";
import ModalTemplate from "../ModalTemplate";
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {getPhotos} from "../../core/redux/photos";
import Tag from "../Tag";
import {getTags} from "../../core/redux/tags";
import {finishSearching, startSearching} from "../../core/redux/searching";
import RecommendTag from "../RecommendTag";
import {deleteSearchTags, setSearchTags} from "../../core/redux/searchTags";

const UdhdHeader = () => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const dispatch = useDispatch();
    const { auth, photos, tags, searching, searchTags } = useSelector(state => state);

    const [showFilter, setShowFilter] = useState(false);

    const [keyword, onChangeKeyword, setKeyword] = useInput('');
    const [recommendedTags, setRecommendedTags] = useState([]);

    const onPressFilter = useCallback((e) => {
        setShowFilter((prev) => !prev);
    }, []);

    const onPressTag = useCallback((e) => {
        console.log("onPressTag e :" +e)
        dispatch(deleteSearchTags({tag: e}));
        forceUpdate();

    }, [searchTags, keyword]);

    /*
    * 1. duplicated
    * 2. blank
    * */
    const addSearchTags = useCallback((tagKeyword) => {
        tagKeyword = tagKeyword.replace(/\s/g, "");

        if(tagKeyword !== '' && !searchTags.data.includes(tagKeyword)) {
            dispatch(setSearchTags({tag: tagKeyword}));
            setKeyword("");

        } else if (tagKeyword === ''){
            ToastAndroid.show('공백을 입력할 수 없습니다.', ToastAndroid.SHORT);
            setKeyword("");
            return false;
        } else {
            ToastAndroid.show('이미 선택한 태그입니다.', ToastAndroid.SHORT);
            return false;
        }

    }, [searchTags])

    const onSubmit = useCallback((e) => {
        if(searchTags.data.length === 0){
            ToastAndroid.show('검색에 사용될 태그가 없어요!', ToastAndroid.SHORT);
            return false;
        }
        dispatch(getPhotos.request({
            userId: auth.data?.userId,
            tags : searchTags.data
        }));
        console.log("searchTags at submit  : " + searchTags)
        setKeyword('');
        dispatch(finishSearching());
    }, [keyword, photos]);

    // when keyword is being changed, state must be searching
    const detectSearching = useCallback(() => {
        if(!searching.data){
            dispatch(startSearching());
        }
    }, [keyword])


    // when detect changing on keyword,
    useEffect(() => {
        if(keyword !== ''){
            // if keyword have ' ' , -> divide into tag.
            if (keyword.includes(" ") || keyword.includes(",")){
                addSearchTags(keyword);
            } else {
                //set recommended tags by using keyword, if keyword !== ''
                setRecommendedTags(tags.data.filter((tag) => {return tag.keyword.includes(keyword);}))
            }
        } else {
            // when keyword == empty
            setRecommendedTags([]);
        }
    }, [keyword]);


    //fetch tags at loading this component
    useEffect(() => {
        if (tags.data.length == 0) {
            dispatch(getTags.request({userId: auth.data?.userId}));
        }
    }, [])

    // rendering text on FlatList that show recommended tags
    const renderItem = ({ item }) => {
        return (
            <RecommendTag item={item} onPress={addSearchTags}/>
        )
    };

  return (
    <View>
        <View style={styles.headerContainer}>
            {!searching.data && (<Image style={styles.tinyLogo}
                   source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
            )}
            <View style={styles.searchContainer}>
                {searching.data &&
                    (<Pressable onPress={()=>dispatch(finishSearching())}>
                        <View>
                            <Text>[뒤로]</Text>
                        </View>
                    </Pressable>)
                }
                <View style={styles.tagBox}>
                {searchTags.data.map((item) => {
                    return <Tag key={item} text={item} onPressTag={onPressTag}/>
                })}
                </View>
                    <SearchBox keyword={keyword}
                               onChangeKeyword={onChangeKeyword}
                               onChange={detectSearching}
                               onSubmit={onSubmit}
                               onFocus={()=>dispatch(startSearching())}
                                />
                {searching.data &&
                    (<Pressable onPress={onSubmit}>
                        <View>
                            <Text>[검색]</Text>
                        </View>
                    </Pressable>)
                }
            </View>
            {!searching.data && (
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
            )}
        </View>
        {
            (searching.data &&
            <FlatList
                data={recommendedTags}
                renderItem={renderItem}
                keyExtractor={item => item.keyword}
                ListFooterComponent={<View style={{height: 65}}/>}
            />
            )
        }

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
