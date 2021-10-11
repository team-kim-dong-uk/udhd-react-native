import React, {useCallback, useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, height, width } from '../util/StyleUtil.js';
import NoImageIcon from '../../assets/no-image-icon.svg';
import { UIButton } from './common/UIButton.js';

const NoAlbumResults = () => {
    const navigation = useNavigation();

    const addImage = () => {
      navigation.navigate('UploadSelect');
    }
    const scrapImage = () => {
      navigation.navigate('Search');
    }
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <NoImageIcon width={50 * width} height={50 * height} viewBox='0 0 200 200'/>
          <Text style={styles.text}>등록된 사진이 없어요. 지금 등록해보세요.</Text>
          <UIButton style={[styles.button, styles.addButton]} textStyle={styles.buttonText} title='이미지 등록' onPress={addImage}/>
          <UIButton style={[styles.button, styles.scrapButton]} textStyle={styles.buttonText} title='스크랩하러가기' onPress={scrapImage}/>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.lightGrey,
    },
    contentContainer: {
      alignItems: 'center',
      marginTop: 100 * height,
    },
    text: {
      marginTop: 10 * height, 
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 15 * width,
      fontWeight: "500",
      fontStyle: "normal",
      lineHeight: 24 * height,
      letterSpacing: 0,
      textAlign: "center",
      color: colors.black,
    },
    button: {
      width: 140 * width,
      height: 35 * height,
      borderRadius: 5 * width,
      borderWidth: 0,
    },
    addButton: {
      backgroundColor: colors.orange,
      marginTop: 30 * height,
    },
    scrapButton: {
      backgroundColor: colors.black,
      marginTop: 10 * height,
    },
    buttonText: {
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 14 * width,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white,
    }
});

export default NoAlbumResults;
 