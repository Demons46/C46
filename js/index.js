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
    // 倒计时
    fn()
    function fn() {
      var timer = setInterval(function() {
        var start = '2019/03/13 00:00:00';
        var StartTime = new Date(start);
        var NowTime = new Date();
        var day = NowTime.getDate();
        var month = NowTime.getMonth() + 1;
        var year = NowTime.getFullYear();
        var tw = year + '/' + month + '/' + day + ' 09:00:00';
        var ei = year + '/' + month + '/' + day + ' 10:00:00';
        var tw1 = year + '/' + month + '/' + day +' 14:00:00';
        var ei1 = year + '/' + month + '/' + day +' 15:00:00';
        tw = new Date(tw).getTime();
        ei = new Date(ei).getTime();
        tw1 = new Date(tw1).getTime();
        ei1 = new Date(ei1).getTime();
        var EndTime = '';
        if(NowTime < StartTime) {
          EndTime = StartTime;
          $('#stopNow').css('display', 'none');
          $('#startNow').css('display', 'none');
          $('#noStart').css('display', 'block');
        } else {
          if(NowTime < tw) {
            EndTime = tw;
            $('#stopNow').css('display', 'none');
            $('#startNow').css('display', 'none');
            $('#noStart').css('display', 'block');
          } else if(NowTime >= tw && NowTime < ei) {
            EndTime = ei;
            $('#stopNow').css('display', 'none');
            $('#startNow').css('display', 'block');
            $('#noStart').css('display', 'none');
          }else if(NowTime < tw1){
            EndTime =tw1;
            $('#stopNow').css('display', 'none');
            $('#startNow').css('display', 'none');
            $('#noStart').css('display', 'block');
          } else if(NowTime >= tw1 && NowTime < ei1) {
            EndTime = ei1;
            $('#stopNow').css('display', 'none');
            $('#startNow').css('display', 'block');
            $('#noStart').css('display', 'none');
          }else if(NowTime >= ei1) {
            EndTime = tw + 24 * 60 * 60 * 1000;
            $('#stopNow').css('display', 'block');
            $('#startNow').css('display', 'none');
            $('#noStart').css('display', 'none');
          }
        }
        console.log(EndTime)
        var t = EndTime - NowTime;
        if(t < 1000) {
          window.location.reload();
          clearInterval(timer);
          timer = null;
          return false;
        }
        var d = 0;
        var h = 0;
        var m = 0;
        var s = 0;
        if(t >= 0) {
          d = Math.floor((t / 1000 / 3600) / 24);
          h = Math.floor((t / 1000 / 3600) % 24);
          m = Math.floor((t / 1000 / 60) % 60);
          s = Math.floor(t / 1000 % 60);
          if(d < 10) {
            d = "0" + d;
          }
          if(h < 10) {
            h = "0" + h;
          }
          if(m < 10) {
            m = "0" + m;
          }
          if(s < 10) {
            s = "0" + s;
          }
          $('.hours').html(h);
          $('.min').html(m);
          $('.second').html(s);
        }
      }, 1000)
    }
});