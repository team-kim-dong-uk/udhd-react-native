import React from 'react';

import { Image, StyleSheet } from 'react-native';


const Thumbnail = ({ children, ...props }) => {

  return (
      <Image
        source={{uri: props.thumbnailLink}}
        style={styles.thumbnail}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '200',
    height: '200',
  },
});

export default Thumbnail;