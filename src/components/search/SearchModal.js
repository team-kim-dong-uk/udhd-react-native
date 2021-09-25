import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text, ToastAndroid,
    View
} from 'react-native';
import SearchBox from "./SearchBox";
import ModalTemplate from "../ModalTemplate";
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import { getSearchPhotos} from "../../core/redux/photos";
import Tag from "./SelectedTag";
import { useNavigation } from '@react-navigation/native';
import {finishSearching, startSearching} from "../../core/redux/searching";
import RecommendTag from "./RecommendTag";
import { colors, fonts, height, width } from '../../util/StyleUtil';
import BackButton from '../../../assets/back-button.svg';
import { getTags } from '../../core/redux/tags';
import { TextInput } from 'react-native';
import CancelIcon from '../../../assets/cancel-icon-round.svg';

const SearchModal = () => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const { auth, photos, tags, isSearching } = useSelector(state => state);

    const [keyword, onChangeKeyword, setKeyword] = useInput('');
    const [recommendedTags, setRecommendedTags] = useState([]);
    const [searchTags, setSearchTags] = useState(tags.selected);
    const [searchType, setSearchType] = useState('TAG');

    const startSearch = () => {dispatch(startSearching());}
    const finishSearch = () => {dispatch(finishSearching());}

    const onRemoveTag = useCallback((itemToRemove) => {
      setSearchTags([...searchTags.filter(item => !(itemToRemove.keyword === item.keyword && itemToRemove.type === item.type))])
    }, [searchTags]);

    const onClearInput = () => {
      inputRef.current.clear();
      inputRef.current.blur();
    }

    /*
    * 1. duplicated
    * 2. blank
    * */
    const addSearchTag = ({type, keyword}) => {
      keyword = keyword.replace(/\s/g, "");
        console.log("try to make tag :" + keyword)
        if(keyword !== '' && !searchTags.includes(keyword)) {
           setSearchTags(searchTags => [
                ...searchTags,
                { type, keyword }
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
    }, [keyword, searchTags]);

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
                // addSearchTag(keyword);//TODO:
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
      console.log(item);
        return (
        <RecommendTag item={item} onSelectTag={addSearchTag}/>
        )
    };

  return (
    <ModalTemplate
      style={styles.container}
      show={isSearching.data}
      onControlModal={finishSearch}
      onShow={()=>{inputRef.current.focus()}}
    >
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>finishSearch()}>
            <BackButton
              width={10 * width}
              height={20 * height}
              viewBox='0 0 40 80'
            />
          </Pressable>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              placeholder="검색어를 입력해주세요"
              onChangeText={onChangeKeyword}
              value={keyword}
              onFocus={startSearch}
              onSubmitEditing={onSubmit}
              selectionColor={colors.black}
              ref={inputRef}
            />
            <Pressable style={styles.cancelIcon} onPress={onClearInput}>
              <CancelIcon
                width={15 * width}
                height={15 * height}
                viewBox='0 0 60 60'
              />
            </Pressable>
          </View>
          <Pressable onPress={onSubmit} >
            <Text style={styles.finishSearchBtn}>완료</Text>
          </Pressable>
        </View>
        <View style={styles.tagBox}>
          {searchTags.map(({type, keyword}) => {
              return <Tag key={keyword} text={keyword} type={type} onRemoveTag={onRemoveTag}/>
          })}
        </View>
        <View style={styles.searchTypeContainer}>
          <Pressable
            onPress={()=>setSearchType('TAG')}
            style={[styles.searchTypeOption, searchType === 'TAG' ? styles.searchTypeOptionActive : null ]}
          >
            <Text style={[styles.searchTypeText, searchType === 'TAG' ? styles.searchTypeTextActive : null ]}>
              태그
            </Text>
          </Pressable>
          <Pressable
            onPress={()=>setSearchType('USER')}
            style={[styles.searchTypeOption, searchType === 'USER' ? styles.searchTypeOptionActive : null ]}
          >
            <Text style={[styles.searchTypeText, searchType === 'USER' ? styles.searchTypeTextActive : null ]}>
              업로더
            </Text>
          </Pressable>
        </View>
        <FlatList
          contentContainerStyle={styles.recommendedTagsContainer}
          data={recommendedTags.filter(item => item.type === searchType)}
          renderItem={renderItem}
          keyExtractor={item => item.keyword}
          ListFooterComponent={<View style={{height: 65}}/>}
        />
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360 * width,
    height: 640 * height,
    backgroundColor: colors.white,
    margin: 0,
    padding: 0,
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    width: 360 * width,
    height: 55 * height,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  backButton: {
    width: 10 * width,
    height: 20 * height,
    marginLeft: 15 * width,
  },
  searchBox: {
    width: 260 * width,
    height: 30 * height,
    borderRadius: 5 * width,
    backgroundColor: colors.inputGrey,
    flexDirection: 'row',
    marginLeft: 15 * width,
  },
  input: {
    width: '100%',
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 12 * width,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: colors.black,
    paddingLeft: 10 * width,
  },
  cancelIcon: {
    position: 'absolute',
    right: 10 * width,
    top: 7 * height,
  },
  finishSearchBtn: {
    width: 40 * width,
    height: 20 * height,
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
  //TODO: 태그 많아지면 가로 스크롤
  tagBox:{
    width: 360 * width,
    height: 40 * height,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10 * width,
  },
  searchTypeContainer: {
    width: 360 * width,
    height: 35 * height,
    flexDirection: 'row',
  },
  searchTypeOption: {
    width: 180 * width,
    height: 35 * height,
    backgroundColor: colors.white,
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTypeOptionActive: {
    borderBottomColor: colors.orange,
    borderBottomWidth: 2 * height,
  },
  searchTypeText: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 14 * width,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 22 * height,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.grey,
  },
  searchTypeTextActive: {
    color: colors.orange,
  },
  recommendedTagsContainer: {
    marginTop: 12.5 * height,
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
