import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from "react-native";
import {OutlineButton} from "../ui";
import {Colors} from "../../constans/colors";

import {getCurrentPositionAsync, requestForegroundPermissionsAsync, PermissionStatus} from 'expo-location';
import {getMapPreview} from "../../util/location";
import {useNavigation, useRoute, useIsFocused} from "@react-navigation/native";

const LocationPicker = ({pickLocation, onPickLocation}) => {
    // const [pickedLocation, setPickedLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const verifyPermissions = async () => {
        let {status} = await requestForegroundPermissionsAsync();
        if (status !== PermissionStatus.GRANTED) {
            setErrorMsg('Permission to access location was denied');
            return false;
        }
        return true
    }

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions()
        if (!hasPermissions) return;
        let location = await getCurrentPositionAsync({});
        // setPickedLocation({lat: location.coords.latitude, lng: location.coords.longitude});
        onPickLocation({lat: location.coords.latitude, lng: location.coords.longitude})
    }
    const pickOnMapHandler = () => {
        navigation.navigate('Map')
    }

    useEffect(() => {

        if(route.params && isFocused){
            const mapPickedLocation = route.params.pickedLocation;
            onPickLocation({lat: mapPickedLocation.latitude, lng: mapPickedLocation.longitude})
        }
    }, [isFocused]);

    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (pickedLocation) {
    //     text = process.env.GOOGLE_MAPS_API_KEY;
    // }

    let locationPreview = pickLocation ?
        <Image
            style={styles.mapPreviewImage}
            source={{uri: getMapPreview(pickLocation.lat, pickLocation.lng)}}
        /> :
        <Text>No location picked yet</Text>

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlineButton icon='location' onPress={getLocationHandler}>Locate User</OutlineButton>
                <OutlineButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlineButton>
            </View>
        </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary100,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%',
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

    }
})