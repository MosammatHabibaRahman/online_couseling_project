$(document).ready(function (){

var socket=io("http://localhost:3000");
var messages=[];

socket.on('message',function (data) {
    if(data.message){
        messages.push(data);
        var html='';
        for (let i=messages.length-1;i>=0;i--){
            html+='<b>'+messages[i].username+': </b><br/>';
            html+=messages[i].message+'<br/>';
        }
        $("#content").html(html);
        //$("#content").scrollTop($("#content")[0].scrollHeight);
    }
    else {
        console.log("Problem: ",data);
    }
});
    $("#msg").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
$('#send').click(function (){
    sendMessage();
});

    function sendMessage (){
        var text=$("#msg").val();
        var name=$("#user_id").val();
        console.log(name);
        socket.emit('send',{message:text,username:name});
        $("#msg").val('');
    }

// function getName(){
//     let user_id=$("#user_id").val();
//     //console.log(user_id);
//     socket.emit("user_connected",user_id);
// }
//
// getName();
//
// socket.on("user_connected",function (user_id){
//     console.log(user_id);
//     var html="";
//     html+="<li><button class='btn btn-primary chat_user' value='"+user_id+"' >"+user_id+"</button></li>";
//     //console.log(html);
//     $("#user-list").html(html);
// });
//
// $('.chat_user').click(function (){
//     let id = $(this).val();
//     console.log(id);
// });
});


