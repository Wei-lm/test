define(["parabola", "jquery", "jquery-cookie"], function(Parabola, $){
    function body(){
        $(function(){
        /* content */
        //加载商品数据
            $.ajax({
                url:"../data/list.json",
                success:function(arr){
                    var str = ``;
                    for(var i = 0;i< arr.length;i++){
                        str +=`<div class="goodChilds">
                    <a class="goodsImg" href="goods.html?product_id=${arr[i].product_id}">
                        <img src="${arr[i].img}" alt="">
                    </a>
                    <a href="" class="goodsInfo">
                        <p class="money">${arr[i].price}</p>
                        <p class="title">${arr[i].title}</p>
                        <p class="desc">${arr[i].desc}</p>
                    </a>
                    <div class="bar">
                        <a href="goods.html?product_id=${arr[i].product_id}" class="who">
                            <img src="${arr[i].shopImg}" alt="">
                            ${arr[i].shop}
                        </a>
                        <a href="goods.html?product_id=${arr[i].product_id}" class="goodsFavCount">
                            <span id= "num">0</span>
                            <i class="iconfont heart">&#xe638;</i>
                        </a>
                    </div>
                    </div>`
                    }
                    $(".list-center").html(str);
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
            



        })
    }
    return {
        body:body
    }
})