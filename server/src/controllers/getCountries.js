// Import the necessary dependencies and models
const { Activity , Country } = require('../db');

// Define the getCountries function
const getCountries = async (req, res) => {
  try {
    // Query the Country model to get all countries
    const countries = await Country.findAll();

    // Return the array of country objects as a response
    res.status(200).json(countries);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the getCountries function
module.exports = getCountries;