var express=require('express');
var router = express.Router();
var userModel=require('../models/user');

router.get('/',function (req,res){
    res.render('patient/index');
});

router.get('/profile',function (req,res){
    res.render('patient/profile');
});

router.get('/appointment',function (req,res){
    res.render('patient/appointment');
});

router.get('/docList',function (req,res){
    res.render('patient/docList');
});

router.get('/progReport',function (req,res){
    res.render('patient/progReport');
});

router.get('/prescriptions',function (req,res){
    res.render('patient/prescriptions');
});

router.get('/subPlans',function (req,res){
    res.render('patient/subPlans');
});

router.get('/updateRecord',function (req,res){
    res.render('patient/updateRecord');
});

router.get('/updateProfile',function (req,res){
    res.render('patient/updateProfile');
});

module.exports = router;