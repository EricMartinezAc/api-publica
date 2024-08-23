// const ExtractorImgsForProds = require("../services/ExtractorImgsForProds");
const fs = require("fs");

const LoadProductsForApps = (clients, storageProducts) => {
  const ExtractorImgsForProds = clients.map((client, item) => {
    console.log(
      "rute: ",
      `${storageProducts}/${client.company._id}/${client.products[item].product_id}`
    );
    fs.readdir(
      `${storageProducts}/${client.company._id}/${client.products[item].product_id}`,
      (err, files) => {
        if (err) {
          console.log("Error al leer el directorio de imágenes", err);
          return { error: "Error al leer el directorio de imágenes" };
        }
        const imageFiles = files.filter((file) =>
          file.match(/\.(jpg|jpeg|png|gif)$/)
        );
        return { img: imageFiles };
        // const imagePromises = imageFiles.map((file) => {
        //   return new Promise((resolve, reject) => {
        //     const filePath = path.join(imagesDir, file);
        //     fs.readFile(filePath, (err, data) => {
        //       if (err) {
        //         reject(err);
        //       } else {
        //         const base64Image = `data:image/${path
        //           .extname(file)
        //           .slice(1)};base64,${data.toString("base64")}`;
        //         resolve({
        //           fileName: file,
        //           base64: base64Image,
        //         });
        //       }
        //     });
        //   });
        // });
        // Promise.all(imagePromises)
        //   .then((images) => {
        //     res.json(images);
        //   })
        //   .catch((err) => {
        //     console.log("Error al procesar las imágenes", err);
        //     res.status(500).json({ error: "Error al procesar las imágenes" });
        //   });
      }
    );
  });
  return ExtractorImgsForProds;
};

module.exports = LoadProductsForApps;
