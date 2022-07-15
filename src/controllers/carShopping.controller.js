' use strict '

const {validateData,checkUpdate,findShoppingCart}=require('../utils/validate');
const ShoppingCar=require('../models/carShopping.model');
const Product=require('../models/product.model');

//TESTAR COMUNICACION
exports.testCar=(req, res)=>{
    return res.send({message: 'La funcion de Car esta corriendo'});
}

/*------------ AÑADIR AL CARRITO ------------*/
exports.addCartShopp=async(req,res)=>{
    try{
        const params=req.body;
        const userId=req.user.sub;
        const data={
            product: params.product,
            quantity: params.quantity,
        };
        const msg=validateData(data);
        if(!msg){
            const findProduct=await Product.findOne({ _id: data.product })
            if(data.quantity>findProduct.stock){
                return res.send({ message: 'This quantity does not exist in our stock :('});
            }else{
                const checkShoppCart= await findShoppingCart(userId);
                if(!checkShoppCart){
                    data.user=userId;
                    data.subtotal=(findProduct.price*data.quantity);
                    data.total=(data.subtotal);
                    const shoppCart=new ShoppingCar(data);
                    await shoppCart.save();
                    console.log(shoppCart)
                    const CartId=await ShoppingCar.findOne({ user: userId })
                    const pushCar=await ShoppingCar.findOneAndUpdate({ _id: CartId._id },
                        { $push: { products: data } }, { new: true })
                        .populate('product').lean();
                    return res.send({ message: 'The product is added', pushCar});
                }else{
                    res.send({message: 'You cannot add more products to the shopping cart'});
                }
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}