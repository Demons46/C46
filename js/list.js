$(function(){
  // 菜单-轮播图
  (function(){
    var mySwiper = new Swiper ('.swiper-container', {
      // 循环模式选项
      loop: true, 
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })        
  })();
  // 主体-新品区ajax请求
  $.ajax({
    url: './json/list-1.json',
    type: 'get',
    dataType: 'json',
    success: function(json){
      var goodsStr = '';
      $.each(json,function(index,item){
        goodsStr += 
        `
        <li class="goods-item">
          <div class="goods-img">
            <a href="#" class="goods-link">
              <img src="${item.imgurl}" alt="">
            </a>
          </div>
          <div class="goods-desc">
            <h3>
              <a href="#">${item.title}</a>
            </h3>
            <em>${item.desc}</em>
            <span class="goods-price">
              <strong>${item.raw}</strong>
              元
              <del>${item.now}元</del>
            </span>
          </div>
        </li>   
        `
      })
      $('.goods-list').html(goodsStr);
    }
  })
  // 主体-爆品区ajax请求
  $.ajax({
    url: './json/list-2.json',
    type: 'get',
    dataType: 'json',
    success: function(json){
      var goodsStr = '';
      $.each(json,function(index,item){
        goodsStr += 
        `
        <li class="goods-item2">
          <div class="goods-img2">
            <a href="#" class="goods-link2">
              <img src="${item.imgurl}" alt="">
            </a>
          </div>
          <div class="goods-desc2">
            <h3>
              <a href="#">${item.title}</a>
            </h3>
            <em>${item.desc}</em>
            <span class="goods-price2">
              <strong>${item.raw}</strong>
              元
              <del>${item.now}</del>
            </span>
          </div>
        </li>   
        `
      })
      $('.goods-list2').html(goodsStr);
    }
  })
})