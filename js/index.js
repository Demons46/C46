$(function(){
    // 轮播图部分
    (function(){
        var mySwiper = new Swiper ('.swiper-container', {
            // 循环模式选项
            loop: true,
            // 自动播放
            autoplay: true,
            // 分页器
            pagination: {
            el: '.swiper-pagination',
            clickable :true,
            },
            // 前进后退按钮
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            // 透明度切换
            effect : 'fade',
            fadeEffect: {
            crossFade: true,
            }
        });        
    })();
    // 计时器轮播图
    (function(){
        var mySwiper = new Swiper ('.swiper-container-2', {
            loop: true, // 循环模式选项            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 透明度切换
            effect : 'fade',
            fadeEffect: {
            crossFade: true,
            }
        });        
    })();
    // 主体数据ajax请求
    $.ajax({
        url: './json/index-2.json',
        type: 'get',
        dataType: 'json',
        success: function(json){
            var goodsStr = '';
            $.each(json,function(index,item){
                goodsStr +=
                `
                <li class="r-list-items">
                  <a href="#" class="r-list-links">
                    <div class="con-img">
                      <img src="${item.urlimg}" alt="">
                    </div>
                    <h3 class="con-title">${item.title}</h3>
                    <p class="con-desc">${item.desc}</p>
                    <p class="con-price">${item.price}</p>
                  </a>
                </li>
                `
            })
            $('.right-lists').html(goodsStr);
        }
    })
    
});