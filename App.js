import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AllPlaces, AddPlace, Map, PlaceDetails} from "./screens";
import IconButton from "./components/ui/IconButton";
import {Colors} from "./constans/colors";
import {useEffect} from "react";
import {initializeDatabase} from "./util/datebase";
import * as SplashScreen from 'expo-splash-screen';
// import {useWindowDimensions} from "react-native";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const App = () => {
    // const {height, width} = useWindowDimensions();
    useEffect(() => {
        const initializeApp = async () => {
            try {
                await SplashScreen.preventAutoHideAsync(); // Keep splash screen visible
                await initializeDatabase(); // Initialize the database
            } catch (error) {
                console.error('Initialization error:', error);
            } finally {
                await SplashScreen.hideAsync(); // Hide the splash screen after initialization
            }
        };

        initializeApp();
    }, []); // Run only once on mount
    return (<>
            <StatusBar style='dark'/>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: {backgroundColor: Colors.primary500},
                    headerTintColor: Colors.gray700,
                    contentStyle: {backgroundColor: Colors.gray700}
                }}>
                    <Stack.Screen
                        name='AllPlaces'
                        component={AllPlaces}
                        options={({navigation})=>({
                            title: 'Your Favorite Places',
                        headerRight: ({tintColor})=>
                            <IconButton
                                icon="add"
                                size={24}
                                color={tintColor}
                                onPress={()=>navigation.navigate('AddPlace')}
                            />
                    })}/>
                    <Stack.Screen
                        name='AddPlace'
                        component={AddPlace}
                        // options={{
                        //     title: "Add a new Place",
                        // }}
                    />
                    <Stack.Screen
                    name='PlaceDetails'
                    component={PlaceDetails}
                    options={{
                        title: "Loading Place...",
                    }}
                />
                    <Stack.Screen
                        name='Map'
                        component={Map}
                        options={{
                            title: "Map",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
export default App


