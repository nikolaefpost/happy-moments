import React, {useEffect, useState} from 'react';
import { Alert} from "react-native";
import PlaceList from "../components/places/PlaceList";
import {useIsFocused} from "@react-navigation/native";
import {fetchPlaces} from "../util/datebase";
import * as SplashScreen from 'expo-splash-screen';

const AllPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const isFocused = useIsFocused();

    const deleteLocalPlace = (id) => {
        setLoadedPlaces(pre=> pre.filter(place=>place.id !== id))
    }

    useEffect(() => {
        const loadPlaces = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                const places = await fetchPlaces(); // Fetch places securely
                setLoadedPlaces(places); // Update state with fetched places
            } catch (error) {
                Alert.alert('Error fetching places:', error); // Log errors
                // Optionally, you could alert the user about the error
            }finally {
                await SplashScreen.hideAsync();
            }
        };

        if (isFocused) { // Only load places when the screen is focused
            loadPlaces();
        }

    }, [isFocused]);


    return (
        <PlaceList places={loadedPlaces} deleteLocalPlace={deleteLocalPlace}/>
    );
};

export default AllPlaces;