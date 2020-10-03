define(["parabola", "jquery", "jquery-cookie"], function(Parabola, $){
    function body(){
        $(function(){

            /* header */
            // 一级导航
            $(".shop").mouseenter(function(){
                $(".shopping").css("display","block");
            }).mouseleave(function(){
                $(".shopping").css("display","none");
            })
            $(".msg").mouseenter(function(){
                $(".msgA").css("display","block");
            }).mouseleave(function(){
                $(".msgA").css("display","none");
            })
            // 二级导航数据
            $.ajax({
                url:"../data/store.json",
                success:function(arr){
                    var str = ``;
                    for(var i = 0;i< arr.length;i++){
                        str +=`<dl>
                        <dt>
                            <img src="${arr[i].img}" alt="">
                            <a>${arr[i].title}</a>
                        </dt>
                    </dl>`
                    }
                    $(".store1").html(str);
                },error:function(msg){
                    console.log(msg);
                }
            })
            $(".storeA").mouseenter(function(){
                $(".store").css("display","block");
            }).mouseleave(function(){
                $(".store").css("display","none");
            })
            // 二级导航，鼠标划入
            $(".magazineA").mouseenter(function(){
                $(".magazine").css("display","block");
            }).mouseleave(function(){
                $(".magazine").css("display","none");
            })
            $(".shareA").mouseenter(function(){
                $(".share").css("display","block");
            }).mouseleave(function(){
                $(".share").css("display","none");
            })
            // 页面滚动超过一定值时，导航条固定到页面上方
            var headerHeight = $('.header-top').height();
            var menuHeight = $(".header-menu").height();
            $(window).scroll(function () {
                var scrollTopValue = $(window).scrollTop();
                if(scrollTopValue >= headerHeight){
                    //第二部分固定定位
                    $(' .header-menu').css({
                        position:'fixed',
                        top:0,
                        left:0,
                        right:0
                    });
                    //设置第三部分的值为第二部分的高度,防止滑动的高度大于第一部分的高度的时候第二部分的固定太过突兀
                    $('.main').css({
                    marginTop:menuHeight+10
                    });
                }else{
                    $(' .header-menu').css({
                        position:'static',
                        right:0,
                        left:0
                    });
                    //设置第三部分的值为原来的高度
                    $(' .main').css({
                        marginTop:10
                    });
                }
             });

            // search搜索框
            $(".search-btn").mouseenter(function(){
                $(".iconfont").css("opacity","0.7");
            }).mouseleave(function(){
                $(".iconfont").css("opacity","1");
            }).click(function(){
                if ($(".search-input").css("right") == "0px") {
                    $(".search-input").animate({right:"-260px"});
                    $(".search-text").animate({opacity:"0"});
                }else{
                    $(".search-input").animate({right:'0'});
                    $(".search-text").animate({opacity:"1"});
                }
                
            })

            // 轮播图
            var aBtns = $(".banner").find("ol li");
            var oUl = $(".banner").find("ul");
            var iNow = 0;
            var timer = null;
            $(".banner").mouseenter(function(){
                clearInterval(timer);
                $(".lrbtn").animate({opacity:"1"});
            }).mouseleave(function(){
                timer = setInterval(function(){
                    iNow++;
                    tab();
                },5000);
                $(".lrbtn").animate({opacity:"0"});
            })
            timer = setInterval(function(){
                iNow++;
                tab();
            },5000);
        //     // 下方所有按钮添加点击切换
            aBtns.click(function(){
                iNow = $(this).index();
                tab();
            })
        //     // 左右按钮添加点击
            $(".lrbtn a").click(function(event){
                event.preventDefault();
            })
            $("#leftA").bind("click",antiShake(function(){
                    iNow--;
                    tab();
                   
                }, 1000, true)
            )
            $("#rightA").bind("click",antiShake(function(){
                    iNow++;
                    tab();   
                }, 1000, true)
            )
            
            function tab(){
                aBtns.removeClass("active").eq(iNow).addClass("active");
                if (iNow == aBtns.size()) {
                    aBtns.eq(0).addClass("active");
                }
                oUl.animate({left:-1000*(iNow+1)},500,function(){
                    if (iNow == aBtns.size()) {
                        console.log(iNow);
                        iNow = 0;
                        oUl.css("left","-1000px");
                    }else if (iNow == -1) {
                        iNow = 7;
                        oUl.css("left","-8000px");
                    }
                })
            }
        /* content */
        //加载商品数据
            $.ajax({
                url:"../data/goods.json",
                success:function(arr){
                    var str = ``;
                    for(var i = 0;i< arr.length;i++){
                        str +=`<div class="goodChilds">
                    <a class="goodsImg">
                        <img src="${arr[i].img}" alt="">
                    </a>
                    <a href="" class="goodsInfo">
                        <p class="money">${arr[i].price}</p>
                        <p class="title">${arr[i].title}</p>
                        <p class="desc">${arr[i].desc}</p>
                    </a>
                    <div class="bar">
                        <a href="" class="who">
                            <img src="${arr[i].shopImg}" alt="">
                            ${arr[i].shop}
                        </a>
                        <a href="" class="goodsFavCount">
                            <span id= "num">0</span>
                            <i class="iconfont heart">&#xe638;</i>
                        </a>
                    </div>
                    </div>`
                    }
                    $(".cb-center").html(str);
                },error:function(msg){
                    console.log(msg);
                }
            })
            // 商品点赞事件(事件委托)
            $(".cb-center").on('click',".heart",function(event){
                event.preventDefault();
                var num = $("#num").html();
                    num = parseInt(num)+1;
                $(this).css("color","red");
                $("#num").html(num);
            })
            



            /* footer */
            // 底部鼠标滑入事件
            $(".phone").mouseenter(function(){
                $(".code").css("display","block");
            }).mouseleave(function(){
                $(".code").css("display","none");
            })
            $(".weixinA").mouseenter(function(){
                $(".weixin").css("display","block");
            }).mouseleave(function(){
                $(".weixin").css("display","none");
            })
        })
        // 函数防抖
        function antiShake(func, wait, immediate) {
            let timer = null;
            return function () {
              const context = this;
              const args = arguments;
              const now = !timer; //timer = null;
              clearTimeout(timer);
              if (immediate) {
                if (now) {
                  func.apply(context, args);
                }
                timer = setTimeout(function () {
                  timer = null;
                }, wait);
              } else {
                timer = setTimeout(function () {
                  func.apply(context, args);
                }, wait);
              }
            };
        }
        


    }
    return {
        body:body
    }
})