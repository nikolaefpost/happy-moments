import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import {IconButton} from "../ui";
import {Colors} from "../../constans/colors";
import {useNavigation} from "@react-navigation/native";


const ImageFullScreen = ({ imageUri, title, hideImageHandler }) => {
    const navigation = useNavigation()

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);



    useEffect(() => {
        navigation.setOptions({
            title
        });
    }, [title]);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = savedTranslateX.value + e.translationX / scale.value;
            translateY.value = savedTranslateY.value + e.translationY / scale.value;
        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        });


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        <GestureHandlerRootView style={styles.container}>
            <IconButton
                style={styles.exit}
                icon="arrow-undo-outline"
                size={24}
                color={Colors.primary50}
                onPress={hideImageHandler}
            />
            {imageUri ? (
                <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
                    <Animated.Image
                        style={[styles.image, animatedStyle]}
                        source={{ uri: imageUri }}
                        resizeMode="contain"
                    />
                </GestureDetector>
            ) : (
                <View style={styles.textView}>
                    <Text style={styles.text}>No image</Text>
                </View>
            )}
        </GestureHandlerRootView>
    );
};

export default ImageFullScreen;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.gray700
    },
    exit: {
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 10,
        borderRadius: 18,
        backgroundColor: Colors.gray700
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: 'white', // Optional: for better visibility
    }
});
