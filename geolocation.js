const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database and collection names
const databaseName = 'your_database_name';
const collectionName = 'users';

// Function to save the user object with real-time location
async function saveUserWithRealtimeLocation() {
  // Connect to the MongoDB server
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // Access the database
    const db = client.db(databaseName);

    // Access the collection
    const collection = db.collection(collectionName);

    // Retrieve the user's real-time location
    // Use a geolocation library or the appropriate API for Node.js
    // Here's an example using the 'geolocation-api' package:
    const geolocation = require('geolocation-api');

    geolocation.getCurrentPosition((error, position) => {
      if (error) {
        console.error('Error retrieving location:', error);
        return;
      }

      // Create a new user object with the real-time location
      const user = {
        username: 'JohnDoe',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        // Other user properties...
      };

      // Insert the user object into the collection
      collection.insertOne(user)
        .then(() => {
          console.log('User saved successfully.');
        })
        .catch((error) => {
          console.error('Error saving user:', error);
        })
        .finally(() => {
          // Close the connection
          client.close();
        });
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to save the user object with real-time location
saveUserWithRealtimeLocation();
