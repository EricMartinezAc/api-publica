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

      // const directoryPath = path.join(__dirname, 'storageProducts');

      // fs.readdir(directoryPath, (err, files) => {
      //   if (err) {
      //     return res.status(500).json({ message: 'Error al leer el directorio de imágenes' });
      //   }

      //   // Mapear los archivos para devolver URLs relativas
      //   const images = files.map(file => ({
      //     filename: file,
      //     url: `/images/${file}`
      //   }));

      //   res.json(images);
      // });

      const imagesDir = path.join(storageProducts, idClient, idProduct);
      console.log(imagesDir);
      try {
        // Leemos el directorio de imágenes de manera asincrónica y filtramos solo las imágenes
        const files = await fs.promises.readdir(imagesDir);
        const imageFiles = files.filter((file) =>
          file.match(/\.(jpg|jpeg|png|gif)$/)
        );

        // Mapeamos las rutas de las imágenes
        const imgsProducts = imageFiles.map((file) => {
          return {
            storageProducts,
            client_id: idClient,
            fileName: file.split(".")[0],
            url: `${storageProducts}${idClient}\\${idProduct}\\${file}`,
          };
        });

        return imgsProducts;
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
