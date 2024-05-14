import React  from 'react';
import {Alert,  Image, View, Text, StyleSheet} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker"
import {Colors} from "../../constans/colors";
import {OutlineButton} from "../ui";

const ImagePicker = ({takenImage, onTakeImage}) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    // const [pickedImage, setPickedImage] = useState('')

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
            aspect: [16, 9],
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