var express=require('express');
var router = express.Router();
var userModel=require('../models/user');
var patientModel=require('../models/patient');
var recordModel=require('../models/record');

router.get('/', function(req,res,next){
	if(req.session.user_id!=null){
		next();
	}
	else
	{
		res.redirect('/login');
	}
});

router.get('/',function (req,res){
	
	var id = req.session.user_id;
	console.log(id);
	
	patientModel.get(id,function(result){
		req.session.pid=result.p_id;
		recordModel.checkRecord(req.session.pid,function(result){
			if(result==false)
			{
				res.redirect('patient/updateRecord');
			}
			else
			{
				recordModel.getRecord(req.session.pid,function(result)
				{
					res.render('patient/index',result);
				});
			}
		});
	});
});

router.get('/profile',function (req,res){
	
	var id = req.session.user_id;

	patientModel.get(id,function(result){
		res.render('patient/profile',result);
	});
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