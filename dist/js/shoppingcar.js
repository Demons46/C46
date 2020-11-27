"use strict";

$(function () {
  // 推荐部分ajax请求
  $.ajax({
    url: "./json/shoppingcar-1.json",
    type: "get",
    dataType: "json",
    success: function success(json) {
      var goodsStr = '';
      $.each(json, function (index, item) {
        goodsStr += "\n                <li class=\"recommend-item\">\n                  <a href=\"#\" class=\"recommend-link\">\n                    <div class=\"recommend-img\">\n                      <img src=\"".concat(item.imgurl, "\" alt=\"\">\n                    </div>\n                    <div class=\"recommend-name\">").concat(item.name, "</div>\n                    <div class=\"recommend-price\">").concat(item.price, "</div>\n                    <div class=\"recommend-evaluate\">").concat(item.evaluate, "</div>\n                  </a>\n                  <div class=\"recommend-b\">\n                    <a href=\"#\">\u52A0\u5165\u8D2D\u7269\u8F66</a>\n                  </div>\n                </li>\n                ");
      });
      $('.recommend-list').html(goodsStr);
    }
  }); // 判断本地存储

  if (localStorage.getItem("goods")) {
    // 有数据时
    // 获取数据
    var liArr = JSON.parse(localStorage.getItem("goods"));
    $.ajax({
      url: "./json/goods.json",
      type: "get",
      dataType: "json",
      success: function success(json) {
        var domStr = "";
        $.each(liArr, function (index, item) {
          $.each(json, function (indexJson, itemJson) {
            // 判断购物车数据是否与json数据，从而通过code获取其它数据，在进行渲染
            if (item.code === itemJson.code) {
              domStr += "\n                                <div class=\"goods-items clearfix\">\n                                <input class=\"car-check-g\" type=\"checkbox\">\n                                <div class=\"car-img-g\">\n                                  <img src=\"".concat(itemJson.goodsImg1, "\" alt=\"\">\n                                </div>\n                                <div class=\"car-name-g\">").concat(itemJson.goodsName, "</div>\n                                <div class=\"car-single-g\">").concat(itemJson.goodsPriceN, "</div>\n                                <div class=\"car-num-g\">\n                                  <a href=\"#\" class=\"minus\">-</a>\n                                  <input code=\"").concat(item.code, "\" type=\"text\" value=\"").concat(item.num, "\">\n                                  <a href=\"#\" class=\"add\">+</a>\n                                </div>\n                                <div class=\"car-all-g\">\u5C0F\u8BA1</div>\n                                <div code=\"").concat(item.code, "\" class=\"car-operation-g\">X</div>\n                              </div>\n                            ");
            }
          });
        });
        var showcar = "\n                <div class=\"car-title clearfix\">\n                  <div class=\"car-check\">\n                    <input type=\"checkbox\">                    \n                    \u5168\u9009\n                  </div>\n                  <div class=\"car-name\">\u5546\u54C1\u540D\u79F0</div>\n                  <div class=\"car-single\">\u5355\u4EF7</div>\n                  <div class=\"car-num\">\u6570\u91CF</div>\n                  <div class=\"car-all\">\u5C0F\u8BA1</div>\n                  <div class=\"car-operation\">\u64CD\u4F5C</div>\n                </div>\n                <div class=\"car-goods\">\n                </div>\n                <div class=\"car-close clearfix\">\n                  <div class=\"close-num\">\n                    <a href=\"list.html\">\u7EE7\u7EED\u8D2D\u7269</a>\n                    <span>\n                      \u5171\n                      <i class=\"num1\"></i>\n                      \u4EF6\u5546\u54C1,\u5DF2\u9009\u62E9\n                      <i class=\"num2\"></i>\n                      \u4EF6\n                    </span>\n                  </div>\n                  <div class=\"close-price\">\n                    \u5408\u8BA1\uFF1A\n                    <em></em>\n                    \u5143\n                    <a href=\"#\" class=\"clear-all\">\u7ED3\u7B97</a>\n                  </div>\n                </div>\n                ";
        $('.car-list').html(showcar);
        $('.car-goods').html(domStr);
      }
    }); // 点击单个移除购物车

    $('#main').on('click', '.goods-items .car-operation-g', function () {
      // 首先删除元素节点
      $(this).parent().remove(); // 更新本地存储数据

      var code = $(this).attr("code"); // 选择要删除的数据

      $.each(liArr, function (index, item) {
        if (item.code === code) {
          liArr.splice(index, 1);
          return false;
        }
      }); // 判断购物车中是否还有数据

      if (liArr.length > 0) {
        // 有数据时，继续将数据设置到本地存储
        localStorage.setItem("goods", JSON.stringify(liArr));
      } else {
        // 没有时，则清除本地数据并展示无数据页面
        localStorage.removeItem("goods");
        var show = "\n                    <div class=\"car-img\">\n                    <img src=\"./img/car.png\" alt=\"\">\n                    </div>\n                    <div class=\"car-txt\">\n                    <p>\u60A8\u7684\u8D2D\u7269\u8F66\u8FD8\u662F\u7A7A\u7684!</p>\n                    <a href=\"list.html\">\u9A6C\u4E0A\u53BB\u8D2D\u7269</a>\n                    </div>\n                    ";
        $('.car-list').html(show);
      }
    }); // 点击商品数量加减

    $("#main").on("click", ".car-num-g a", function () {
      // 获取当前点击code和本地储存liArr
      var code = $(this).siblings("input").attr("code");
      var liArr = JSON.parse(localStorage.getItem("goods")); // console.log(code,liArr)
      // 提前保存this的指向

      var _this = $(this); // 通过遍历拿到每个code与当前点击code比对


      $.each(liArr, function (index, item) {
        // 判断code值是否相等
        if (code === item.code) {
          if (_this.text() === "+") {
            item.num++;
          } else {
            // 判断是否减到最少数量
            if (item.num == 1) {
              alert("已经减到最少了");
            } else {
              item.num--;
            }
          } // 储存保存完后的数据并将本地储存的num数赋给数量栏


          localStorage.setItem("goods", JSON.stringify(liArr));

          _this.siblings("input").val(item.num); // 加减完后改变其价格

          /*  function setTotal(){
               var prices = parseInt(_this.siblings("p").text().slice(1));
               var nums = item.num;
               _this.siblings("p").text("￥" + prices * nums)
           } */

        }
      });
    });
    /* // 点击结算全部
    $('#main').on('click','.clear-all',function(){
        $('#main').html() = '';
        localStorage.clear();
        alert("结算完成");
    }) */
  } else {
    // 没有数据时
    var show = "\n        <div class=\"car-img\">\n          <img src=\"./img/car.png\" alt=\"\">\n        </div>\n        <div class=\"car-txt\">\n          <p>\u60A8\u7684\u8D2D\u7269\u8F66\u8FD8\u662F\u7A7A\u7684!</p>\n          <a href=\"list.html\">\u9A6C\u4E0A\u53BB\u8D2D\u7269</a>\n        </div>\n        ";
    $('.car-list').html(show);
  }
});