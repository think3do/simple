<%--
  Description : 고객정보 등록
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%




%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Visual Admin Dashboard - Preferences</title>
    <meta name="description" content="">
    <meta name="author" content="templatemo">
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <!-- JS -->
    <script type="text/javascript" src="/js/common.js"></script>        <!-- jQuery -->

		
	<script type="text/javascript">
	
		//************************************************************************
		// 버튼 클릭
		//************************************************************************
		$(function(){
		
			
			// 결과확인 버튼 클릭
			$("#loginBtn").click(function(){
				fn_login();
			});
			
			// 다음 버튼 클릭
			$("#resetBtn").click(function(){
				
			});
						
		});
		
		function fn_login(){
			
		    if (document.loginForm.id.value =="") {
		        alert("아이디를 입력하세요");
		        return false;
		    } else if (document.loginForm.password.value =="") {
		        alert("비밀번호를 입력하세요");
		        return false;
		    } else {
		        document.loginForm.action="<c:url value='/uat/uia/actionLogin.do'/>";
		        document.loginForm.submit();
		    }
		}
		
		function setCookie (name, value, expires) {
		    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
		}

		function getCookie(Name) {
		    var search = Name + "="
		    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
		        offset = document.cookie.indexOf(search)
		        if (offset != -1) { // 쿠키가 존재하면
		            offset += search.length
		            // set index of beginning of value
		            end = document.cookie.indexOf(";", offset)
		            // 쿠키 값의 마지막 위치 인덱스 번호 설정
		            if (end == -1)
		                end = document.cookie.length
		            return unescape(document.cookie.substring(offset, end))
		        }
		    }
		    return "";
		}

		function saveid(form) {
		    var expdate = new Date();
		    // 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
		    if (form.checkId.checked)
		        expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30일
		    else
		        expdate.setTime(expdate.getTime() - 1); // 쿠키 삭제조건
		    setCookie("saveid", form.id.value, expdate);
		}

		function getid(form) {
		    form.checkId.checked = ((form.id.value = getCookie("saveid")) != "");
		}

		function web_start() {
			
		    var message = document.loginForm.message.value;
		    if (message != "") {
		    	jAlert(message, "알림");
		    }
		    getid(document.loginForm);
		}
		
	</script>
  </head>
<body  onload="web_start();" class="light-gray-bg">
	<div class="templatemo-content-widget templatemo-login-widget white-bg">
		<header class="text-center">
          <div class="square"></div>
          <h1>Visual Admin</h1>
        </header>
        
        	<form:form name="loginForm" method="post" action="#LINK" class="templatemo-login-form">
            <input type="hidden" name="message" value="${message}" />
			<input type="hidden" name="userSe"  value="USR"/>
	        	<div class="form-group">
	        		<div class="input-group">
		        		<div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>	        		
		              	<input type="text" id="id" name="id" maxlength="10" class="form-control" placeholder="아이디" >           
		          	</div>	
	        	</div>
	        	<div class="form-group">
	        		<div class="input-group">
		        		<div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" id="password" name="password" maxlength="25" class="form-control" placeholder="비밀번호" >           
		          	</div>	
	        	</div>	          	
	          	<div class="form-group">
				    <div class="checkbox squaredTwo">
				        <input type="checkbox" name="checkId" onclick="javascript:saveid(this.form);" id="checkId" />
						<label for="c1"><span></span>Remember me</label>
				    </div>				    
				</div>
				<div class="form-group">
					<button type="button" id="loginBtn" class="templatemo-blue-button width-100">Login</button>
				</div>
        	</form:form>
	</div>
	<div class="templatemo-content-widget templatemo-login-widget templatemo-register-widget white-bg">
		<p>Not a registered user yet? <strong><a href="#" class="blue-text">Sign up now!</a></strong></p>
	</div>
</body>
</html>