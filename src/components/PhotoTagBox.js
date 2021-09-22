import React, {useCallback, useEffect, useState} from "react";
import {
    Dimensions,
    StyleSheet, Text, ToastAndroid,
    View
} from "react-native";
import Tag from "./Tag";

const PhotoTagBox = ({style, tags}) => {
    const [extended, setExtended] = useState(false);
    const onChangeExtended = useCallback((e) => {
        setExtended((prev) => !prev);
    }, [extended])

    const extendStyle = function() {
        if(extended){
            return {
                position: 'absolute',
                bottom: '10%',
                width: '100%',
                minHeight: '10%',
            }
        } else {
            return {
                position: 'absolute',
                bottom: '10%',
                width: '100%',
                height: '10%',
            }
        }
    };

    return (
        <View style={extendStyle()}>
            <View style={styles.container}>
                <View style={styles.tagBox}>
                    {extended && tags?.map((line) => {
                        return (
                            <View style={styles.tagLine}>
                                {line?.map((tag) => {
                                    return (<Tag key={tag} text={tag}/>
                                    )
                                })}
                            </View>
                        )
                    })}
                    {!extended && tags &&
                        <View style={styles.tagLine}>
                            {tags[0]?.map((tag)=>{
                                return (
                                    <Tag key={tag} text={tag}/>
                                )
                            })}
                        </View>
                    }
                </View>
                {tags?.length > 1 && (
                    <View style={{height:'100%', marginTop: 20}}>
                        <Tag key="0" text="[업]" onPressTag={onChangeExtended}/>
                    </View>
                )}
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
    tagBox:{
        width: '80%',
        height: '100%',
        /*flexDirection: 'row',*/
        alignItems: 'center',
    },
    tagLine: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

