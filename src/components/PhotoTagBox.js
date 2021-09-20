import React, {useCallback, useState} from "react";
import {
    StyleSheet, Text, ToastAndroid,
    View
} from "react-native";
import Tag from "./Tag";

const PhotoTagBox = ({style, tags}) => {
    const [extended, setExtended] = useState(false);

    const onChangeExtended = useCallback((e) => {
        setExtended((prev) => !prev);
    }, [])
    const extendedHeight = useCallback(() => {
        if(extended){
            // TODO 태그 갯수에 따라 조절할 것
            return '20%';
        } else {
            return '10%';
        }
    }, [extended])
    const extendStyle = function() {
        return {
            position: 'absolute',
            bottom: '10%',
            width: '100%',
            height: extendedHeight(),
        }
    }
    return (
        <View style={extendStyle()}>
            <View style={styles.container}>
                <View style={styles.tagList}>
                    {tags?.map((tag) => {
                        return <Tag key={tag} text={tag} />
                    })}
                </View>

                <Tag key="0" text="[업]" onPressTag={onChangeExtended} />
            </View>
        </View>
    );
};

export default PhotoTagBox;

const styles = StyleSheet.create({
    flexBox:{
        position: 'absolute',
        bottom: '10%',
        width: '100%',
        height: '10%',
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
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

