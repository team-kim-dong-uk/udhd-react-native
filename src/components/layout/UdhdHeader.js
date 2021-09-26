import React, {useCallback, useEffect, useState} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {startSearching} from "../../core/redux/searching";
import { colors, fonts, height, width } from '../../util/StyleUtil';
import FilterIcon from '../../../assets/filter-icon.svg';
import Filter from '../search/Filter';
import SearchModal from '../search/SearchModal';
import SearchBoxTag from '../search/SearchBoxTag';
import { useNavigation } from '@react-navigation/native';

const UdhdHeader = ({type}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {tags, isSearching } = useSelector(state => state);
    const selectedTags = type === 'album' ? tags.selectedAlbumTags : tags.selectedSearchTags;
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const startSearch = () => {
        dispatch(startSearching());
        setShowSearchModal(true);
    }

    const onPressFilter = useCallback((e) => {
        setShowFilter((prev) => !prev);
    }, []);

    const onPressUpload = () => {
        navigation.navigate('UploadSelect');
    }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/drawable-hdpi/symbol_black.webp')}
        />
        <TouchableOpacity style={styles.searchBox} onPress={startSearch}>
            {
                selectedTags.length === 0
                    ? <Text style={styles.searchBoxText}>검색어를 입력해주세요</Text>
                    : selectedTags.map((item) => <SearchBoxTag key={item.keyword} {...item}/>)
            }
        </TouchableOpacity>
        {isSearching.data && <SearchModal type={type} show={showSearchModal} setShow={setShowSearchModal}/>}
        <TouchableOpacity onPress={onPressFilter} style={styles.filterIcon}>
          <FilterIcon
            width={24 * width}
            height={24 * height}
            viewBox='0 0 96 96'
            />
        </TouchableOpacity>
        <Filter
            showFilter={showFilter}
            onPressFilter={onPressFilter}
        />
        <TouchableOpacity onPress={onPressUpload} style={styles.uploadIcon}>
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
