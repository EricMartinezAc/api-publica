const express = require("express");
const router = express.Router();
const { employees, storageProducts } = require("./clients");
const { LoadProductsForApps, AddImageDataToProducts } = require("./resolvers");

router.get("/products/imgs", async (req, res) => {
  const clients_ = await employees();
  const products_ = await LoadProductsForApps(clients_, storageProducts);
  const updatedClients = AddImageDataToProducts(clients_, products_);
  res.json(updatedClients);
});

// Ruta para servir una imagen específica en formato base64
// router.get("/products/:imageName", (req, res) => {
//   const imageName = req.params.imageName;
//   const imagePath = path.join(
//     __dirname,
//     "../../..",
//     "static/storageProducts/softw-arcontroller-cmms",
//     imageName
//   );

//   if (fs.existsSync(imagePath)) {
//     fs.readFile(imagePath, (err, data) => {
//       if (err) {
//         res.status(500).json({ error: "Error al leer la imagen" });
//       } else {
//         const base64Image = `data:image/${path
//           .extname(imageName)
//           .slice(1)};base64,${data.toString("base64")}`;
//         res.json({
//           fileName: imageName,
//           base64: base64Image,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Imagen no encontrada" });
//   }
// });

module.exports = router;
