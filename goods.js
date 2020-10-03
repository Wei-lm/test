define(["parabola", "jquery", "jquery-cookie"], function(Parabola, $){
    function body(){
        $(function(){
            // 商品图轮播
            var i=0;
            var timer=0;
            $(".btn ul li").click(function(){
                $(this).addClass("one").siblings().removeClass("one");
                var index = $(this).index();
                var i = index;
                $(".pic a").eq(index).stop().fadeIn(500).show().siblings().stop().fadeIn(500).hide();
                $("#big a").eq(index).stop().fadeIn(100).show().siblings().stop().fadeIn(100).hide();
            })
           
            // 放大镜
            $("#small").mouseenter(function(){
                $("#mark").add("#big").show();
            }).mouseleave(function(){
                $("#mark").add("#big").hide();
            }).mousemove(function(ev){
                var l = ev.clientX - $(this).offset().left-80;
                l = Math.max(l, 0);
                l = Math.min(175, l);
                var t = ev.clientY - $(this).offset().top-80; 
                t = Math.max(t, 0);
                t = Math.min(175, t);
              $("#mark").css({
                left: l,
                top: t
              })
              //放大的图片，反方向对应倍数移动 
              $("#big img").css({
                left: -2 * l,
                top: -2 * t
              })
            })



            // 售后须知
            $(".shxz").mouseenter(function(){
                $(".infoItem").css("display","block");
            }).mouseleave(function(){
                $(".infoItem").css("display","none");
            })

        })
    }
    return {
        body:body
    }
})