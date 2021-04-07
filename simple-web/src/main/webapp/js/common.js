

document.write("<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,700' />");
document.write("<link rel='stylesheet' type='text/css' href='/css/font-awesome.min.css' />");
document.write("<link rel='stylesheet' type='text/css' href='/css/bootstrap.min.css' />");
document.write("<link rel='stylesheet' type='text/css' href='/css/templatemo-style.css' />");
document.write("<link rel='stylesheet' type='text/css' href='/css/style.css' />");


// jquery Javascript
document.write("<script src='/js/jquery-1.11.2.min.js'></script>");
document.write("<script src='/js/jquery/jquery.bpopup.min.js'></script>");
document.write("<script src='/js/bootstrap-filestyle.min.js'></script>");
document.write("<script src='/js/templatemo-script.js'></script>");

document.write("<script>$(document).on('mobileinit', function() {");
document.write("$.mobile.ignoreContentEnabled=true;");
document.write("$.mobile.ajaxEnabled=false;");
document.write("$.support.cors = true;");
document.write("$.mobile.allowCrossDomainPages=true;");
document.write("});</script>");
document.write("<script>$(function() {$('body').attr('data-enhance', false);});</script>");
document.write("<script>$(function() {$('#wrap').attr('data-role', 'page');});</script>");
document.write("<script>$(function() {$('#wrap').attr('data-role', 'page').attr('data-dom-cache',true);});</script>");

//userAgen Javascript
document.write("<script>sessionStorage.setItem('orgUserAgent',navigator.userAgent);</script>");
document.write("<script>if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) {");
document.write("sessionStorage.setItem('userAgent','s:iOS');");
document.write("} else if(navigator.userAgent.indexOf('Android511') > 0) {");
document.write("sessionStorage.setItem('userAgent','s:Android');");
document.write("} else if(navigator.userAgent.indexOf('AndroidNew') > 0) {");
document.write("sessionStorage.setItem('userAgent','s:Android');");
document.write("} else if(navigator.userAgent.indexOf('Android') > 0) {");
document.write("sessionStorage.setItem('userAgent','s:Android');");
document.write("} else {");
document.write("sessionStorage.setItem('userAgent','s:none');");
document.write("}</script>");

//swip Javascript
//document.write("<script src='js/iSwiper/swiper.min.js'></script>");
//document.write("<link rel='stylesheet' type='text/css' href='js/iSwiper/swiper.min.css' />");

//Common Javascript
document.write("<script src='/js/common_util.js'></script>");
document.write("<script src='/js/layout.js'></script>");

//calendar Javascript
document.write("<script src='/js/jquery/jquery-ui-1.8.1.min.js'></script>");
document.write("<link rel='stylesheet' type='text/css' href='/js/jquery/jquery-ui.css' />");

//jQuery import 바로아래에 넣어 주면 됩니다.
//Cannot read property 'msie' of undefined 에러 나올때
document.write("<script>jQuery.browser = {};(function () { jQuery.browser.msie = false;    jQuery.browser.version = 0;    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {        jQuery.browser.msie = true;        jQuery.browser.version = RegExp.$1;    }})();</script>");


//alert
//document.write("<script src='/js/alert/jquery.alert.js'></script>");
//document.write("<link rel='stylesheet' type='text/css' href='/js/alert/jquery.alert.css' />");

//modal 
document.write("<script src='/js/modal/js/jquery.modal.js'></script>");
document.write("<link rel='stylesheet' type='text/css' href='/js/modal/css/jquery.modal.css' />");

