"use strict";

// 获取所需要用到的值
var user = document.querySelector('.ipt-user');
var pwd = document.querySelector('.ipt-pwd');
var login = document.querySelector('.sub-login'); // 当点击登录按钮时

login.onclick = function () {
  // 获取账号密码
  var userVal = user.value;
  var pwdVal = pwd.value; // 空值判断

  if (!userVal || !pwdVal) {
    alert('账号或密码不能为空');
    return;
  } // ajax请求


  ajax({
    url: "../php/login-r.php",
    type: "POST",
    data: {
      user: userVal,
      pwd: pwdVal,
      type: "login"
    },
    dataType: "json",
    success: function success(json) {
      alert(json.msg);
    },
    error: function error(code) {
      alert(code);
    }
  });
};