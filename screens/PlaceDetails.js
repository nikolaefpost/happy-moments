import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Image, Alert} from "react-native";
import {Colors} from "../constans/colors";
import {OutlineButton} from "../components/ui";
import {fetchPlaceDetails} from "../util/datebase";
import * as SplashScreen from 'expo-splash-screen';

const PlaceDetails = ({route, navigation}) => {

    const selectedPlaceId = route.params?.id;
    const [fetchPlace, setFetchPlace] = useState({})
    console.log(fetchPlace)

    const showOnMapHandler = () => {
        navigation.navigate('Map',{
            lat: fetchPlace.lat,
            lng: fetchPlace.lng
        })
    }
    useEffect(() => {
        const loadPlace = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                const place = await fetchPlaceDetails(selectedPlaceId); // Fetch place securely
                setFetchPlace(place); // Update state with fetched place
                navigation.setOptions({
                    title: place.title
                })
            } catch (error) {
                Alert.alert('Error fetching places:', error); // Log errors
                // Optionally, you could alert the user about the error
            }finally {
                await SplashScreen.hideAsync();
            }
        };

        if (selectedPlaceId) { // Only load places when the screen is focused
            loadPlace();
        }

    }, [selectedPlaceId]);


    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Image style={styles.image} source={{uri: fetchPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchPlace.address}</Text>
                </View>

                <OutlineButton
                    icon="map"
                    onPress={showOnMapHandler}
                >View on Map</OutlineButton>
            </View>


        </ScrollView>
    );
};

export default PlaceDetails;

const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "35%",
        minHeight: 300,
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        textAlign: "center",
        color: Colors.primary500,
        fontWeight: "bold",
        fontSize: 16
    }
})