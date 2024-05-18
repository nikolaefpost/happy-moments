const GOOGLE_MAPS_API_KEY = 'AIzaSyA6Pg8vx2ODvhMZuLVGh9-k2pB7urCI68g'
export const getMapPreview = (lat, lng) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}
  &zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}
  &key=${GOOGLE_MAPS_API_KEY}`
}

export const getAddress = async (lat, lng) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    )

    if (!response.ok){
        throw new Error('Failed to fetch address!')
    }

    const data = await response.json();
    return  data.results[0].formatted_address
}