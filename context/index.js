import {createContext, useContext, useEffect, useState} from "react";
import {fetchPlaceDetails, fetchPlaces, initializeDatabase, insertPlace} from "../util/datebase";

export const PlacesContext = createContext({
    places: [],
    currentPlace: {},
    initializeDatabase: ()=>{},
    insertPlace: (place)=>{},
    fetchPlaces: ()=>{},
    fetchPlaceDetails: ()=>{},
})

export const PlacesContextProvider = ({children}) => {
    const [places, setPlaces] = useState([])

    const value = {

    }
    return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
}