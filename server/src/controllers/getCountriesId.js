// Import the necessary dependencies and models
const { Activity , Country } = require('../db');

// Define the getCountriesId function
const getCountriesId = async (req, res) => {
  const { cca3 } = req.params; // Get the country code (cca3) from the request parameters

  try {
    // Query the Country model with the provided cca3 parameter and include the associated Activity data
    const country = await Country.findOne({
      where: { cca3: cca3 },
      include: {
        model: Activity,
        attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
      },
    });

    // If the country is found, return it as a response
    if (country) {
      res.status(200).json(country);
    } else {
      // If the country is not found, return a 404 Not Found response
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the getCountriesId function
module.exports = getCountriesId;
