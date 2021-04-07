<%--
  Description : header
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import ="egovframework.com.cmm.LoginVO" %>


        <!-- header -->
        <div class="templatemo-top-nav-container">
          <div class="row">
            <nav class="templatemo-top-nav col-lg-12 col-md-12">
              <ul class="text-uppercase">
                <li><a href="" class="active">Admin panel</a></li>
                <li><a href="">Dashboard</a></li>
                <li><a href="">Overview</a></li>
                
                <%
      			    LoginVO loginVO = (LoginVO)session.getAttribute("LoginVO"); 
				    if(loginVO == null){ 
				%>
            		<li><a href="<c:url value='/webLoginUsr.do'/>">로그인</a></li>
				<% }else { %>
					
   					<c:set var="loginId" value="<%= loginVO.getId()%>"/>
            		<%-- <li><a href="javascript:void(0)"><c:out value="${loginId}"/></a></li> --%>
            		<%-- <li><a href="<c:url value='/uat/uia/actionLogout.do'/>">(<c:out value="${loginId}"/>) 로그아웃</a></li> --%>
				<% } %>    
    
              </ul>
            </nav>
          </div>
        </div>
      