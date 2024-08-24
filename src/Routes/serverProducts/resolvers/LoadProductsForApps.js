const fs = require("fs");
const path = require("path");
const { sanitizeInput } = require("../services");

const LoadProductsForApps = async (clients, storageProducts) => {
  // Mapeamos los clientes para procesar sus productos
  const ExtractorImgsForProdsPromises = clients.map(async (client) => {
    // Mapeamos los productos de cada cliente para obtener sus rutas de imágenes
    const productImagesPromises = client.products.map(async (product) => {
      const idClient = sanitizeInput(client.company._id);
      const idProduct = sanitizeInput(product.product_id);

      // Creamos la ruta segura a las imágenes
      const imagesDir = path.join(storageProducts, idClient, idProduct);

      try {
        // Leemos el directorio de imágenes de manera asincrónica y filtramos solo las imágenes
        const files = await fs.promises.readdir(imagesDir);
        const imageFiles = files.filter((file) =>
          file.match(/\.(jpg|jpeg|png|gif)$/)
        );

        // Mapeamos las rutas de las imágenes
        const images = imageFiles.map((file) => {
          return {
            client_id: idClient,
            fileName: file.split(".")[0],
            url: `${storageProducts}${idClient}\\${idProduct}\\${file}`,
          };
        });

        return images;
      } catch (err) {
        console.error("Error al leer el directorio de imágenes", err);
        return [];
      }
    });

    const productImages = await Promise.all(productImagesPromises);
    return productImages.flat(); // Aplanamos el array de imágenes
  });

  const ExtractorImgsForProds = await Promise.all(
    ExtractorImgsForProdsPromises
  );
  return ExtractorImgsForProds.flat(); // Aplanamos el array de resultados
};

module.exports = LoadProductsForApps;
