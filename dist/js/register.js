"use strict";

// 获取所需要用到的值
var user = document.querySelector('.user');
var pwd = document.querySelector('.pwd');
var register = document.querySelector('.register'); //注册

register.onclick = function () {
  var userVal = user.value;
  var pwdVal = pwd.value; // 验证

  if (!userVal || !pwdVal) {
    return;
  } //调用ajax


  ajax({
    url: "./php/login-r.php",
    type: "post",
    data: {
      user: userVal,
      pwd: pwdVal,
      type: "register"
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