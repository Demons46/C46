"use strict";

$(function () {
  // 菜单-轮播图
  (function () {
    var mySwiper = new Swiper('.swiper-container', {
      // 循环模式选项
      loop: true,
      // 分页器
      pagination: {
        el: '.swiper-pagination'
      },
      // 前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  })(); // 主体-新品区ajax请求


  $.ajax({
    url: './json/list-1.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var goodsStr = '';
      $.each(json, function (index, item) {
        goodsStr += "\n        <li code=\"".concat(item.code, "\" class=\"goods-item\">\n          <div class=\"goods-img\">\n            <a href=\"goods.html\" class=\"goods-link\">\n              <img src=\"").concat(item.imgurl, "\" alt=\"\">\n            </a>\n          </div>\n          <div class=\"goods-desc\">\n            <h3>\n              <a href=\"#\">").concat(item.title, "</a>\n            </h3>\n            <em>").concat(item.desc, "</em>\n            <span class=\"goods-price\">\n              <strong>").concat(item.raw, "</strong>\n              \u5143\n              <del>").concat(item.now, "\u5143</del>\n            </span>\n          </div>\n        </li>   \n        ");
      });
      $('.goods-list').html(goodsStr);
    }
  }); // 主体-爆品区ajax请求

  $.ajax({
    url: './json/list-2.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var goodsStr = '';
      $.each(json, function (index, item) {
        goodsStr += "\n        <li code=\"".concat(item.code, "\" class=\"goods-item2\">\n          <div class=\"goods-img2\">\n            <a href=\"#\" class=\"goods-link2\">\n              <img src=\"").concat(item.imgurl, "\" alt=\"\">\n            </a>\n          </div>\n          <div class=\"goods-desc2\">\n            <h3>\n              <a href=\"#\">").concat(item.title, "</a>\n            </h3>\n            <em>").concat(item.desc, "</em>\n            <span class=\"goods-price2\">\n              <strong>").concat(item.raw, "</strong>\n              \u5143\n              <del>").concat(item.now, "</del>\n            </span>\n          </div>\n        </li>   \n        ");
      });
      $('.goods-list2').html(goodsStr);
    }
  }); // 点击不同商品跳转到相应的页面

  $('.goods-list').on('click', '.goods-item', function () {
    // 获取id
    var code = $(this).attr('code');
    var codeObj = {
      code: code
    };
    var codeStr = JSON.stringify(codeObj); // 将id存储到本地存储

    localStorage.setItem("ID", codeStr);
  });
});