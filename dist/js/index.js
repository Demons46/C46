"use strict";

$(function () {
  // 轮播图部分
  (function () {
    var mySwiper = new Swiper('.swiper-container', {
      // 循环模式选项
      loop: true,
      // 自动播放
      autoplay: true,
      // 分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      // 前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // 透明度切换
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  })(); // 计时器轮播图


  (function () {
    var mySwiper = new Swiper('.swiper-container-2', {
      loop: true,
      // 循环模式选项            
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // 透明度切换
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  })(); // 主体数据ajax请求


  $.ajax({
    url: './json/index-2.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var goodsStr = '';
      $.each(json, function (index, item) {
        goodsStr += "\n                <li class=\"r-list-items\">\n                  <a href=\"#\" class=\"r-list-links\">\n                    <div class=\"con-img\">\n                      <img src=\"".concat(item.urlimg, "\" alt=\"\">\n                    </div>\n                    <h3 class=\"con-title\">").concat(item.title, "</h3>\n                    <p class=\"con-desc\">").concat(item.desc, "</p>\n                    <p class=\"con-price\">").concat(item.price, "</p>\n                  </a>\n                </li>\n                ");
      });
      $('.right-lists').html(goodsStr);
    }
  });
});