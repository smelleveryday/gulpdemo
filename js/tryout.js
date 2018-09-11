function setcookie(cname, cvalue, ctime){
  var d = new Date();
  d.setTime(d.getTime() + ctime*3600*24*1000)
  var expires = "expires=" + d.toGMTString()
  document.cookie = cname + "=" + cvalue + ";" + expires;
}
function getcookie (cname) {
  var arr = document.cookie.split(';')
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i].split('=')
    if (temp[0] == cname) {
      return temp[1];
    }
  }
  return null;
}
function delcookie (cname) {
  var exp = new Date();
  exp.setTime(exp.getTime() -1)
  var cval = getcookie(cname)
  if (cval != null) {
    document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
$(function () {
  var token = getcookie('token')
  var orright = false
  $('.contactphone').on('input',function () {
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (reg.test($('.contactphone').val()) == true) {
      orright = true
      $('.contact').css({'display': 'none'})
    } else{
      orright = false
      $('.contact').css({'display': 'block'})
    }
  })
  $('.appendbtn').click(function () {
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (reg.test($('.contactphone').val()) == true) {
      orright = true
      $('.contact').css({'display': 'none'})
    } else{
      orright = false
      $('.contact').css({'display': 'block'})
    }
    var datas = {
      'token': token,
      'name': $('.confirmuser').val(),
      'mobile': $('.contactphone').val(),
      'mail': $('.confirmemail').val(),
      'company': $('.confirmcompany').val(),
      'trades': $('.confirmscale').val(),
      'scale': $('.confirmtrades').val(),
      'address': $('.confirmaddress').val(),
      'area': $('.confirmarea').val()
    }
    // if (token !== null) {
      if (orright == true) {
        var index = layer.load(1, {
          shade: [0.1,'#fff'] //0.1透明度的白色背景
        });
        $.ajax({
          type: 'get',
          url: 'http://192.168.7.145:60001/api/Activity/ApplyTryout',
          data: datas,
          async: true,
          success: function (data) {
            layer.close(index)
            if (data.code == 0) {
              window.location.href = 'usercenter.html'
            } else if (data.code == 1) {
              layer.msg(data.msg)
            }
          },
          error: function (data) {
  
          }
        })
      } else {
        $('.contact').css({'display': 'block'})
      }
    // } else {
    //   if (confirm('123')) {
    //     alert(123)
    //   }else {
    //     alert(345)
    //   }
    // }
  })
})