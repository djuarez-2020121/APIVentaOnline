'use strict'
const express=require('express');
const carContoller=require('../controllers/carShopping.controller');
const api=express.Router();
const mdAuth=require('../services/authenticated');

//TESTEAR LAS RUTAS
api.get('/testShoppingCart', carContoller.testCar);

//AÑADIR AL CARRITO DE COMPRAS
api.post('/addCar',mdAuth.ensureAuth, carContoller.addCartShopp);


module.exports=api;