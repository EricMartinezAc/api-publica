const fs = require("fs");
const path = require("path");

const storageProducts = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "static",
  "storageProducts"
);
const pathEmployees = path.join(__dirname);

// Función para leer y filtrar archivos .json
const employees = async () => {
  try {
    // Leer los archivos del directorio
    const files = await fs.promises.readdir(pathEmployees);

    // Filtrar archivos .json y procesar cada uno
    const matchingFiles = await Promise.all(
      files
        .filter((file) => path.extname(file) === ".json") // Filtrar solo archivos .json
        .map(async (file) => {
          const filePath = path.join(pathEmployees, file);

          try {
            const data = await fs.promises.readFile(filePath, "utf8");
            const jsonContent = JSON.parse(data);

            // Filtrar archivos con "persistent.status: true"
            if (jsonContent?.company?.persistent?.status === true) {
              return jsonContent; // Retornar el contenido JSON si coincide
            }
          } catch (err) {
            console.error(`Error al procesar el archivo ${file}:`, err);
          }
          return null;
        })
    );

    // Filtrar los resultados nulos
    const results = matchingFiles.filter((content) => content !== null);
    return results;
  } catch (err) {
    console.error("Error al leer los archivos:", err);
    return [];
  }
};

// Llamar a la función y manejar el resultado
employees().then((data) => console.log("Datos encontrados"));

module.exports = { employees, storageProducts };
