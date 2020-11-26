$(function () {
  // 获取本地存储
  var ID = JSON.parse(localStorage.getItem("ID"));
  $.ajax({
    url: "./json/goods" + ID.code + ".json",
    type: "get",
    dataType: "json",
    success: function (json) {
      var goodsStr = '';
      $.each(json, function (index, item) {
        goodsStr +=
          `
        <div class="container clearfix">
        <div class="main-goods clearfix">
          <div class="goods-img">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="${item.goodsImg1}" alt="">
                </div>
                <div class="swiper-slide">
                  <img src="${item.goodsImg2}" alt="">
                </div>
                <div class="swiper-slide">
                  <img src="${item.goodsImg3}" alt="">
                </div>
              </div>
              <!-- 分页器 -->
              <div class="swiper-pagination"></div>
              <!-- 导航按钮 -->
              <div class="swiper-button-prev swiper-button-black"></div>
              <div class="swiper-button-next swiper-button-black"></div>
            </div>
          </div>
          <div class="goods-desc">
            <h2>${item.goodsName}</h2>
            <p>${item.goodsDesc}</p>
            <div class="goods-price">
              <span>${item.goodsPriceN}</span>
              <del>${item.goodsPriceR}</del>
            </div>
            <div class="goods-url">
              <div class="url">
                江西 九江 庐山市
              </div>
            </div>
            <div class="goods-type">
              <h3>${item.goodsTypeT}</h3>
              <p>${item.goodsTypeC}</p>
            </div>
            <div class="goods-all">
              <div class="all-t">
                <span>${item.goodsName}</span>
                <em>${item.goodsPriceN}<del>${item.goodsPriceR}</del></em>
              </div>
              <div class="all-b">总计：${item.goodsPriceN}</div>
            </div>
            <div class="goods-buy">
              <div code="${item.code}" class="buy-add">
                <a href="#">
                  加入购物车
                </a>
              </div>
              <div class="buy-like">
                <a href="#">
                  喜欢
                </a>
              </div>
            </div>
            <div class="goods-safeguard">
              <img src="./img/safeguard.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="main-banner">
        <div class="container">
          <img src="${item.goodsImg4}" alt="">
          <img src="${item.goodsImg5}" alt="">
          <img src="${item.goodsImg6}" alt="">
          <img src="${item.goodsImg7}" alt="">
        </div>
      </div>
        `
      })
      $('#main').html(goodsStr);
      localStorage.removeItem("ID");
    }
  })
  // 通过事件委托绑定点击事件
  $('#main').on('click', '.buy-add', function () {
    // 存储当前商品id
    var code = $(this).attr('code');
    // 判断当前存储是否存在商品数据
    if (localStorage.getItem("goods")) {
      // 有的话把对象添加到一个新建数组里(方便遍历拿到每一个对象)
      // 因为拿到的数据是字符串，所以通过JSON.parse转成对象
      var liArr = JSON.parse(localStorage.getItem("goods"));
      // console.log(liArr)
    } else {
      // 没有的话把他设置成空就行
      var liArr = [];
    }
    // 通过遍历数组从而拿到每个数据
    // 定义一个监听器来监听是否存在
    var flag = true;
    $.each(liArr, function (index, item) {
      // 判断我们当前点击的商品是否已经存在
      if (code === item.code) {
        item.num++;
        flag = false;
        // 只要执行一次就证明数据存在就立即结束遍历(提高性能)
        return false;
      }
    })
    // 如果不存在数据就插入数据
    if (flag) {
      liArr.push({ code: code, num: 1 })
    }
    // 更新本地存储
    localStorage.setItem("goods", JSON.stringify(liArr));
    // 提示语
    alert('添加购物车成功');
  })
})