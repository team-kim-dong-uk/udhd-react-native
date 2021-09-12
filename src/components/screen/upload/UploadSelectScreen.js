import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { Button } from 'react-native';

const UploadSelectScreen = () => {
  const navigation = useNavigation();
  const upload = useSelector(state => state.upload);

  const openGoogleDrive = () => {
    navigation.navigate('GooglePicker');
  }

  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
            <TouchableHighlight>
              <Image source={{uri: item.thumbnailLink}} style={styles.image}></Image>
            </TouchableHighlight>
        </View>
    )
  };

  return (
     <View>
       <Button title='upload from gallery'></Button>
       <Button title='upload from google drive' onPress={openGoogleDrive}></Button>
       <FlatList
          data={upload.data}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={item => item.id}
        />
     </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  }
});

export default UploadSelectScreen;
