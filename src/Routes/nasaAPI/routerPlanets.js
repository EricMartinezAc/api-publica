const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/nasa-api", async (req, res) => {
  try {
    const { planet } = req.query;

    if (!planet) {
      return res.status(400).json({ error: 'Falta el parámetro "planet"' });
    }

    const baseUrl = `https://api.nasa.gov/planetary/earth/assets`;
    const apiKey = "YOUR_NASA_API_KEY";
    const url = `${baseUrl}?api_key=${apiKey}&planet=${planet}`;

    const response = await axios.get(url);

    const images = response.data.photos;

    images.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(images);
  } catch (error) {
    console.error("Error fetching data from NASA API:", error);
    res.status(500).json({ error: "Failed to fetch data from NASA API" });
  }
});

module.exports = router;

// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// // Endpoint para obtener datos específicos de un planeta desde la API de NASA
// router.get("/nasa-api", async (req, res) => {
//   try {
//     // Obtén el nombre del planeta del parámetro de consulta
//     const { planet } = req.query;

//     // Verifica si se ha proporcionado el parámetro de planeta
//     if (!planet) {
//       return res.status(400).json({ error: 'Falta el parámetro "planet"' });
//     }

//     const baseUrl = "https://api.le-systeme-solaire.net/rest/bodies/";
//     const url = `${baseUrl}${planet}`;
//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching data from NASA API:", error);
//     res.status(500).json({ error: "Failed to fetch data from NASA API" });
//   }
// });

// module.exports = router;

//const response = await axios.get('https://epic.gsfc.nasa.gov/api/enhanced/date/2024-04-01');
