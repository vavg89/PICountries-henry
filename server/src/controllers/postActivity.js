// Importa los modelos Country, Activity y Review
const { Country, Activity } = require('../db');

// Definimos la función postActivity
async function postActivity(req, res) {
  const { name, difficulty, duration, season, countries } = req.body; // Obtenemos los datos del cuerpo de la solicitud
  let countriesData = []; // Variable para almacenar los países encontrados

  try {
    // Crea la actividad turística en la base de datos
    const activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Si se proporcionan países, busca los países correspondientes en la base de datos
    if (countries && countries.length > 0) {
      countriesData = await Country.findAll({
        where: {
          cca3: countries,
        },
      });

      // Relaciona la actividad turística con los países encontrados
      await activity.addCountries(countriesData);
    }

    // Envía la respuesta con la actividad turística creada y los países relacionados
    res.json({
      activity,
      countries: countriesData,
    });
  } catch (error) {
    // En caso de error, envía una respuesta de error
    console.error('Error al crear la actividad turística:', error);
    res.status(500).json({ error: 'Error al crear la actividad turística' });
  }
}

// Exportamos la función postActivity
module.exports = postActivity;