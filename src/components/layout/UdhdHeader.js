import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PhotoGrid from '../PhotoGrid';
import {SearchIcon} from "native-base";

const UdhdHeader = () => {
  return (
    <View style={styles.headerContainer}>
        <Image style={styles.tinyLogo}
               source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
        {/*TODO Search Box*/}
        <View style={styles.upperTap}>
            <Image style={styles.upperIcon}
                   source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
            <Image style={styles.upperIcon}
                   source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
      width: '100%',
        height: '8%', /*이거 고정값으로 바꾸고 싶은데 뭔지 모르겠음*/
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    upperTap: {
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
    }

});

export default UdhdHeader;
