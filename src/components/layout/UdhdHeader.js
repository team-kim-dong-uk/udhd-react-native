import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PhotoGrid from '../PhotoGrid';


const UdhdHeader = () => {
  return (
    <View style={styles.header}>
        {/*TODO ICON*/}
        <Image
            style={styles.tinyLogo}
            source={{uri: "http://img.danawa.com/prod_img/500000/869/844/img/2844869_1.jpg?shrink=360:360&_v=20210325103140"}}/>
        <View>
            <Text style={styles.headerText}>Header~</Text>
        </View>
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
    header: {
      width: '100%',
        height: '8%', /*이거 고정값으로 바꾸고 싶은데 뭔지 모르겠음*/
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#333',
      letterSpacing: 1
    },
    tinyLogo:{
      width: 50,
      height: 50,
    }

});

export default UdhdHeader;
