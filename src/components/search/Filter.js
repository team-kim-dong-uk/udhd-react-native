import React from 'react';
import { Pressable } from 'react-native';
import {
    StyleSheet,
    Text,
} from 'react-native';
import ModalTemplate from '../ModalTemplate';


const Filter = ({showFilter, onPressFilter}) => {
  return (
    <ModalTemplate style={styles.filter} show={showFilter} onControlModal={onPressFilter}>
        <Pressable onPress={()=>{console.log("make function here")}}><Text style={styles.eachMenu}>hi?</Text></Pressable>
        <Pressable><Text style={styles.eachMenu}>hi!</Text></Pressable>
        <Pressable><Text style={styles.eachMenu}>Insert Here!</Text></Pressable>
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
}
});

export default Filter;
