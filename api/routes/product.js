const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');
var DIR = './uploads';
// const upload = multer({dest:'uploads/'})

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
        
      cb(null, Date.now() + file.originalname);
    }
  });
  const fileFilter= (req,file,cb)=>{

    if(file.mimetype==='image/jpeg' || file.mimetype === 'image/png'){

        cb(null,true)
    }else{

        cb(null,false);
    }
  }
  let upload = multer({storage: storage, limits:{
      fileSize: 1024*1024*5
  },
    fileFilter:fileFilter
});


router.get('/',checkAuth,productController.get_products);
router.post('/',checkAuth,upload.single('productImage'),productController.post_product);

router.get('/:productId',checkAuth,productController.get_productbyid);

router.patch('/:productId',checkAuth,productController.update_product);

router.delete('/:productId',checkAuth,productController.delete_product);

module.exports= router;