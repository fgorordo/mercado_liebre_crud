// ************ Require's ************
const express = require('express');
const multer = require('multer');
const path = require('path')
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');


/*** Multer Settings ***/
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    let productsImgs = path.join(__dirname, '../../public/images/products/');
    cb(null, productsImgs);
  },
  filename: (req, file, cb) => {
    let newFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, newFileName)
  }
})

const upload = multer({storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single('productImg'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/details/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.single('productImg'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
