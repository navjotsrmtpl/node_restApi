
const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get_products = (req,res,next)=>{

    Product.find().select("name price _id productImage").exec().then(docs=>{
                const response = {
                    count: docs.length,
                    product:docs.map(doc=>{
                        return {    
                            name: doc.name,
                            price:doc.price,
                            _id:doc._id,
                            productImage:doc.productImage,
                            request:{
                                type:"GET",
                                url:"http://localhost:3000/products/" + doc._id

                            }
                        }
                    })
                }
        res.status(200).json(response).catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
            
        })
    })
}

exports.post_product = (req,res,next)=>{
    console.log(req.file);
    
    // const product={
    //     name:req.body.name,
    //     price:req.body.price
    // }
    const product= new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    });
    product.save().then(result=>{
        console.log(result);
            res.status(201).json({
                message:'Handling post request to /products',
                createProduct:product
            })
    }).catch(err=>{
        console.log(err);
        res.status(404).json({
            error:err
        })
    }
)}


exports.get_productbyid= (req,res,next)=>{
    const id = req.params.productId;

    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);

        }else{
            res.status(404).json({message:'No valid Id'})
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
        
    })
    // if(id=="special"){
    //     res.status(200).json({
    //         message:"you created a special id"
    //     })
    // }else{
    //     res.status(200).json({
    //         message:'you created id=' + id
    //     })
    // }
}

    exports.update_product= (req,res,next)=>{
        const id= req.params.productId;
        const updateOps = {};
        // for (const ops of req.body){
        //     updateOps[ops.propName] = ops.value;
        //     updateOps[ops.newPrice] = ops.value;
        // }
    Product.update({_id:id},{$set:{name:req.body.name,price:req.body.price}}).exec().then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
        
    })
   
}

exports.delete_product = (req,res,next)=>{
    const id= req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
        
    })

}