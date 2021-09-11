import React from "react";
import {
    Pressable,
    StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";

const RecommendTag = ({item, onPress}) => {

    return (
        <Pressable activeOpacity = { 0.5 } style={{backgroundColor:"red"}}
                          onPress={() => onPress(item.keyword)}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    {item.type === "TAG" && (<Text>TAG</Text>)}
                    {item.type === "USER" && (<Text>PROFILE</Text>)}
                </View>
                <View style={styles.itemData}>
                    <Text>{item.keyword}</Text>
                    <Text>{item.count}개의 짤</Text>
                </View>
            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    icon: {
        backgroundColor: "gray",
        margin:5,
        padding: 5
    },
    itemData: {
        flex:1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight : 10,
    }
})
export default RecommendTag;
