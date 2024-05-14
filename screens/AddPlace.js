import React from 'react';
import { Alert} from "react-native";
import PlaceForm from "../components/places/PlaceForm";
import {insertPlace} from "../util/datebase";

const AddPlace = ({ navigation }) => {
    const createPlaceHandler = async (place) => {
        try {
             await insertPlace(place);
            // Navigate to "AllPlaces" with the new place data only if the insertion is successful
            navigation.navigate('AllPlaces');
        } catch (error) {
            console.error('Error inserting place:', error);
            Alert.alert('Error', 'There was an error adding the place. Please try again.'); // Provide user feedback
        }
    };

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;