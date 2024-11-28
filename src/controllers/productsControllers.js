const product = require('../models/products');
const { formatNumber } = require('../utils/formatNumber');
const  bucket  = require('../service/firebaseAdmin');
exports.getProducts = async (req, res) => {
  try {
    const products = await product.find({});
    res.render('products/index', { 
      title: 'Products', 
      message: 'Products management', 
      products: products,
      formatNumber: formatNumber
    });
  } catch (err) {
    // หากเกิดข้อผิดพลาดในการดึงข้อมูล
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');  // ส่งข้อผิดพลาดกลับไปที่ผู้ใช้
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
    const { productId, filePath } = req.body;
  
    try {
      // ลบไฟล์จาก Firebase Storage
      const fileDeleted = await deleteFile(filePath);
      if (!fileDeleted) {
        return res.json({ success: false, message: 'Failed to delete file' });  // หยุดหากลบไฟล์ไม่ได้
      }
  
      // ลบข้อมูลในฐานข้อมูล
      const { id } = req.params;
      await product.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'Failed to delete product' });
    }
  };
  
  async function deleteFile(filePath) {
    console.log("Deleting file:", filePath);
    try {
      const file = bucket.file(filePath);  // สร้าง reference ไปที่ไฟล์
      const [status] = await file.delete();  // ลบไฟล์
      console.log(`Deleted file: ${filePath} - ${status}`);
      return true;  // ถ้าลบไฟล์สำเร็จให้ return true
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;  // ถ้าเกิดข้อผิดพลาดให้ return false
    }
  }
  
  