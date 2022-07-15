'use strict'


const producController=require('../controllers/product.controller');
const express=require('express');
const api=express.Router();
const mdAuth=require('../services/authenticated');


//TESTEAR RUTAS DE PRODUCTOS
api.get('/prueba', producController.testProduct);

//GUARDAR UN PRODUCTO
api.post('/saveProduct',[mdAuth.ensureAuth,mdAuth.isAdmin], producController.saveProduct);

//OBTENER TODOS LOS PRODUCTOS
api.get('/getProducts', producController.getProducts);

//OBTENER UN PRODUCTO POR UN ID
api.get('/getProduct/:id', producController.getProduct);

//BUSCAR UN PRODUCTO O PRODUCTOS CON COINCIDENCIAS
api.post('/searchProduct', producController.searchProduct);

//ACTUALIZAR UN PRODUCTOS
api.put('/updateProduct/:id',[mdAuth.ensureAuth,mdAuth.isAdmin],producController.updateProduct);

//ELIMINAR UN PRODUCTO
api.delete('/deleteProduct/:id',[mdAuth.ensureAuth,mdAuth.isAdmin],producController.deleteProduct);

//PRODUCTOS MAS AGOTADOS
api.get('/productsTired',[mdAuth.ensureAuth,mdAuth.isAdmin],producController.productsTired);

//PRODUCTOS MAS VENDIDOS
api.get('/productsSold',[mdAuth.ensureAuth,mdAuth.isAdmin], producController.productsSold);

module.exports=api;
