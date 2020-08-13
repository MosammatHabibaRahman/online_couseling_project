var db = require('./db');

module.exports ={

    get: function(id, callback){
        var sql = "select * from appoinment where id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(result[0]);
                callback(result[0]);
            }else{
                callback([]);
            }
        });
    },
    getForDoc: function(id, callback){
        var sql = "select * from appoinment where d_id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(result);
                callback(result);
            }else{
                callback([]);
            }
        });
    },
    getForPatient: function(id, callback){
        var sql = "select * from appoinment where p_id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(result);
                callback(result);
            }else{
                callback([]);
            }
        });
    },

    getAll: function(callback){
        var sql = "select * from appointment";
        db.getResults(sql, function(result){
            if(result.length > 0){
                callback(result);
            }else{
                callback([]);
            }
        });
    },

    request: function(appointment, callback){
        var sql = "insert into appointment (description, p_id, d_id) " +
            "values('"+appointment.description+"', "+appointment.p_id+", "+appointment.d_id+")";

        console.log(sql);

        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },



    update: function(appointment, callback){
        var sql = "update appointment set " +
            "status='"+appointment.status+ "', scheduled_date='"+appointment.scheduled_date+ "' where id="+appointment.id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

    delete: function(id, callback){
        var sql = "delete from appointment where id="+id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    }
}
