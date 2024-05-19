import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {Colors} from "../../constans/colors";
import ImagesPicker from "./ImagesPicker";
import LocationPicker from "./LocationPicker";
import {Button} from "../ui";
import {getAddress} from "../../util/location";
import {Place} from "../../models/place";

const PlaceForm = ({onCreatePlace, editedPlace}) => {
    const { title, imageUri, address, lat, lng, id } = editedPlace;
    const [enteredTitle, setEnteredTitle] = useState(title || "");
    const [pickLocation, setPickLocation] = useState({lat: lat || null, lng: lng || null});
    const [takenImage, setTakenImage] = useState(imageUri || "");
    const [receivedAddress, setReceivedAddress] = useState(address || "");
    const [updateId] = useState(id || null);


    const changeTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText)
    }

    const takeImageHandler =useCallback((imageUri) => {
        setTakenImage(imageUri)
    },[])

    const pickLocationHandler = useCallback((location) => {
        setPickLocation(location)
    },[])
    const savePlaceHandler =  () => {
        const placeData = new Place(enteredTitle, takenImage, receivedAddress, pickLocation.lat, pickLocation.lng, updateId);
        onCreatePlace(placeData)
    }

    useEffect(() => {
        const fetchAddress = async () => {
            if (pickLocation?.lat) {
                const formattedAddress = await getAddress(pickLocation.lat, pickLocation.lng);
                setReceivedAddress(formattedAddress);
            }
        };
        fetchAddress();
    }, [pickLocation]); // only depends on pickLocation


    return (
        <ScrollView contentContainerStyle={styles.form}>
            <View >
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagesPicker takenImage={takenImage} onTakeImage={takeImageHandler} />
            <LocationPicker pickLocation={pickLocation} onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
};

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        borderRadius: 4,
        backgroundColor: Colors.primary100

    }
})