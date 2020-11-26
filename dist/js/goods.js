"use strict";

$(function () {
  // 获取本地存储
  var ID = JSON.parse(localStorage.getItem("ID"));
  $.ajax({
    url: "./json/goods" + ID.code + ".json",
    type: "get",
    dataType: "json",
    success: function success(json) {
      var goodsStr = '';
      $.each(json, function (index, item) {
        goodsStr += "\n        <div class=\"container clearfix\">\n        <div class=\"main-goods clearfix\">\n          <div class=\"goods-img\">\n            <div class=\"swiper-container\">\n              <div class=\"swiper-wrapper\">\n                <div class=\"swiper-slide\">\n                  <img src=\"".concat(item.goodsImg1, "\" alt=\"\">\n                </div>\n                <div class=\"swiper-slide\">\n                  <img src=\"").concat(item.goodsImg2, "\" alt=\"\">\n                </div>\n                <div class=\"swiper-slide\">\n                  <img src=\"").concat(item.goodsImg3, "\" alt=\"\">\n                </div>\n              </div>\n              <!-- \u5206\u9875\u5668 -->\n              <div class=\"swiper-pagination\"></div>\n              <!-- \u5BFC\u822A\u6309\u94AE -->\n              <div class=\"swiper-button-prev swiper-button-black\"></div>\n              <div class=\"swiper-button-next swiper-button-black\"></div>\n            </div>\n          </div>\n          <div class=\"goods-desc\">\n            <h2>").concat(item.goodsName, "</h2>\n            <p>").concat(item.goodsDesc, "</p>\n            <div class=\"goods-price\">\n              <span>").concat(item.goodsPriceN, "</span>\n              <del>").concat(item.goodsPriceR, "</del>\n            </div>\n            <div class=\"goods-url\">\n              <div class=\"url\">\n                \u6C5F\u897F \u4E5D\u6C5F \u5E90\u5C71\u5E02\n              </div>\n            </div>\n            <div class=\"goods-type\">\n              <h3>").concat(item.goodsTypeT, "</h3>\n              <p>").concat(item.goodsTypeC, "</p>\n            </div>\n            <div class=\"goods-all\">\n              <div class=\"all-t\">\n                <span>").concat(item.goodsName, "</span>\n                <em>").concat(item.goodsPriceN, "<del>").concat(item.goodsPriceR, "</del></em>\n              </div>\n              <div class=\"all-b\">\u603B\u8BA1\uFF1A").concat(item.goodsPriceN, "</div>\n            </div>\n            <div class=\"goods-buy\">\n              <div code=\"").concat(item.code, "\" class=\"buy-add\">\n                <a href=\"#\">\n                  \u52A0\u5165\u8D2D\u7269\u8F66\n                </a>\n              </div>\n              <div class=\"buy-like\">\n                <a href=\"#\">\n                  \u559C\u6B22\n                </a>\n              </div>\n            </div>\n            <div class=\"goods-safeguard\">\n              <img src=\"./img/safeguard.jpg\" alt=\"\">\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"main-banner\">\n        <div class=\"container\">\n          <img src=\"").concat(item.goodsImg4, "\" alt=\"\">\n          <img src=\"").concat(item.goodsImg5, "\" alt=\"\">\n          <img src=\"").concat(item.goodsImg6, "\" alt=\"\">\n          <img src=\"").concat(item.goodsImg7, "\" alt=\"\">\n        </div>\n      </div>\n        ");
      });
      $('#main').html(goodsStr);
      localStorage.removeItem("ID");
    }
  }); // 通过事件委托绑定点击事件

  $('#main').on('click', '.buy-add', function () {
    // 存储当前商品id
    var code = $(this).attr('code'); // 判断当前存储是否存在商品数据

    if (localStorage.getItem("goods")) {
      // 有的话把对象添加到一个新建数组里(方便遍历拿到每一个对象)
      // 因为拿到的数据是字符串，所以通过JSON.parse转成对象
      var liArr = JSON.parse(localStorage.getItem("goods")); // console.log(liArr)
    } else {
      // 没有的话把他设置成空就行
      var liArr = [];
    } // 通过遍历数组从而拿到每个数据
    // 定义一个监听器来监听是否存在


    var flag = true;
    $.each(liArr, function (index, item) {
      // 判断我们当前点击的商品是否已经存在
      if (code === item.code) {
        item.num++;
        flag = false; // 只要执行一次就证明数据存在就立即结束遍历(提高性能)

        return false;
      }
    }); // 如果不存在数据就插入数据

    if (flag) {
      liArr.push({
        code: code,
        num: 1
      });
    } // 更新本地存储


    localStorage.setItem("goods", JSON.stringify(liArr)); // 提示语

    alert('添加购物车成功');
  });
});