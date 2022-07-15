'use strict'

const Bill=require('../models/bill.model');
const {searchUser,checkUpdate}=require('../utils/validate');
const Product=require('../models/product.model');
const ShoppingCar=require('../models/carShopping.model');



//Testear comunicaciión entre los archivos
exports.test=(req,res)=>{
    return res.send({message: 'Bill/Facturas is running'});
}


/*--------------- GENERAR LA FACTURA ----------------*/
exports.bill=async(req,res)=>{
    try{
        const userId=req.user.sub;
        const findShoppingCart=await ShoppingCar.findOne({ user: userId }).populate('product').lean();
        if (findShoppingCart===null) {
            return res.send({ message: 'There is no product in the cart'});
        }else{
            for (let index=0; index<findShoppingCart.product.length; index++) {
                const shoppingCartProduct = await findShoppingCart.product[index];
                const indexProduct = await findShoppingCart.product[index].product.valueOf();
                const productId = await Product.findOne({ _id: indexProduct }).lean();
                await Product.findOneAndUpdate({ _id: indexProduct }, data, { new: true }).lean()
            }
            const bill=new Bill(findShoppingCart);
            await bill.save();
            await ShoppingCar.findOneAndRemove({ user: userId });
            return res.send({ message: 'This is your bill', bill });
        }

    }catch(err){
        console.log(err);
        return err;
    }

}


/*--------------- ACTUALIZAR LA FACTURA ----------------*/
exports.updateBill=async(req, res)=>{
    try{
        const billId=req.params.id;
        const params=req.body;
        
            const notUpdated=await checkUpdate(params);
            if(notUpdated===false)return res.status(400).send({message: 'This params can only update by ADMIN, your not ADMIN'});
            else{
                const already=await searchUser(params.username);
                if(!already){
                    const billUpdate=await Bill.findOneAndUpdate({_id: billId}, params, {new:true})
                    .lean()
                    return res.send({billUpdate,message: 'Bill updated'});
                }
            } 
    }catch(err){
        console.log(err);
        return err;
    }
}