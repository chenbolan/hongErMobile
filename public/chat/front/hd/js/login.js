window.onload = function () {
  var accountText = document.getElementById("j-account");
  var tokenText = document.getElementById("j-secret");
  var loginBtn = document.getElementById("j-loginBtn");
    var loginBtn2 = document.getElementById("j-loginBtn2");

  loginBtn.onclick = function () {
      //var accid = accountText.value;
      //var token = MD5(tokenText.value);
      var accid = "e10000017";
      var token = "b1576ad185834d2794da4a7ece835593";

      if (accid === '' || token === ''){
          alert("用户名或密码不能为空！");
      } else {
          setCookie("accid",accid);
          setCookie("token",token);
          window.location.href = './Main.html';
      }
  }

    loginBtn2.onclick = function () {
        //var accid = accountText.value;
        //var token = MD5(tokenText.value);
        var accid = "e10000016";
        var token = "9ea5c73d54274b418cafade63baa86c3";

        if (accid === '' || token === ''){
            alert("用户名或密码不能为空！");
        } else {
            setCookie("accid",accid);
            setCookie("token",token);
            window.location.href = './Main.html';
        }
    }
};