import React, {useEffect, useState} from 'react';
import {Alert, Image, View, Text, StyleSheet, useWindowDimensions} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker"
import {Colors} from "../../constans/colors";
import {OutlineButton} from "../ui";

const ImagePicker = ({takenImage, onTakeImage}) => {
    const {height, width} = useWindowDimensions();
    const [aspectRatio, setAspectRatio] = useState([16,9])
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    useEffect(() => {
        if (width>height){
            setAspectRatio([width, height])
        }else {
            setAspectRatio([height, width])
        }

    }, [height, width]);


    const verifyPermissions = async () => {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionsResponse = await requestPermission();

            return permissionsResponse.granted
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions',
                'You need to grand camera permissions to use this app.'
            )
            return false;
        }
        return true;
    }
    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) return;
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: aspectRatio,
            quality: .5,
        });
        if (!image.canceled) {
            // setPickedImage(image.assets[0].uri);
            onTakeImage(image.assets[0].uri);
        }
    }

    let imagePreview = takenImage ?
        <Image style={styles.image} source={{uri: takenImage}}/> : <Text>No image taken yet</Text>


    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton icon='camera' children="Take image" onPress={takeImageHandler}/>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary100,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    image: {
        width: '100%',
        height: '100%'
    }


})