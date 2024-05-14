import React from 'react';
import {Pressable, Text, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons"
import {Colors} from "../../constans/colors";

const OutlineButton = ({onPress, icon, children}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed})=>[styles.button, pressed && styles.pressed]}
        >
            <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500}/>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default OutlineButton;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary500,
        borderRadius: 4
    },
    pressed:{
        opacity: .7
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary500
    }
})