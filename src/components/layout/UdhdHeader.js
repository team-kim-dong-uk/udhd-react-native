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
import SearchBox from "../search/SearchBox";
import ModalTemplate from "../ModalTemplate";
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import { getSearchPhotos} from "../../core/redux/photos";
import Tag from "../search/Tag";
import {getTags} from "../../core/redux/tags";
import { useNavigation } from '@react-navigation/native';
import {finishSearching, startSearching} from "../../core/redux/searching";
import RecommendTag from "../RecommendTag";
import { colors, fonts, height, width } from '../../util/StyleUtil';
import FilterIcon from '../../../assets/filter-icon.svg';
import Filter from '../search/Filter';
import SearchModal from '../search/SearchModal';
import { Modal } from 'react-native';

const UdhdHeader = () => {
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
    <View>
      <View style={styles.headerContainer}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/drawable-xxxhdpi/symbol_black.webp')}
        />
        <TouchableOpacity style={styles.searchBox} onPress={startSearch}>
          <Text style={styles.searchBoxText}>검색어를 입력해주세요</Text>
        </TouchableOpacity>
        {isSearching.data && <SearchModal/>}
        <TouchableOpacity onPress={onPressFilter} style={styles.filterIcon}>
          <FilterIcon
            width={24 * width}
            height={24 * height}
            viewBox='0 0 96 96'
            />
        </TouchableOpacity>
        {showFilter && (
            <Filter
              showFilter={showFilter}
              onPressFilter={onPressFilter}
            />
        )}
        <TouchableOpacity onPress={()=>{}} style={styles.uploadIcon}>
          <Text style={{fontSize: 30 * width}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: 360 * width,
        height: 55 * height,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    tinyLogo:{
      width: 30 * width,
      height: 30 * height,
      marginLeft: 15 * width,
    },
    searchBox: {
        width: 202 * width,
        height: 30 * height,
        borderRadius: 5 * width,
        backgroundColor: colors.inputGrey,
        marginLeft: 15 * width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBoxText: {
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 11 * width,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.placeholderGrey,
        marginLeft: 8 * width,
    },
    filterIcon: {
      marginLeft: 20 * width,
    },
    uploadIcon: {
      marginLeft: 15 * width,
    },

});

export default UdhdHeader;
