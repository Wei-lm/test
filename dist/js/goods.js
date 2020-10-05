define(["parabola", "jquery", "jquery-cookie"], function(Parabola, $){
    function body(){
        $(function(){
           var product_id = valueByname(location.search,"product_id");
        //    alert(product_id);
            $.ajax({
                type:"get",
                url:"../data/list.json",
                success:function(arr){
                   var goodsMsg = arr.find(item => item.product_id == product_id);
                    var node = $(`<div class="msg-left">
                <div id="small">
                    <div class="pic">
                        <a href="#" style="display:block"><img src="${goodsMsg.img}"/></a>
                        <a href="#"><img src="./images/goods-p2.jpg"/></a>
                        <a href="#"><img src="./images/goods-p3.png"/></a>
                        <a href="#"><img src="./images/goods-p4.png"/></a>
                        <a href="#"><img src="${goodsMsg.img}"/></a>				                
                    </div>
                    <div id = 'mark'></div>
                </div>   
                <div class="btn">								
                    <ul>
                        <li class="one"><img src="${goodsMsg.img}"/></li>
                        <li><img src="./images/goods-p2.jpg"/></li>
                        <li><img src="./images/goods-p3.png"/></li>
                        <li><img src="./images/goods-p4.png"/></li>
                        <li><img src="${goodsMsg.img}"/></li>              
                    </ul>								
                </div>
                <div id="big">
                    <a href="#"><img src="${goodsMsg.img}"/></a>
                    <a href="#"><img src="./images/goods-p2.jpg"/></a>
                    <a href="#"><img src="./images/goods-p3.png"/></a>
                    <a href="#"><img src="./images/goods-p4.png"/></a>
                    <a href="#"><img src="${goodsMsg.img}"/></a>	
                </div>
            </div>
            <div class="msg-right">
                <p class="heart">
                    <img src="./images/blackheart.png" alt="">
                    234
                </p>
                <p class="goods_title">OFFGRID</p>
                <p class="goods_name"> ${goodsMsg.title} </p>
                <p class="goods_price">
                    价格:
                    <span>${goodsMsg.price}</span>
                </p>
                <p class="goods_text">
                    <img src="./images/airplane.png" alt="">
                    <span>免运费</span>
                    <img src="./images/dun.png" alt="">
                    <span>正品授权</span>
                </p>
                <p class="goods_kinds">
                    <span>
                        手机规格:
                    </span><br>
                    <a href="">iPhone6 Plus</a>
                    <a href="">iPhone7</a>
                    <a href="">iPhone6/6s</a>
                    <a href="">iPhone7 Plus</a>
                </p>
                <p class="goods_car">
                    <a href="" class="btn1">立即购买</a>
                    <a href="" class="btn2" id="${goodsMsg.product_id}">
                        <img src="./images/car.png" alt="">
                        加入购物车
                    </a>
                    <a href="" class="btn3">
                        <img src="./images/share .png" alt="">
                        分享
                    </a>
                </p>
            </div>`);
            $(".goods-msg").html(node)
                },error:function(msg){
                    console.log(msg);
                }
            })
             // 商品图轮播
            // var i=0;
            // var timer=0;
            $(".goods-msg").on("click",".btn ul li",function(){
                $(this).addClass("one").siblings().removeClass("one");
                var index = $(this).index();
                // var i = index;
                $(".pic a").eq(index).stop().fadeIn(500).show().siblings().stop().fadeIn(500).hide();
                $("#big a").eq(index).stop().fadeIn(100).show().siblings().stop().fadeIn(100).hide();
            })
           
            // 放大镜
            $(".goods-msg").on("mouseenter","#small",function(){
                $("#mark").add("#big").show();
            }).on("mouseleave","#small",function(){
                $("#mark").add("#big").hide();
            }).on("mousemove","#small",function(ev){
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
            // 购物车
            $(".goods-msg").on("click",".btn2",function(){
                var id = this.id;              
                var first = $.cookie("goods") == null ? true :false;
                if (first) {
                    var cookieArr = [{id:id,num:1}];
                    $.cookie("goods",JSON.stringify(cookieArr),{
                        expires:7
                    })
                    
                }else{
                    var cookieArr = JSON.parse($.cookie("goods"));
                    var same = false;                    
                    for(var i = 0; i < cookieArr.length;i++){
                        if (cookieArr[i].id == id) {
                            // cookieArr[i].num++;
                            same = true;
                            break;
                        }
                    }
                    same ? cookieArr[i].num++ : cookieArr.push({id:id, num: 1});
                    $.cookie("goods",JSON.stringify(cookieArr),{
                        expires:7
                    })
                }
                console.log(cookieArr)
                return false;
            })
           

            // 购物车页面
          
                $.ajax({
                    url:"../data/list.json",
                    success:function(arr){
                        if ($.cookie("goods")) {
                            $(".carTab").css("display","block");
                            $(".carKong").css("display","none");
                            var cookieArr = JSON.parse($.cookie("goods"));
                            var newArr = [];
                            for(var i = 0; i < cookieArr.length;i++){
                            console.log(cookieArr.length);
                                for(var j = 0; j< arr.length; j++){
                                    console.log(arr.length);
                                    if (cookieArr[i].id == arr[j].product_id) {
                                        arr[j].num = cookieArr[i].num;
                                        arr[j].id = arr[j].product_id;
                                       
                                        newArr.push(arr[j]);
                                    }
                                    
                                }
                            }
                            
                            
                            for(var i = 0; i< newArr.length;i++){
                            var node = $(`<tr class="itemlist2" id="${newArr[i].id}">
                            <td   valign="top">
                                <input type="checkbox" class="chkbox"/>
                                
                            </td>
                            <td class="txtl">
                            <a href="#" class="gimgCon"><img src="${newArr[i].img}"  /></a>
                                <p class="t"><a href="">${newArr[i].title}</a></p>
                            </td>
                            <td class='num'>
                                <span class="opt">+</span><input type="text" value="${newArr[i].num}" class="num2"/><span class="opt">-</span>
                            </td>
                            <td>${newArr[i].price}</td>
                            <td>未优惠</td>
                            <td><a href="#" class="blue">删除</a></td>
                        </tr> `);
                            node.appendTo(".carTab")
                            }
                        }else{
                            $(".carTab").css("display","none");
                            $(".carKong").css("display","block");
                        }
                    },
                    error:function(msg){
                        console.log(msg);
                    } 
                })
                // 全选和复选
                    var allChecks = $(".chkbox");
                    var checked = $("#check").checked;
                    $("#check").on("click",allChecks,function(){
                        if (checked) {
                            for(var i = 0; i< allChecks.length;i++){
                                allChecks[i].checked =true;
                            }
                        }else{
                            for(var i = 0; i < allChecks.length ;i++){
                                allChecks[i].checked = false;
                            }
                        }
                    })

                    // 商品删除
                
                        $(".carTab").on("click",".blue",function(){
                            var id =$(this).closest(".itemlist2").remove().attr("id");
                            var cookieStr = $.cookie("goods");
                            var cookieArr = JSON.parse(cookieStr);
                            for(var i = 0; i < cookieArr.length;i++){
                                if (id == cookieArr[i].id) {
                                    cookieArr.splice(i,1);
                                    break;
                                }
                            }
                            cookieArr.length == 0 ? $.cookie("goods",null):$.cookie("goods",JSON.stringify(cookieArr),{expires:7})
                            return false;
                        })
                        // 加减
                        $(".carTab").on("click",".opt",function(){
                            var id = $(this).closest(".itemlist2").attr("id");
                            var cookieStr = $.cookie("goods");
                            var cookieArr = JSON.parse(cookieStr);
                            for(var i = 0; i < cookieArr.length;i++){
                                if (id == cookieArr[i].id) {
                                    if (this.innerHTML == "-") {
                                       cookieArr[i].num == 1 ?alert("数量已经为1，不能在减少！"):cookieArr[i].num--; 
                                    }else{
                                        cookieArr[i].num++;
                                    }
                                    break;  
                                }   
                            }
                            $(this).siblings("input").val(cookieArr[i].num);
                            $.cookie("goods",JSON.stringify(cookieArr),{
                                expires:7
                            })
                        })
                    
            // 售后须知
            $(".shxz").mouseenter(function(){
                $(".infoItem").css("display","block");
            }).mouseleave(function(){
                $(".infoItem").css("display","none");
            })
            
        })
        function valueByname(search,name){
            var start = search.indexOf(name + "=");
            if (start == -1) {
                return null;
            }else{
                var end = search.indexOf("&",start);
                if (end == -1) {
                    end = search.length;
                }
                var str = search.substring(start,end);
                var arr = str.split("=");
                return arr[1];
            }
        }
    }
    return {
        body:body
    }
})