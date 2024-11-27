const product = require('../models/products');
const { formatNumber } = require('../utils/formatNumber');

exports.getProducts = async (req, res) => {
  const products = await product.find({});
    try {
      res.render('products/index', { title: 'products', message: 'Products management',products: products,
      formatNumber: formatNumber});
    } catch (err) {
      res.status(500).send('Error fetching data');
    }
  };

  exports.addProduct = async (req, res) => {
    try {
      const { productName, price, category, description, stock, imageURL ,fileName ,pathStorage} = req.body;
      const newProduct = new product({ productName, price, category, description, stock, imageURL ,fileName, pathStorage});
  
      const savedProduct = await newProduct.save();
  
      res.json({
        success: true,
        message: 'Product added successfully',
        product: savedProduct,
      });

    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || 'An error occurred while adding the product',
      });
    }
  }

  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await product.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'Failed to delete product' });
    }
  }
  