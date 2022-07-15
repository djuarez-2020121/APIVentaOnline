'use strict'

const billController=require('../controllers/bill.controller');
const express=require('express');
const api=express.Router();
const mdAuth=require('../services/authenticated');

//TESTEAR RUTAS DE BILL / Facturas
api.get('/testB', billController.test);

//GENERAR LA FACTURA
api.post('/bill/:id',mdAuth.ensureAuth,billController.bill);

//ACTUALIZAR LA FACTURA
api.put('/updateBill/:id',[mdAuth.ensureAuth, mdAuth.isAdmin],billController.updateBill);


module.exports=api;