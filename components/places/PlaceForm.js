import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {Colors} from "../../constans/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import {Button} from "../ui";
import {getAddress} from "../../util/location";
import {Place} from "../../models/place";

const PlaceForm = ({onCreatePlace}) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickLocation, setPickLocation] = useState(null);
    const [takenImage, setTakenImage] = useState("");
    const [receivedAddress, setReceivedAddress] = useState("");


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
        const placeData = new Place(enteredTitle, takenImage, receivedAddress, pickLocation);
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
        <ScrollView style={styles.form}>
            <View >
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker takenImage={takenImage} onTakeImage={takeImageHandler} />
            <LocationPicker pickLocation={pickLocation} onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
};

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: "column",
        overflow: "scroll"
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