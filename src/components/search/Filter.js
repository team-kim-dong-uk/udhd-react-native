import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {
    StyleSheet,
    Text,
} from 'react-native';
import ModalTemplate from '../ModalTemplate';
import {colors, fonts, height, width} from "../../util/StyleUtil";
import { RadioButton } from 'react-native-paper';
import RadioTemplate from "../RadioTemplate";


const Filter = ({style, showFilter, onPressFilter}) => {
    const [checked, setChecked] = useState('recent-stage');

  return (
    <ModalTemplate style={styles.filter} show={showFilter} onControlModal={onPressFilter}>
        <View style={style}>
            <View><Text style={styles.mainText}>정렬</Text></View>
            <View style={styles.sortContainer}>
                <RadioTemplate value="recent-stage"
                               currentChecked={checked}
                               onPress={setChecked}
                               text="최근행사순"/>
                <RadioTemplate value="recent-registered"
                               currentChecked={checked}
                               onPress={setChecked}
                               text="최근등록"/>
                <RadioTemplate value="last-view"
                               currentChecked={checked}
                               onPress={setChecked}
                               text="열람시간순"/>
                <RadioTemplate value="random"
                               currentChecked={checked}
                               onPress={setChecked}
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
        fontSize: 14 * width,
        fontWeight: "500",
        fontStyle: "normal",
        paddingLeft: 15 * width,
    },
    sortContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    sortBox: {
      flexDirection: 'row',
      width: '50%',
      paddingLeft: 15 * width,
    }
});

export default Filter;
