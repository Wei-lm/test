define(["jquery"],function($){
    function registerSend(){
        $("#button").click(function(){
            $.ajax({
                type:"post",
                url:"./php/register.php",
                data:{
                    username:$(".tel").val(),
                    password:$(".pwd").val(),
                    repassword:$(".repwd").val(),
                    createTime:(new Date()).getTime()
                },
                success: function(result){
                    alert(result);
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }
    return{
        registerSend: registerSend
    }
})