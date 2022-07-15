'use strict'
const express=require('express');
const categoryController=require('../controllers/category.controller');
const api=express.Router();
const mdAuth=require('../services/authenticated');

//TESTEAR RUTAS DE CATEGORIA
api.get('/testCategory', categoryController.testCategory);

//GUARDAR CATEGORIA
api.post('/saveCategory',[mdAuth.ensureAuth, mdAuth.isAdmin], categoryController.saveCategory);

//OBTENER CATEGORIAS
api.get('/getCategorys', categoryController.getCategorys);

//BORRAR UNA CATEGORIA
api.delete('/deleteCategory/:id',[mdAuth.ensureAuth, mdAuth.isAdmin],categoryController.deleteCategory);

//ACTUALIZAR UNA CATEGORIA
api.put('/updateCategory/:id',[mdAuth.ensureAuth,mdAuth.isAdmin], categoryController.updateCategory);


module.exports=api;