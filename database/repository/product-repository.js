const Product = require("../models/Product");
const { Op } = require("sequelize");

class ProductRepository {
  async CreateProduct({ name, desc, img, type, stock, price, available, seller }) {
    try {
      console.log('Creating product with data:', { name, desc, img, type, stock, price, available, seller });
      const product = await Product.create({
        name,
        desc,
        img: img || 'https://placehold.co/600x400', // Fallback image if none provided
        type,
        stock,
        price,
        available,
        seller
      });
      console.log('Created product:', product.toJSON());
      return product;
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  }

  async Products() {
    try {
      return await Product.findAll({
        where: {
          available: true
        }
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    }
  }

  async FindById(id) {
    try {
      return await Product.findByPk(id);
    } catch (err) {
      console.error('Error finding product by id:', err);
      throw err;
    }
  }

  async FindByCategory(category) {
    try {
      return await Product.findAll({
        where: {
          type: category,
          available: true
        }
      });
    } catch (err) {
      console.error('Error finding products by category:', err);
      throw err;
    }
  }

  async FindSelectedProducts(selectedIds) {
    try {
      return await Product.findAll({
        where: {
          id: {
            [Op.in]: selectedIds
          }
        }
      });
    } catch (err) {
      console.error('Error finding selected products:', err);
      throw err;
    }
  }

  async UpdateProduct(id, updateData) {
    try {
      const product = await this.FindById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Only update allowed fields
      const allowedFields = ['name', 'desc', 'img', 'type', 'stock', 'price', 'available'];
      const filteredData = Object.keys(updateData)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updateData[key];
          return obj;
        }, {});

      await product.update(filteredData);
      return product;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  }
}

module.exports = ProductRepository;
