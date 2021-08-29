import React, {useCallback, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SearchBox from "../SearchBox";
import Filter from "../Filter";

// TODO 업로드 버튼
// TODO 이퀄라이저? 필터 버튼 만들기

const UdhdHeader = () => {
    const [showFilter, setShowFilter] = useState(false);

    const onPressFilter = useCallback((e) => {
        setShowFilter((prev) => !prev);
        console.log("press filter");
    }, []);

  return (
    <View style={styles.headerContainer}>
        <Image style={styles.tinyLogo}
               source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
        <SearchBox/>
        <View style={styles.upperTap}>
            <View>
                <TouchableOpacity activeOpacity = { 0.5 } onPress={onPressFilter}>
                    <Image style={styles.upperIcon}
                           source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
                </TouchableOpacity>
                {showFilter && (
                    <Filter show={showFilter} onControlModal={onPressFilter}>
                        <Pressable onPress={()=>{console.log("make function here")}}><Text style={styles.eachMenu}>hi?</Text></Pressable>
                        <Pressable><Text style={styles.eachMenu}>hi!</Text></Pressable>
                        <Pressable><Text style={styles.eachMenu}>Insert Here!</Text></Pressable>
                    </Filter>
                )}
            </View>
            <TouchableOpacity activeOpacity = { 0.5 } onPress={() => {Alert.alert("navigate to upload page")}}>
            <Image style={styles.upperIcon}
                   source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
            </TouchableOpacity>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      height: '8%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    upperTap: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
    },
    tinyLogo:{
      width: 50,
      height: 50,
      marginLeft: 20,
    },
    upperIcon: {
        width: 50,
        height: 50,
    },
    searchBox: {
        width: 100,
    },
    eachMenu:{
        width: '100%',
        height: 30
    }

});

export default UdhdHeader;
