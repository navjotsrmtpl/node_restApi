const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req,res,next)=>{

    Order.find().select("product quantity _id").populate('product').exec().then(result=>{
        res.status(200).json({
            count:result.length,
            orders:result.map(doc=>{
                return {
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity
                }
            })
        })
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
 
}


exports.create_order = (req,res,next)=>{
    Product.findById(req.params.productId)
    .then(product=>{
        if(!product){
             return res.status(400).json({message:"product not found"})
        }
        const order = new Order({
            _id:mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product:req.body.productId
        })
        return order.save()
        .then(result=>{
            res.status(201).json(result);
        }).catch(err=>{
            console.log(err);   
            res.status(500).json({
                error:err
            })
            
        })
    })
 
// const order={
//     productId: req.body.productId,
//     quantity: req.body.quantity
// }



}


exports.get_orderByid = (req,res,next)=>{
    Order.findById(req.params.orderId)
    .exec().then(order=>{
        if(!order){
            return res.status(404).json({
                message:"Order not found"
            })
        }
                res.status(200).json({
                order:order
                })
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        })
    })
}

exports.delete_order= (req,res,next)=>{
    const id = req.params.orderId
    Order.remove({_id:id}).exec().then(result=>{
        res.status(200).json({
            message:"order deleted"
        })
    })
}