import React from 'react';
import {Image, View, Text, Pressable, StyleSheet, Alert} from "react-native";
import {Colors} from "../../constans/colors";
import IconButton from "../ui/IconButton";
import {deletePlace} from "../../util/datebase";
import {useNavigation} from "@react-navigation/native";

const PlaceItem = ({place, onSelect, deleteLocalPlace}) => {
    const navigator = useNavigation()
    const editePlaceHandler = () => {
        navigator.navigate("AddPlace", {
            place
        })
    }
    const deletePlaceHandler = async () => {
        try {
            await deletePlace(place.id)
            deleteLocalPlace(place.id)
        } catch (error) {
            console.error('Error deleting place:', error);
            Alert.alert('Error', 'There was an error deleting the place. Please try again.'); // Provide user feedback
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={onSelect.bind(this, place.id)}
                style={({pressed}) => [styles.item, pressed && styles.pressed]}
            >
                <Image style={styles.image} source={{uri: place.imageUri}}/>
                <View style={styles.info}>
                    <Text style={styles.title}>{place.title}</Text>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
            </Pressable>
            <View style={styles.editBlock}>
                <IconButton
                    style={styles.delete}
                    iconAnt="edit"
                    size={24}
                    color={Colors.accent500}
                    onPress={editePlaceHandler}
                />
                <IconButton
                    style={styles.delete}
                    iconAnt="delete"
                    size={24}
                    color={Colors.waring}
                    onPress={deletePlaceHandler}
                />
            </View>
        </View>

    );
};

export default PlaceItem;

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 6,
        marginVertical: 6,
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
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 30


    },
    delete: {
        // position: "absolute",
        // top: 12,
        // right: 0,

    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: Colors.gray700,
    },
    address: {
        fontSize: 12,
        color: Colors.gray700,
    },
    editBlock: {
        position: "absolute",
        bottom: 6,
        right: 6,
        left: "33%",
        height: 44,
        // height: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 20

    }
})