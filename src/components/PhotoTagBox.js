import React from "react";
import {
    StyleSheet, Text,
    View
} from "react-native";
import Tag from "./Tag";

const PhotoTagBox = ({style, tags}) => {

    return (
        <View style={styles.container}>
            <View style={styles.tagList}>
                {tags?.map((tag) => {
                    return <Tag key={tag} text={tag} />
                })}
            </View>

            <Tag key="0" text="[업]" />
        </View>
    );
};

export default PhotoTagBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        width: '100%',
        height: '10%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tagList:{
        flexDirection: 'row',
        alignItems: 'center',
    }
});

