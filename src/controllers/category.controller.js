'use strict '

const { findOneAndUpdate } = require('../models/category.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');
//const Product=require('../controllers/product.controller')
const {validateData,checkUpdate,searchCategoryId}= require('../utils/validate');


//Testear comunicaciión entre los archivos
exports.testCategory = (req, res)=>{
    return res.send({message: 'La funcion de categoria está corriendo'});

}



/*---------------GUARDAR UNA CATEGORÍA/*---------------*/
exports.saveCategory=async(req,res)=>{
    try{
        const params=req.body;
        const data={
            name: params.name,
            description: params.description,
        };
        const msg=validateData(data);
        if(!msg){
        const category=new Category(data);
        await category.save();
        return res.send({message: 'Category saved successfully'});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}


/*----------- OBTENER LAS CATEGORÍAS EXISTENTES ---------------*/
exports.getCategorys=async(req,res)=>{
    try{
        const categorys=await Category.find();
        return res.send({ categorys });
    }catch(err){
        console.log(err);
        return err;
    }
}



// PRUEBA de pasar productos a la categoria DEFAULT
/*
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId=req.params.id;
        const categoryDeleted=await Product.updateAndDeleteCategory()
        categoryDeleted=await Category.findOneAndDelete({_id: categoryId});
        if(!categoryDeleted) return res.status(500).send({message: 'Category not found or already deleted'});
        return res.send({categoryDeleted, message: 'Account deleted'});
    } catch (err) {
        console.log(err);
        return err;
    }
}*/


/*--------------- ACTUALIZAR UNA CATEGORÍA ---------------*/
exports.updateCategory=async(req, res)=>{
    try{
        const params=req.body;
        const categoryId=req.params.id;
        const check=await checkUpdate(params);
        if(check===false) return res.status(400).send({message: 'Data not received'});
        const updateCategory=await Category.findOneAndUpdate({_id: categoryId}, params, {new: true});
        return res.send({message: 'Updated Category', updateCategory});
    }catch(err){
        console.log(err);
        return err;
    }
}

//DEFAULT PRUEBAS, intento dos

exports.deleteCategory=async(req,res)=>{
    try{
        const cateId=req.params.id;
        const cateExist=await searchCategoryId(cateId);
        if(!cateExist)
        return res.status(500).send({message: 'Category not found or already delete'});
        if(cateExist.name==='DEFAULT')
        return res.send({message: 'Default category cannot be deleted.'});
        const cate=await Category.findOne({name:'DEFAULT'}).lean();
        const products=await Product.find({category:cateId});
        for(let produ of products){
            const Category=await Product.findOneAndUpdate({_id:produ._id},{category:cate._id});
        }
        const deleteCate=await Category.findOneAndDelete({_id: cateId});
        return res.send({message: 'Delete Category.', deleteCate});
    }
    catch(err){
        console.log(err);
        return err;
    }
}
