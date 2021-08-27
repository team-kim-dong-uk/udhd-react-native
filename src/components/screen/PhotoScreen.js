import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../../core/redux/photo';

const PhotoScreen = ({route}) => {
  console.log(route);
  // const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getPhoto.request(route.params.photoId));
  //   }, [dispatch]);
  //   const photo = useSelector(state => state.photo);

  return (
    <View>
      <Text>PhotoScreen with {route.params.photoId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhotoScreen;
