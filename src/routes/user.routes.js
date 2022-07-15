'use strict'

const userController=require('../controllers/user.controller');
const express=require('express');
const api=express.Router();
const mdAuth=require('../services/authenticated');


//TESTEAR RUTAS DE USER
api.get('/test', [mdAuth.ensureAuth, mdAuth.isAdmin],userController.test);

//REGISTAR UN USUARIO
api.post('/register', userController.register);

//LOGEARSE CON UN USUARIO
api.post('/login', userController.login);

//ACTUALIZAR UN USUARIO
api.put('/update/:id', mdAuth.ensureAuth,userController.update);

//ELIMINAR UN USUARIO
api.delete('/delete/:id',mdAuth.ensureAuth, userController.delete);

//GUARDAR UN USUARIO
api.post('/saveUser',[mdAuth.ensureAuth, mdAuth.isAdmin], userController.saveUser);



module.exports=api;