var express=require('express');
var router = express.Router();
var userModel=require('../models/user');
var patientModel=require('../models/patient');
var recordModel=require('../models/record');
var docModel=require('../models/doctor');
var subModel=require('../models/sub');
var apptModel=require('../models/appointment');

router.get('*', function(req,res,next){
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
	
	var pid = req.session.pid;
	docModel.getAll(function(doctors){
	console.log(doctors);
		if(doctors.length > 0)
		{
			patientModel.getAppointments(pid,function(appointments){
				console.log(appointments);
				res.render('patient/appointment',{ docList: doctors, data: appointments });
			});
		}
		else
		{
			res.redirect('/patient');
		}
	});
});

router.post('/appointment',function (req,res){
	var pid = req.session.pid;
	info={
		p_id: pid,
		d_id: req.body.doctor,
		description: req.body.description
	};
	console.log(info);
	apptModel.request(info,function(status){
		console.log(status);
		res.redirect('/patient/appointment');
	});
});

router.get('/docList',function (req,res){

	docModel.getAll(function(result){
		console.log(result);
		if(result.length>0)
		{
			res.render('patient/docList', { doctors : result});
		}
		else
		{
			res.redirect('/patient');
		}
	});
});


/*router.get('/progReport',function (req,res){
    res.render('patient/progReport');
});*/

router.get('/prescriptions',function (req,res){
	var pid = req.session.pid;
	patientModel.getPrescriptions(pid,function(result){
		console.log(result);
		if(result.length > 0)
		{
			res.render('patient/prescriptions',{pres: result});
		}
		else
		{
			res.render('patient/prescriptions',{pres: null});
		}
	});
});

router.get('/subPlans',function (req,res){
	
    subModel.getAll(function(result){
		console.log(result);
		
		if(result.length>0)
		{
			res.render('patient/subPlans', { subs : result});
		}
		else
		{
			res.send('<h1>Rows are missing from table</h1>');
		}
	});
});

router.get('/updateRecord',function (req,res){

	var pid = req.session.pid;
	recordModel.checkRecord(pid,function(status){
		if(status==false)
		{
			res.render('patient/updateRecord',{record: null});	
		}
		else
		{
			recordModel.getRecord(pid,function(result){
				console.log(result);
				res.render('patient/updateRecord',{ record: result });
			});
		}
	});
});

router.post('/updateRecord',function (req,res){

	console.log(req.body);
	
	var pid = req.session.pid;
	var record = {
	height: req.body.height,
	weight: req.body.weight,
	bp: req.body.bp,
	pulseRate: req.body.pulseRate,
	mood: req.body.mood,
	sleepDuration: req.body.sleepDuration, 
	description: req.body.description,
	p_id: pid
	};

	recordModel.checkRecord(pid,function(status){

		if(status==false)
		{
			recordModel.insert(record,function(status){
				console.log(status);
					if(status)
					{
						res.redirect('/patient');
					}
					else
					{
						res.redirect('/patient/updateRecord');
					}
			});
		}
		else
		{
			recordModel.getRecord(pid,function(result){
				console.log(result);
				recordModel.update(record,function(status){
					console.log(status);
					if(status)
					{
						res.redirect('/patient');
					}
					else
					{
						res.redirect('/patient/updateRecord');
					}
				});
			});
		}
	});
});

router.get('/updateProfile',function (req,res){
	
	var id = req.session.user_id;
	console.log(id);
	patientModel.get(id,function(result){
		res.render('patient/updateProfile',{patient: result});
	});
});

router.post('/updateProfile',function (req,res){
    console.log(req.body);
	
	var pid = req.session.pid;
	patient = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		gender: req.body.gender,
		bloodtype: req.body.bloodtype,
		propic: req.body.propic,
		p_id: pid
	}
	patientModel.update(patient,function(status){
		console.log(status);
		if(status)
		{
			res.redirect('/patient/profile');
		}
		else
		{
			res.redirect('/patient/updateProfile');
		}
	});
});

router.get('/deleteReq/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	apptModel.delete(id,function(status){
		console.log(status);
		res.redirect('/patient/appointment');
	})
});

router.get('/changePassword',function(req,res){
	var id = req.session.user_id;
	userModel.get(id,function(result){
		res.render('patient/changePassword',result);
	});
});

router.post('/changePassword',function(req,res){
	console.log(req.body);
	var id = req.session.user_id;
	var change = {
		username: req.body.username,
		password: req.body.password,
		newpassword: req.body.newpassword,
		repassword: req.body.repassword,
		id: id
	}

	console.log(change.id);
	userModel.get(id,function(result){
		if(change.username == result.username && change.password == result.password)
		{
			if(change.newpassword == change.repassword)
			{
				patientModel.updatePassword(change,function(status){
					console.log(status);
					if(status)
					{
						res.redirect('/login');
					}
					else
					{
						res.send("Could not change Password! <a href="+"/patient/changePassword"+">Please Try Again</a>");
					}
				});
			}
			else
			{
				res.send("The Retyped password is wrong. <a href="+"/patient/changePassword"+">Try Again</a>");
			}
		}
		else
		{
			res.send("The Username or Password is wrong. <a href="+"/patient/changePassword"+">Try Again</a>");
		}
	});
});

module.exports = router;