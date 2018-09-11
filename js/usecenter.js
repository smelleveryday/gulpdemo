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
   //个人中心的基本信息和订单信息
   $('.basic').click(function () {
    $('.left-style').removeClass('active')
    $('.basic').addClass('active')
    $('.information-right-1').css({'display': 'block'})
    $('.information-right-2').css({'display': 'none'})
  })
  $('.order').click(function () {
    $('.left-style').removeClass('active')
    $('.order').addClass('active')
    $('.information-right-1').css({'display': 'none'})
    $('.information-right-2').css({'display': 'block'})
  })
 //订单信息-----------------------------------------
    if (token !== null) {
      var htmls = ''
      $.ajax({
        type: 'get',
        url: 'http://192.168.7.145:60001/api/Activity/ApplyOrders',
        data: {'token': token},
        async: true,
        success: function (data) {
          if (data.code == 0) {
          for (var i=0; i< data.data.length; i++) {
            htmls += `<div class="form-body">
            <p class="form-time">${data.data[i].applytime}</p>
            <p class="form-status">${data.data[i].status === 0? '开通中': data.data[i].status ===1? '已开通' : '已失败'}</p>
            <p class="form-address"><a href="${data.data[i].publicIp}" target="_blank">${data.data[i].publicIp === null? '': data.data[i].publicIp}</a></p>
            <p class="form-tryouttime">${data.data[i].endDate}</p>
          </div>`
          }
          $('.form').append(htmls)
         } else if (data.code == 1) {
           layer.msg(data.msg)
         } else if (data.code == 401) {
            delcookie('token')
            $('.loginout').css({'display': 'none'})
            $('.login-bg').css({'display': 'block'})
            layer.msg('登录过期请从新登录！')
            location.reload()
          }
        },
        error: function (data) {
          console.log(data)
        }
      })
    }
  if (token !== null) {
//基本信息----------------------------------
      $.ajax({
        type: 'get',
        url: 'http://192.168.7.145:60001/api/Activity/ApplyInfo',
        data: {'token': token},
        async: true,
        success: function (data) {
          if (data.code == 0) {
            $('.username').html(data.data.name)
            $('.userphone').html(data.data.mobile)
            $('.useremal').html(data.data.mail)
            $('.usercom').html(data.data.company)
            $('.userscale').html(data.data.scale)
            $('.userindustry').html(data.data.trades)
            $('.useraddress').html(data.data.address)
          } else if (data.code == 1) {
            layer.msg(data.msg)
          } else if (data.code == 401) {
            delcookie('token')
            $('.loginout').css({'display': 'none'})
            $('.login-bg').css({'display': 'block'})
            layer.msg('登录过期请从新登录！')
            location.reload()
          }
        },
        error: function (data) {
          console.log(data)
        }
      })
    }
})