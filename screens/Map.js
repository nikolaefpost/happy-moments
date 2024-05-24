import React, {useCallback,  useLayoutEffect, useState} from 'react';
import { StyleSheet, Alert} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import {IconButton} from "../components/ui";


const Map = ({navigation, route}) => {
    const currentLat = route.params?.lat
    const currentLng = route.params?.lng
    const userLat = route.params?.userLat
    const userLng = route.params?.userLng

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: currentLat,
        longitude: currentLng,
    })
    const region = {
        latitude: userLat ?? currentLat ?? 46.97517,
        longitude: userLng ?? currentLng ?? 31.99455,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const selectLocationHandler = (event) => {
        if (!currentLat || !currentLng) {
            const lat = event.nativeEvent.coordinate.latitude;
            const lng = event.nativeEvent.coordinate.longitude;
            setSelectedLocation({
                latitude: lat,
                longitude: lng,
            })
        }
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation.latitude) {
            Alert.alert(
                'No location picked!',
                'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }
        navigation.navigate('AddPlace', {
            pickedLocation: selectedLocation
        })
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        if (!currentLat || !currentLng) {
            navigation.setOptions({
                headerRight: ({tintColor}) => <IconButton
                    icon='save'
                    size={24}
                    color={tintColor}
                    onPress={savePickedLocationHandler}
                />
            })
        }

    }, [navigation, savePickedLocationHandler, currentLng, currentLat]);

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}
        >
            {selectedLocation.latitude && <Marker coordinate={selectedLocation}
                                                  title="Picted location"
            />}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})