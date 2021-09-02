import React, {useCallback, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SearchBox from "../SearchBox";
import ModalTemplate from "../ModalTemplate";


const UdhdHeader = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [showTagBox, setShowTagBox] = useState(false);

    const onPressFilter = useCallback((e) => {
        setShowFilter((prev) => !prev);
    }, []);

  return (
    <View style={styles.headerContainer}>
        <Image style={styles.tinyLogo}
               source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
        <SearchBox onControlModal={()=>setShowTagBox(true)}/>
        {showTagBox && (
            <View><Text>따란!</Text></View>
        )}
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

  );
}

const styles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      height: 65,
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
