const fs = require("fs");
const path = require("path");

const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9_-]/g, "");
};

const LoadProductsForApps = async (clients, storageProducts) => {
  // Mapeamos los clientes para procesar sus productos
  const ExtractorImgsForProdsPromises = clients.map(async (client) => {
    // Mapeamos los productos de cada cliente para obtener sus rutas de imágenes
    const productPromises = client.products.map(async (product) => {
      const idClient = sanitizeInput(client.company._id);
      const idProduct = sanitizeInput(product.product_id);

      // Creamos la ruta segura a las imágenes
      const imagesDir = path.join(storageProducts, idClient, idProduct);

      // Leemos el directorio de imágenes y filtramos solo las imágenes
      try {
        const files = await fs.promises.readdir(imagesDir);
        const imageFiles = files.filter((file) =>
          file.match(/\.(jpg|jpeg|png|gif)$/)
        );

        // Mapeamos las rutas de las imágenes
        const images = imageFiles.map((file) => {
          return {
            origin: storageProducts,
            fileName: file,
            url: `${idClient}/${idProduct}/${file}`,
          };
        });

        return images;
      } catch (err) {
        console.error("Error al leer el directorio de imágenes", err);
        return [];
      }
    });

    // Esperamos a que todos los productos sean procesados y aplanamos el array
    const productImages = await Promise.all(productPromises);
    return productImages.flat(); // Aplanamos el array de imágenes
  });

  // Esperamos a que todos los clientes sean procesados y aplanamos el array
  const ExtractorImgsForProds = await Promise.all(
    ExtractorImgsForProdsPromises
  );
  return ExtractorImgsForProds.flat(); // Aplanamos el array de resultados
};

module.exports = LoadProductsForApps;
