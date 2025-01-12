const sequelize = require('./connection');
const Product = require('./models/Product');

const products = [
  {
    name: 'MacBook Pro M2',
    desc: '14-inch MacBook Pro with M2 chip, 16GB RAM, 512GB SSD',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    type: 'Electronics',
    stock: 25,
    price: 1999.99,
    available: true,
    seller: 1
  },
  {
    name: 'Sony WH-1000XM5',
    desc: 'Premium noise cancelling headphones with 30-hour battery life',
    img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    type: 'Electronics',
    stock: 50,
    price: 399.99,
    available: true,
    seller: 1
  },
  {
    name: 'Nike Air Jordan 1',
    desc: 'Classic high-top basketball shoes in University Blue',
    img: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500',
    type: 'Fashion',
    stock: 30,
    price: 179.99,
    available: true,
    seller: 2
  },
  {
    name: 'Levi\'s 501 Original',
    desc: 'Classic straight fit jeans in dark wash',
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    type: 'Fashion',
    stock: 100,
    price: 69.99,
    available: true,
    seller: 2
  },
  {
    name: 'KitchenAid Stand Mixer',
    desc: 'Professional 5qt stand mixer in Matte Black',
    img: 'https://images.unsplash.com/photo-1594222082006-52195c0c24dc?w=500',
    type: 'Home and Kitchen',
    stock: 15,
    price: 449.99,
    available: true,
    seller: 3
  },
  {
    name: 'Dyson V15 Detect',
    desc: 'Cordless vacuum with laser dust detection',
    img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
    type: 'Home and Kitchen',
    stock: 20,
    price: 749.99,
    available: true,
    seller: 3
  },
  {
    name: 'La Mer Moisturizer',
    desc: 'Luxury face cream with healing properties',
    img: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=500',
    type: 'Beauty and Cosmetics',
    stock: 40,
    price: 189.99,
    available: true,
    seller: 4
  },
  {
    name: 'Olaplex Hair Care Set',
    desc: 'Complete hair repair treatment system',
    img: 'https://images.unsplash.com/photo-1626015365107-232281d796ed?w=500',
    type: 'Beauty and Cosmetics',
    stock: 60,
    price: 89.99,
    available: true,
    seller: 4
  },
  {
    name: 'Nintendo Switch OLED',
    desc: 'Gaming console with enhanced display',
    img: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
    type: 'Electronics',
    stock: 35,
    price: 349.99,
    available: true,
    seller: 1
  },
  {
    name: 'Kindle Paperwhite',
    desc: '6.8" e-reader with adjustable warm light',
    img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    type: 'Electronics',
    stock: 45,
    price: 139.99,
    available: true,
    seller: 1
  },
  {
    name: 'Yoga Mat Pro',
    desc: 'Non-slip exercise mat with alignment lines',
    img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    type: 'Sports and Outdoors',
    stock: 80,
    price: 49.99,
    available: true,
    seller: 5
  },
  {
    name: 'Resistance Bands Set',
    desc: '5-piece exercise bands with carrying case',
    img: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
    type: 'Sports and Outdoors',
    stock: 100,
    price: 29.99,
    available: true,
    seller: 5
  }
];

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.destroy({ where: {} });
    console.log('Cleared existing products');

    // Insert new products
    await Product.bulkCreate(products);
    console.log('Products seeded successfully!');

    // Close the connection
    await sequelize.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seed function
seedProducts();
