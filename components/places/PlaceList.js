import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import PlaceItem from "./PlaceItem";
import {Colors} from "../../constans/colors";
import {useNavigation} from "@react-navigation/native";

const PlaceList = ({places, deleteLocalPlace}) => {
    const navigator = useNavigation()
    const selectPlaceHandler = (id) => {
        navigator.navigate("PlaceDetails", {
            id
        })
    }




    if (!places || places.length === 0) {
        return (<View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
        </View>)
    }
    return (
        <FlatList
            style={styles.list}
            data={places}
            renderItem={({item}) => <PlaceItem  place={item} onSelect={selectPlaceHandler} deleteLocalPlace={deleteLocalPlace} />}
            keyExtractor={item => item.id}
        />
    )
};

export default PlaceList;

const styles = StyleSheet.create({
    list: {
        margin: 12
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})