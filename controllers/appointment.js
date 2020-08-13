var express=require('express');
var router = express.Router();
var appointmentModel=require('../models/appointment');
var patientModel=require('../models/patient');


router.get('/', function (req, res){
if(req.session.user_id!=null){
    appointmentModel.getForDoc(req.session.docId,function (results){
        var options = {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Dhaka'
        };
        for(let i=0; i<results.length;i++){
            results[i].start='disabled';
            if(results[i].status=='accepted'){
                results[i].start='';
            }
            if(results[i].scheduled_date!='') {
                results[i].scheduled_date = new Intl.DateTimeFormat('en-us', options).format(results[i].scheduled_date);
            }
            if(results[i].status!='requested'){
                results[i].disable='disabled';

            }
            else{
                results[i].disable='';
            }
        }
        console.log(results);
        var data={
            results:results
        };
        res.render('doctor/appointment',data);
    });
}
else {
    res.redirect('/login');
}
});

router.post('/accept/:id',function (req,res){
console.log(req.params);
console.log(req.body);
var app={
    id:req.params.id,
    scheduled_date:"\'"+req.body.scheduled_date+"\'",
    status:'accepted'
}
appointmentModel.update(app,function (status){
    if(status){
        //res.redirect('/appointment');
    }
});
res.redirect('/appointment');
});

router.get('/decline/:id',function (req,res){
console.log(req.params);
    var app={
        id:req.params.id,
        scheduled_date:null,
        status:'declined'
    }
    appointmentModel.update(app,function (status){
        if(status){
            console.log(status);
            //res.redirect('/appointment');
        }
    });
res.redirect('/appointment');
});




module.exports=router;
