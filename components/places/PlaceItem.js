import React from 'react';
import {Image, View, Text, Pressable, StyleSheet} from "react-native";
import {Colors} from "../../constans/colors";

const PlaceItem = ({place, onSelect}) => {


    return (
        <Pressable
            onPress={onSelect.bind(this, place.id)}
            style={({pressed})=>[styles.item, pressed && styles.pressed]}
        >
            <Image  style={styles.image} source={{uri: place.imageUri}}/>
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    );
};

export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',                //IOS
        shadowOpacity: .15,                  //IOS
        shadowOffset: {width: 1, height: 1}, //IOS
        shadowRadius: 2,                     //IOS

    },
    pressed: {
        opacity: .9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: Colors.gray700,
    },
    address: {
        fontSize: 12,
        color: Colors.gray700,
    }
})