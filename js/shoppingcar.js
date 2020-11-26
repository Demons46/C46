$(function () {
    // 推荐部分ajax请求
    $.ajax({
        url: "./json/shoppingcar-1.json",
        type: "get",
        dataType: "json",
        success: function (json) {
            var goodsStr = ''
            $.each(json, function (index, item) {
                goodsStr +=
                    `
                <li class="recommend-item">
                  <a href="#" class="recommend-link">
                    <div class="recommend-img">
                      <img src="${item.imgurl}" alt="">
                    </div>
                    <div class="recommend-name">${item.name}</div>
                    <div class="recommend-price">${item.price}</div>
                    <div class="recommend-evaluate">${item.evaluate}</div>
                  </a>
                  <div class="recommend-b">
                    <a href="#">加入购物车</a>
                  </div>
                </li>
                `
            })
            $('.recommend-list').html(goodsStr);
        }
    });
    // 判断本地存储
    if (localStorage.getItem("goods")) {// 有数据时
        // 获取数据
        var liArr = JSON.parse(localStorage.getItem("goods"));
        $.ajax({
            url: "./json/goods.json",
            type: "get",
            dataType: "json",
            success: function (json) {
                var domStr = "";
                $.each(liArr, function (index, item) {
                    $.each(json, function (indexJson, itemJson) {
                        // 判断购物车数据是否与json数据，从而通过code获取其它数据，在进行渲染
                        if (item.code === itemJson.code) {
                            domStr +=
                                `
                                <div class="goods-items clearfix">
                                <input class="car-check-g" type="checkbox">
                                <div class="car-img-g">
                                  <img src="${itemJson.goodsImg1}" alt="">
                                </div>
                                <div class="car-name-g">${itemJson.goodsName}</div>
                                <div class="car-single-g">${itemJson.goodsPriceN}</div>
                                <div class="car-num-g">
                                  <a href="#" class="minus">-</a>
                                  <input type="text" value="${item.num}">
                                  <a href="#" class="add">+</a>
                                </div>
                                <div class="car-all-g">小计</div>
                                <div code="${item.code}" class="car-operation-g">X</div>
                              </div>
                            `
                        }
                    })
                })
                var showcar =
                    `
                <div class="car-title clearfix">
                  <div class="car-check">
                    <input type="checkbox">                    
                    全选
                  </div>
                  <div class="car-name">商品名称</div>
                  <div class="car-single">单价</div>
                  <div class="car-num">数量</div>
                  <div class="car-all">小计</div>
                  <div class="car-operation">操作</div>
                </div>
                <div class="car-goods">
                </div>
                <div class="car-close clearfix">
                  <div class="close-num">
                    <a href="list.html">继续购物</a>
                    <span>
                      共
                      <i class="num1"></i>
                      件商品,已选择
                      <i class="num2"></i>
                      件
                    </span>
                  </div>
                  <div class="close-price">
                    合计：
                    <em></em>
                    元
                    <a href="#" class="clear-all">结算</a>
                  </div>
                </div>
                `
                $('.car-list').html(showcar);
                $('.car-goods').html(domStr);
            }
        })
        // 点击单个移除购物车
        $('#main').on('click', '.goods-items .car-operation-g', function () {
            // 首先删除元素节点
            $(this).parent().remove();
            // 更新本地存储数据
            var code = $(this).attr("code");
            // 选择要删除的数据
            $.each(liArr, function (index, item) {
                if (item.code === code) {
                    liArr.splice(index, 1);
                    return false
                }
            })
            // 判断购物车中是否还有数据
            if (liArr.length > 0) {
                // 有数据时，继续将数据设置到本地存储
                localStorage.setItem("goods", JSON.stringify(liArr));
            } else {
                // 没有时，则清除本地数据并展示无数据页面
                localStorage.removeItem("goods");
                var show =
                    `
                    <div class="car-img">
                    <img src="./img/car.png" alt="">
                    </div>
                    <div class="car-txt">
                    <p>您的购物车还是空的!</p>
                    <a href="list.html">马上去购物</a>
                    </div>
                    `
                $('.car-list').html(show);
            }
        })
        /* // 点击结算全部
        $('#main').on('click','.clear-all',function(){
            $('#main').html() = '';
            localStorage.clear();
            alert("结算完成");
        }) */
    } else {// 没有数据时
        var show =
            `
        <div class="car-img">
          <img src="./img/car.png" alt="">
        </div>
        <div class="car-txt">
          <p>您的购物车还是空的!</p>
          <a href="list.html">马上去购物</a>
        </div>
        `
        $('.car-list').html(show);
    }
})