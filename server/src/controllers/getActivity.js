// Importa los modelos Activity, Country, y Review
const { Activity, Country, Review } = require('../db');

// Definimos la función getActivity
async function getActivity(req, res) {
  try {
    // Obtenemos todas las actividades turísticas desde la base de datos
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          attributes: ['name'],
          through: { attributes: [] }, // Omite las columnas adicionales de la tabla intermedia
        },
      ],
    });

    if (activities.length === 0) {
      // Si no se encuentran actividades, enviamos un mensaje en formato JSON
      return res.status(404).json({ message: 'No se encuentran actividades registradas' });
    }

    // Creamos un arreglo de objetos con las actividades y los nombres de los países relacionados
    const activitiesWithCountries = activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      difficulty: activity.difficulty,
      duration: activity.duration,
      season: activity.season,
      countries: activity.Countries.map(country => country.name),
    }));

    // Enviamos la respuesta con el arreglo de objetos de actividades turísticas y los nombres de los países relacionados
    res.json(activitiesWithCountries);
  } catch (error) {
    // En caso de error, enviamos una respuesta de error
    console.error('Error al obtener las actividades turísticas:', error);
    res.status(500).json({ error: 'Error al obtener las actividades turísticas' });
  }
}

// Exportamos la función getActivity
module.exports = getActivity;
