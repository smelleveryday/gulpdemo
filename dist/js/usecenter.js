"use strict";function setcookie(e,t,a){var o=new Date;o.setTime(o.getTime()+3600*a*24*1e3);var s="expires="+o.toGMTString();document.cookie=e+"="+t+";"+s}function getcookie(e){for(var t=document.cookie.split(";"),a=0;a<t.length;a++){var o=t[a].split("=");if(o[0]==e)return o[1]}return null}function delcookie(e){var t=new Date;t.setTime(t.getTime()-1);var a=getcookie(e);null!=a&&(document.cookie=e+"="+a+";expires="+t.toGMTString())}$(function(){var e=getcookie("token");if($(".basic").click(function(){$(".left-style").removeClass("active"),$(".basic").addClass("active"),$(".information-right-1").css({display:"block"}),$(".information-right-2").css({display:"none"})}),$(".order").click(function(){$(".left-style").removeClass("active"),$(".order").addClass("active"),$(".information-right-1").css({display:"none"}),$(".information-right-2").css({display:"block"})}),null!==e){var a="";$.ajax({type:"get",url:"http://192.168.7.145:60001/api/Activity/ApplyOrders",data:{token:e},async:!0,success:function(e){if(0==e.code){for(var t=0;t<e.data.length;t++)a+='<div class="form-body">\n            <p class="form-time">'+e.data[t].applytime+'</p>\n            <p class="form-status">'+(0===e.data[t].status?"开通中":1===e.data[t].status?"已开通":"已失败")+'</p>\n            <p class="form-address"><a href="'+e.data[t].publicIp+'" target="_blank">'+(null===e.data[t].publicIp?"":e.data[t].publicIp)+'</a></p>\n            <p class="form-tryouttime">'+e.data[t].endDate+"</p>\n          </div>";$(".form").append(a)}else 1==e.code?layer.msg(e.msg):401==e.code&&(delcookie("token"),$(".loginout").css({display:"none"}),$(".login-bg").css({display:"block"}),layer.msg("登录过期请从新登录！"),location.reload())},error:function(e){console.log(e)}})}null!==e&&$.ajax({type:"get",url:"http://192.168.7.145:60001/api/Activity/ApplyInfo",data:{token:e},async:!0,success:function(e){0==e.code?($(".username").html(e.data.name),$(".userphone").html(e.data.mobile),$(".useremal").html(e.data.mail),$(".usercom").html(e.data.company),$(".userscale").html(e.data.scale),$(".userindustry").html(e.data.trades),$(".useraddress").html(e.data.address)):1==e.code?layer.msg(e.msg):401==e.code&&(delcookie("token"),$(".loginout").css({display:"none"}),$(".login-bg").css({display:"block"}),layer.msg("登录过期请从新登录！"),location.reload())},error:function(e){console.log(e)}})});