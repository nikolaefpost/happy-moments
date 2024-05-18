import React, {useEffect} from 'react';
import { Alert} from "react-native";
import PlaceForm from "../components/places/PlaceForm";
import {insertPlace, updatePlace} from "../util/datebase";
import {Place} from "../models/place";

const AddPlace = ({ navigation, route }) => {
    const editedPlace = route.params?.place?
        route.params?.place: new Place("", "", "", null, null);
    const createPlaceHandler = async (place) => {
        try {
            if(place.id){
                await updatePlace(place);
            }else {
                await insertPlace(place);
            }


            // Navigate to "AllPlaces" with the new place data only if the insertion is successful
            navigation.navigate('AllPlaces');
        } catch (error) {
            console.error('Error inserting place:', error);
            Alert.alert('Error', 'There was an error adding the place. Please try again.'); // Provide user feedback
        }
    };

    useEffect(() => {
        navigation.setOptions({
            title: editedPlace.lat? "Edite the Place":"Add a new Place"
        })
    }, []);

    return <PlaceForm onCreatePlace={createPlaceHandler} editedPlace={editedPlace} />;
};

export default AddPlace;