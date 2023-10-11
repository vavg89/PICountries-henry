const { Sequelize } = require('sequelize');
const { Country } = require('../db');

async function getCountriesName(req, res) {
  try {
    const nameQuery = req.query.name;
    //console.log(nameQuery);
    if (!nameQuery) {
      return res.status(400).json({ error: 'Debe proporcionar un nombre de país en la consulta.' });
    }

    // Obtenemos todos los países que coinciden con el nombre recibido por query
    const countries = await Country.findAll({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${nameQuery.toLowerCase()}%`),
    });

    if (countries.length === 0) {
      return res.status(404).json({ message: 'País no registrado en la base de datos.' });
    }

    res.json(countries);
  } catch (error) {
    console.error('Error al obtener los países:', error);
    res.status(500).json({ error: 'Error al obtener los países' });
  }
}

module.exports = getCountriesName;