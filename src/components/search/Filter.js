import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ModalTemplate from '../ModalTemplate';
import {fonts, width} from "../../util/StyleUtil";
import RadioTemplate from "../RadioTemplate";
import {useDispatch} from "react-redux";
import {setSortBy} from "../../core/redux/tags";


const Filter = ({style, showFilter, onPressFilter, type}) => {
    const dispatch = useDispatch();

    const [checked, setChecked] = useState('recentStage');
    const selectSortBy = useCallback((checkedString) => {
        setChecked(checkedString);
        dispatch(setSortBy({
            type: type,
            sortBy: checkedString
        }))
    }, [checked])

  return (
    <ModalTemplate style={styles.filter} show={showFilter} onControlModal={onPressFilter}>
        <View style={style}>
            <View><Text style={styles.mainText}>정렬</Text></View>
            <View style={styles.sortContainer}>
                <RadioTemplate value="recentStage"
                               currentChecked={checked}
                               onPress={selectSortBy}
                               text="최근행사순"/>
                <RadioTemplate value="recentRegistered"
                               currentChecked={checked}
                               onPress={selectSortBy}
                               text="최근등록"/>
                <RadioTemplate value="lastView"
                               currentChecked={checked}
                               onPress={selectSortBy}
                               text="열람시간순"/>
                <RadioTemplate value="random"
                               currentChecked={checked}
                               onPress={selectSortBy}
                               text="무작위"/>
            </View>
        </View>
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
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
},
    mainText: {
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "left",
        color: "#222222",
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 16 * width,
        fontWeight: "500",
        fontStyle: "normal",
        paddingLeft: 15 * width,
    },
    sortContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        padding: 15 * width
    },
});

export default Filter;
