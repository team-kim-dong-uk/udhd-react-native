import React, {useCallback, useEffect, useState} from "react";
import {
    Dimensions,
    StyleSheet, Text, ToastAndroid,
    View
} from "react-native";
import Tag from "./Tag";

const PhotoTagBox = ({style, tags}) => {
    const [extended, setExtended] = useState(false);
    const [tagLines, setTagLines] = useState([]);

    const [tempSize, setTempSize] = useState(0);

    const windowWidth = Dimensions.get('window').width;
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
    const getTagSize = (text) => {
        const space = 11;
        const textSize = 12;
        return 2*space + textSize*text.length;
    }

    // TODO 얘가 component 보다 로딩이 늦음
    useEffect(() => {
        const tagBoxSize = windowWidth * 0.8;
        let resultLines = [];
        let line = [];
        let sumSize = 0;
        tags?.map((tag) => {
            sumSize += getTagSize(tag);
            if(sumSize <= tagBoxSize){
                line.push(tag);
            } else {
                resultLines.push(line);
                line = [tag];
                sumSize = getTagSize(tag);
            }
        })
        resultLines.push(line);
        setTagLines(resultLines);
    }, [])

    return (
        <View style={extendStyle()}>
            <View style={styles.container}>
                <View style={styles.tagBox}>
                    {extended && tagLines?.map((line) => {
                        return (
                            <View style={styles.tagLine}>
                                {line?.map((tag) => {
                                    return (<Tag key={tag} text={tag}/>
                                    )
                                })}
                            </View>
                        )
                    })}
                    {!extended && <View style={styles.tagLine}>
                        {tagLines[0].map((tag)=>{
                            return (
                                <Tag key={tag} text={tag}/>
                            )
                        })}
                    </View>
                    }
                </View>
                {tagLines?.length > 1 && (
                    <Tag key="0" text="[업]" onPressTag={onChangeExtended} />
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

