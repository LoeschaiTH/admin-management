const product = require('../models/products');
const { formatNumber } = require('../utils/formatNumber');
const  bucket  = require('../service/firebaseAdmin');
const multer = require('multer');
const admin = require('firebase-admin');
const storage = admin.storage();
const bucketUpload = storage.bucket();
const upload = multer({ storage: multer.memoryStorage() });

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
  exports.uploadFile = [upload.single('imageFile'), async (req, res) => {
    const { productName, price, category, description, stock} = req.body;
    console.log("see lo2",req.file);
    console.log("see",req.body);

    
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
  
      const { originalname, buffer } = file;
      const fileName = originalname.replace(/ /g, "_");
      const filePath = `product-images/${fileName}`;  
  
      const newFile = bucket.file(filePath); 
  
      await newFile.save(buffer, {
        metadata: { contentType: file.mimetype },
      });
  
      await newFile.makePublic();

      const pathStorage = filePath;
  
      const imageURL = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
      const newProduct = new product({ productName, price, category, description, stock, imageURL ,fileName, pathStorage});
  
      const savedProduct = await newProduct.save();
  
  
      res.json({ success: true, savedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error });
    }
  }];


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
    try {
      const file = bucket.file(filePath);  // สร้าง reference ไปที่ไฟล์
      const [status] = await file.delete();  // ลบไฟล์
      console.log(`Deleted file: ${filePath}`);
      return true;  // ถ้าลบไฟล์สำเร็จให้ return true
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;  // ถ้าเกิดข้อผิดพลาดให้ return false
    }
  }
  
  