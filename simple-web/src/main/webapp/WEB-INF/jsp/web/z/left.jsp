<%--
  Description : left menu
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import ="egovframework.com.cmm.LoginVO" %>

    
      <!-- Left column -->
      <div class="templatemo-sidebar">
        <header class="templatemo-site-header">
          <div class="square"></div>
          <h1>Visual Admin</h1>
        </header>
        <div class="profile-photo-container">
          <img src="/images/profile-photo.jpg" alt="Profile Photo" class="img-responsive">
          <div class="profile-photo-overlay"></div>
        </div>
        <!-- Search box -->
        <form class="templatemo-search-form" role="search">
          <div class="input-group">
              <button type="submit" class="fa fa-search"></button>
              <input type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term">
          </div>
        </form>
        <div class="mobile-menu-icon">
            <i class="fa fa-bars"></i>
          </div>
        <nav class="templatemo-left-nav">
          <ul>
            <li><a href="<c:url value='/cmm/main/mainPage.do'/>"><i class="fa fa-home fa-fw"></i>Simple 메인페이지</a></li>
 

            <li><a href="/user/list.do"><i class="fa fa-users fa-fw"></i>사용자관리</a></li>
            <li><a href="/cstm/listCstm.do"><i class="fa fa-users fa-fw"></i>고객정보</a></li>
            <li><a href="/PageLink.do?link=web/b/a/UWEBBA001"><i class="fa fa-users fa-fw"></i>일정관리</a></li>
            <li><a href="/PageLink.do?link=web/b/a/UWEBBA004"><i class="fa fa-users fa-fw"></i>달력</a></li>
            <li><a href="/cmm/list.do"><i class="fa fa-users fa-fw"></i>공통코드관리</a></li>
            <li><a href="data-visualization.html"><i class="fa fa-bar-chart fa-fw"></i>Charts</a></li>
            <li><a href="data-visualization.html"><i class="fa fa-database fa-fw"></i>Data Visualization</a></li>
            <li><a href="maps.html"><i class="fa fa-map-marker fa-fw"></i>Maps</a></li>
            <li><a href="preferences.html" ><i class="fa fa-sliders fa-fw"></i>Preferences</a></li>
            
                <%
      			    LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO"); 
				    if(loginVO == null){ 
				%>
            		<li><a href="<c:url value='/webLoginUsr.do'/>"><i class="fa fa-eject fa-fw"></i>로그인</a></li>
				<% }else { %>
					
   					<c:set var="loginId" value="<%= loginVO.getId()%>"/>
		            <li><a href="<c:url value='/uat/uia/actionLogout.do'/>"><i class="fa fa-eject fa-fw"></i> <c:out value="${loginId}"/>님&nbsp;&nbsp; 로그아웃</a></li>
				<% } %> 
<!--             <li><a href="#" class="active"><i class="fa fa-sliders fa-fw"></i>Preferences</a></li> -->
          </ul>
        </nav>
      </div>