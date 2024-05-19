import React from 'react';
import {Pressable, StyleSheet} from "react-native";
import {Ionicons, AntDesign} from "@expo/vector-icons"

const IconButton = ({icon, iconAnt, size, color, onPress, style}) => {
    return (
        <Pressable
            style={({pressed})=>[style, styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            {icon &&<Ionicons name={icon} size={size} color={color}/>}
            {iconAnt && <AntDesign name={iconAnt} size={size} color={color}/>}
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        // margin: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    pressed: {
        opacity: .7
    }
})