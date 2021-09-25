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
import SearchBox from "./SearchBox";
import ModalTemplate from "../ModalTemplate";
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import { getSearchPhotos} from "../../core/redux/photos";
import Tag from "../Tag";
import {getTags} from "../../core/redux/tags";
import { useNavigation } from '@react-navigation/native';
import {finishSearching, startSearching} from "../../core/redux/searching";
import RecommendTag from "../RecommendTag";
import { colors, fonts, height, width } from '../../util/StyleUtil';
import BackButton from '../../../assets/back-button.svg';

const SearchModal = () => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const dispatch = useDispatch();
    const { auth, photos, tags, isSearching } = useSelector(state => state);

    const [showFilter, setShowFilter] = useState(false);

    const navigation = useNavigation();

    const [keyword, onChangeKeyword, setKeyword] = useInput('');
    const [recommendedTags, setRecommendedTags] = useState([]);
    const [searchTags, setSearchTags] = useState([]);

    const startSearch = () => {dispatch(startSearching());}
    const finishSearch = () => {dispatch(finishSearching());}

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
    }, [searchTags, keyword]);

    /*
    * 1. duplicated
    * 2. blank
    * */
    const addSearchTags = (tag) => {
        tag = tag.replace(/\s/g, "");
        console.log("try to make tag :" + tag)
        if(tag !== '' && !searchTags.includes(tag)) {
           setSearchTags(searchTags => [
                ...searchTags,
                tag
            ]);
           setKeyword("");
        } else if (tag === ''){
            ToastAndroid.show('공백을 입력할 수 없습니다.', ToastAndroid.SHORT);
            setKeyword("");
            return false;
        } else {
            ToastAndroid.show('이미 선택한 태그입니다.', ToastAndroid.SHORT);
            return false;
        }
    };

    const onSubmit = useCallback((e) => {
        if(searchTags.length === 0){
            ToastAndroid.show('검색에 사용될 태그가 없어요!', ToastAndroid.SHORT);
            return false;
        }
        dispatch(getSearchPhotos.request({
            userId: auth.data?.userId,
            tags : searchTags
        }));
        console.log("searchTags at submit  : " + searchTags)
        setKeyword('');
        finishSearch();
    }, [keyword, photos]);

    // when keyword is being changed, state must be searching
    const detectSearching = useCallback(() => {
        if(!isSearching.data){
            startSearch();
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => {}}>
          <BackButton
            width={10 * width}
            height={20 * height}
            viewBox='0 0 40 80'
          />
        </Pressable>
        <SearchBox
          keyword={keyword}
          onChangeKeyword={onChangeKeyword}
          onChange={detectSearching}
          onSubmit={onSubmit}
          onFocus={startSearch}
          style={styles.searchBox}
        />
        <Pressable onPress={()=>{}}>
          <Text style={styles.finishSearchBtn}>완료</Text>
        </Pressable>
      </View>
        {/* <View style={styles.headerContainer}>
           
                <View style={styles.tagBox}>
                {searchTags.map((text) => {
                    return <Tag key={text} text={text} onPressTag={onPressTag}/>
                })}
                </View>
                    <SearchBox keyword={keyword}
                               onChangeKeyword={onChangeKeyword}
                               onChange={detectSearching}
                               onSubmit={onSubmit}
                               onFocus={startSearch}
                                />
                {isSearching.data &&
                    (<Pressable onPress={onSubmit}>
                        <View>
                            <Text>[검색]</Text>
                        </View>
                    </Pressable>)
                }
            </View>
            {!isSearching.data && (
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
                <TouchableOpacity activeOpacity = { 0.5 } onPress={() => {navigation.navigate('UploadSelect')}}>
                <Image style={styles.upperIcon}
                       source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
                </TouchableOpacity>
            </View>
            )}
        </View>
        {
            (isSearching.data &&
            <FlatList
                data={recommendedTags}
                renderItem={renderItem}
                keyExtractor={item => item.keyword}
                ListFooterComponent={<View style={{height: 65}}/>}
            />
            )
        } */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360 * width,
    height: 640 * height,
    backgroundColor: colors.grey,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
  headerContainer: {
    width: 360 * width,
    height: 55 * height,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  backButton: {
    marginLeft: 15 * width,
  },
  searchBox: {
    marginLeft: 15 * width,
  },
  finishSearchBtn: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 14 * width,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 22 * height,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.darkBlue,
    marginLeft: 15 * width,
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
      width: 30 * width,
      height: 30 * height,
      marginLeft: 15 * width,
      //
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

export default SearchModal;
