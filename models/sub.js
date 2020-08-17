var db = require('./db');

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
        var sql="select * from subplan";
        db.getResults(sql,function (result){
            if(result.length > 0){
                callback(result);
            }else{
                callback([]);
            }
        });
    },
}