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
//---------------------------------------------------------------------------------
$(function () {
  $('.user-name').mouseenter(function () {
    $('.user').css({'display':'block'})
    $('.user-name').css({'background': '#191d21'})
    $('.user-name img').attr('src','img/icon1.png')
  })
  $('.user-name').mouseleave(function () {
    $('.user').css({'display': 'none'})
    $('.user-name').css({'background': 'none'})
    if (window.location.href.indexOf('index.html') !== -1 || window.location.href.indexOf('usercenter.html') !== -1) {
      $('.user-name img').attr('src','img/icon1.png')
    } else {
      $('.user-name img').attr('src','img/icon2.png')
    }
  })
  $('.user').mouseenter(function () {
    $('.user').css({'display':'block'})
    $('.user-name').css({'background': '#191d21'})
    $('.user-name img').attr('src','img/icon1.png')
  })
  $('.user').mouseleave(function () {
    $('.user').css({'display':'none'})
    $('.user-name').css({'background': 'none'})
    if (window.location.href.indexOf('index.html') !== -1 || window.location.href.indexOf('usercenter.html') !== -1) {
      $('.user-name img').attr('src','img/icon1.png')
    } else {
      $('.user-name img').attr('src','img/icon2.png')
    }
  })

  //登陆
  $('.loginin').click(function () {
    window.location.href = 'https://cloud.newtouch.com/login?backurl=' + window.location.href
  })
  $('.regist').click(function () {
    window.location.href = 'https://cloud.newtouch.com/register?backurl=' + window.location.href
  })
  //退出
  $('.login-out').click(function () {
    delcookie('token')
    $('.loginout').css({'display': 'none'})
    $('.login-bg').css({'display': 'block'})
    window.location.href = 'index.html'
  })
  //获取用户信息
  var token = window.location.href.split('accessToken=')[1] || getcookie('token')
  if (token !== undefined && token !== null) {
    setcookie('token', token, 1)
	  $.ajax({
	  	type:"get",
	  	data: {'token': token},
	  	url: "http://192.168.7.145:60001/api/Activity/ApplyInfo",
	  	async: true,
	  	success: function (data) {
        if (data.code == 0) {
          $('.login-bg').css({'display': 'none'})
          $('.loginout').css({'display': 'block'})
          $('.user-name span').html(data.data)
        } else if (data.code == 1) {
          layer.msg(data.msg)
        } else if (data.code == 401) {
          delcookie('token')
          $('.loginout').css({'display': 'none'})
          $('.login-bg').css({'display': 'block'})
          layer.msg('登录过期请从新登录！')
        }
	  	},
	  	error: function (data) {
	  		console.log(error)
	  	}
	  });
  }
  //用户中心
  $('.user-centers').click(function () {
  	window.location.href = 'usercenter.html'
  })
  //立即预约是否登陆问题
  $('.experience-button').click(function () {
    if (token !== undefined && token !== null) {
      window.location.href = 'tryout.html'
    } else {
      alert('请先登陆！')
    }
  })
})