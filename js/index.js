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
    /* // 回顶部设置
    $(document).click(function(){
        var t = $(document).scrollTop();
        alert(t)
    })
    $(document).scrollTop(function(){
        console.log(111)
        var t = parseInt($(document).scrollTop());
        if(t > 300){
            $('.side-totop').css('display','black');
        }
    }) */
       
    
});