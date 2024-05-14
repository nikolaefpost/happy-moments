import React from 'react';
import {Text, StyleSheet, Pressable} from "react-native";
import {Colors} from "../../constans/colors";

const Button = ({onPress, children}) => {
    return (
        <Pressable
            style={({pressed})=>[styles.button, pressed && styles.pressed]}
            onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',                //IOS
        shadowOpacity: .15,                  //IOS
        shadowOffset: {width: 1, height: 1}, //IOS
        shadowRadius: 2,                     //IOS
        borderRadius: 4

    },
    pressed: {
        opacity: .7
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.primary50
    }
})