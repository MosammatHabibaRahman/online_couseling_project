var db=require('./db');

module.exports={
    get:function (id, callback){
        var sql="select * from doctor where user_id='"+id+"'";
        db.getResults(sql,function (result){
            if(result.length > 0){
                callback(result);
            }else{
                callback([]);
            }
        });
    },
    getAll:function (callback){
        var sql="select * from doctor";
        db.getResults(sql,function (result){
            if(result.length > 0){
                callback(result);
            }else{
                callback([]);
            }
        });
    },
    insert: function(doctor, callback){
        var sql = "insert into doctor (name, email, phone, gender, license_num, qualifications, specialty,  user_id) " +
            "values('"+doctor.name+"', '"+doctor.email+"', '"+doctor.phone+"', '"+doctor.gender+"', '"+doctor.license+"'," +
            " '"+doctor.qualifications+"', '"+doctor.specialty+"', "+doctor.user_id+")";

        console.log(sql);

        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

    update: function(doctor, callback){
        var sql = "UPDATE `doctor` SET " +
            "`name`='"+doctor.name+"',`email`='"+doctor.email+"',`phone`='"+doctor.phone+"',`gender`='"+doctor.gender+"'," +
            "`license_num`='"+doctor.license+"',`qualifications`='"+doctor.qualifications+"'," +
            "`specialty`='"+doctor.specialty+"' where d_id="+doctor.id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },
    updateProPic:function (doctor,callback){
        var sql = "UPDATE `doctor` SET " +
            "`propic`='"+doctor.propic+"' where d_id="+doctor.user_id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },
    delete: function(id, callback){
        var sql = "delete from doctor where d_id="+id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    }
}
