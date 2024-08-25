const AddImageDataToProducts = (clients_, products_) => {
  return clients_.map((client) => {
    const updatedProducts = client.products.map((product) => {
      const updatedImgs = products_.filter(
        (product_) =>
          product_.client_id === client.company._id &&
          product_.fileName.slice(0, -1) === product.product_id
      );

      return { ...product, images: updatedImgs };
    });
    return { ...client, products: updatedProducts };
  });
};
module.exports = AddImageDataToProducts;
