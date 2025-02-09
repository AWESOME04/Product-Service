const Product = require("../database/models/Product");
const ProductService = require("../services/product-service");
const { PublishMessage } = require("../utils");
const { auth, isSeller } = require("./middleware/auth");
// const { SHOPPING_SERVICE } = require("../config");

module.exports = (app, channel) => {
  const service = new ProductService();

  app.get("/", async (req, res, next) => {
    try {
      const { data } = await service.GetProducts();
      console.log("Products from DB:", data);
      return res.json(data);
    } catch (error) {
      console.error("Products API Error:", error);
      return res.status(404).json({ error });
    }
  });

  app.post("/product/create", auth, isSeller, async (req, res, next) => {
    try {
      const { name, desc, img, type, stock, price, available } = req.body;
      const { data } = await service.CreateProduct({
        name,
        desc,
        img: img || 'https://placehold.co/600x400',
        type,
        stock,
        price,
        available,
        seller: req.user._id
      });
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/product/:id", auth, isSeller, async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await service.GetProductDescription(productId);
      
      // Check if product exists and seller owns it
      if (!product.data || product.data.seller !== req.user._id) {
        return res.status(403).json({ message: "Not authorized to update this product" });
      }

      const { data } = await service.UpdateProduct(productId, req.body);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/product/:id", async (req, res, next) => {
    try {
      const productId = req.params.id;
      const { data } = await service.GetProductDescription(productId);
      if (!data) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:type", async (req, res, next) => {
    try {
      const type = req.params.type;
      const { data } = await service.GetProductsByCategory(type);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/ids", async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  app.put("/wishlist", auth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProductPayload(
        _id,
        { productId: req.body._id },
        "ADD_TO_WISHLIST"
      );

      PublishMessage(
        channel,
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(data)
      );

      return res.status(200).json(data.data.product);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/wishlist/:id", auth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const productId = req.params.id;
      const { data } = await service.GetProductPayload(
        _id,
        { productId },
        "REMOVE_FROM_WISHLIST"
      );

      PublishMessage(
        channel,
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(data)
      );

      return res.status(200).json(data.data.product);
    } catch (err) {
      next(err);
    }
  });

  app.put("/cart", auth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProductPayload(
        _id,
        { productId: req.body.product._id, amount: req.body.amount },
        "ADD_TO_CART"
      );

      PublishMessage(
        channel,
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(data)
      );

      const response = { product: data.data.product, stock: data.data.qty };

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/cart/:id", auth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const productId = req.params.id;
      const { data } = await service.GetProductPayload(
        _id,
        { productId },
        "REMOVE_FROM_CART"
      );

      PublishMessage(
        channel,
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(data)
      );

      const response = { product: data.data.product, stock: data.data.qty };

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  app.get("/products/:id", async (req, res, next) => {
    try {
      const productId = req.params.id;
      const { data } = await service.GetProductById(productId);
      return res.json(data);
    } catch (error) {
      console.error("Get Product API Error:", error);
      return res.status(404).json({ error });
    }
  });
};
