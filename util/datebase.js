import * as SQLite from 'expo-sqlite';

// Function to initialize the database and create a "places" table if it doesn't exist
export const initializeDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('places.db'); // Open or create database

    // Transaction to create the "places" table if it doesn't exist
    await db.runAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )
  `);

    return db; // Return the database instance for further use
};

export const insertPlace = async (place) => {
    const db = await SQLite.openDatabaseAsync('places.db');
    await db.runAsync(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
    );
};

export const fetchPlaces = async () => {
    const db = await SQLite.openDatabaseAsync('places.db');
    return await db.getAllAsync('SELECT * FROM places');
}

export const fetchPlaceDetails = async (id) => {
    const db = await SQLite.openDatabaseAsync('places.db');
    const query = 'SELECT * FROM places WHERE id = ?'; // Select the row based on ID
    return  await db.getFirstAsync(query, id);
}