import React, {useEffect, useState} from 'react';
import {Alert, Image, View, Text, StyleSheet, useWindowDimensions} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker"
import {Colors} from "../../constans/colors";
import {OutlineButton} from "../ui";


const ImagesPicker = ({takenImage, onTakeImage}) => {
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

    const selectImageHandler = async () => {
        let image = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            aspect: aspectRatio,
            quality: 1,
        });
        if (!image.canceled) {
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
            <View style={styles.buttonBlock}>
                <OutlineButton icon='camera' children="Take image" onPress={takeImageHandler}/>
                <OutlineButton icon='image-outline' children="Select image" onPress={selectImageHandler}/>
            </View>

        </View>
    );
};

export default ImagesPicker;

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
    },
    buttonBlock: {
        flexDirection: "row",
        justifyContent: "space-around"
    }


})