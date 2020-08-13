var mysql=require('mysql');

function getConnection(callback){
    var con=mysql.createConnection({
        host	: 'localhost',
        user	: 'root',
        password: '',
        database: 'mentalHealthCounselingDB',
        socket: '/opt/lampp/var/mysql/mysql.sock',
    });
    con.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        callback(con);
        console.log('connected as id ' + con.threadId);
    });
}


module.exports={
    getResults:function (sql, callback){
        getConnection(function (con){
            con.query(sql, function(error, results){
                if(error){
                    console.log(error.stack);
                    callback([]);
                }else{
                    callback(results);
                }
            });
            con.end(function(err){
                console.log('connection end...');
            });
        });

    },
    execute: function (sql, callback){

        getConnection(function(connection){
            connection.query(sql, function(error, results){

                if(error){
                    console.log(error.stack);
                    callback(false);
                }else{
                    callback(true);
                }
            });

            connection.end(function(err){
                console.log('connection end...');
            });
        });
    }
}

