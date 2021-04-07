<%--
  Description : 사용자정보 목록
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

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
		
			
			// 검색 버튼 클릭
			$("#searchBtn").click(function(){
				fn_search();
			});
			
		});
		
		function web_start(){
			
			if ("<c:out value='${result}'/>" == "S") {
				jAlert("<c:out value='${msg}'/>", "알림");
	        }
		}
		
		function fn_search(){
			
			// validation check		
					
			document.userForm.submit();
		}

	    function fn_pageNoSearch(pageNo) {
	        document.userForm.pageIndex.value = pageNo; 
	        document.userForm.submit();  
	    }
	    
	    function fn_detail(userNo){

	        document.userForm.userNo.value = userNo; 
	        document.userForm.action="/user/detail.do" 
	        document.userForm.submit();  
	    }
		
	</script>
  </head>
  <body  onload="web_start();">
    <div class="templatemo-flex-row">
    
      <!-- Left column -->
	  <c:import url="/PageLink.do?link=web/z/left" />
      
      <!-- Main content -->
      <div class="templatemo-content col-1 light-gray-bg">
      
      
        <!-- header -->
	 	<c:import url="/PageLink.do?link=web/z/header" />
      
        <div class="templatemo-content-container">
          
          <div class="templatemo-content-widget white-bg board">
            <h2 class="margin-bottom-10">사용자정보</h2>
           <!--  <p>사용자정보를 조회합니다.</p> -->
            
	        <!-- Search box -->     
			<form:form name="userForm" id="userForm" method="post" action="/user/list.do" modelAttribute="searchVO" >
				<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
				<input type="hidden" name="screenId" value="UWEBAB002" />
				<input type="hidden" name="userNo"  value=""/>
				
			    <div class="search-wrap">         
			      <ul class="search">
			      	<li>
			            <select name="searchCnd" class="form-control">
			              <option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if> >사용자명</option>
			              <option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if> >아이디</option>
			              <option value="2" <c:if test="${searchVO.searchCnd == '2'}">selected="selected"</c:if> >핸드폰번호</option>
			            </select>
			      	</li>
			      	<li>
			      	  <input type="text" class="form-control" id="search" name="searchWrd" value='<c:out value="${searchVO.searchWrd}"/>'  placeholder="search..." required maxlength="35">
			      	</li>
			      	<li><button type="button" id="searchBtn"  class="btn btn-default">GO</button></li>
			      	<li><a href="<c:url value='/user/insertView.do'/>"><button type="button" id="insertBtn"  class="btn btn-info">신규등록</button></a></li>
			      </ul>
			    </div>
		    </form:form>
             
            <div class="table-responsive">
	             <table class="table table-striped table-bordered templatemo-user-table">
	               <thead>
	                 <tr>
	                   <td>번호</td>
	                   <td>아이디</td>
	                   <td>사용자명</td>
	                   <td>핸드폰번호</td>
	                   <td>수정</td>
	                 </tr>
	               </thead>
	               <tbody>
	               
                    <c:forEach var="userDVO" items="${resultList}" varStatus="status">
                    <!-- loop 시작 -->   
		                 <tr>
		                   <td><c:out value="${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageSize + status.count)}"/></td>
		                   <td><c:out value='${userDVO.userId}'/></td>
		                   <td><c:out value='${userDVO.userNm}'/></td>
		                   <td><c:out value='${userDVO.hpNo}'/></td>
		                   <td><a href="javascript:void(0)" onclick="fn_detail('<c:out value='${userDVO.userNo}'/>')" class="templatemo-edit-btn">Edit</a></td>
		                 </tr> 
                    </c:forEach>               
	               </tbody>
	             </table>    
	        </div> 
          
            <!-- 페이지 네비게이션 시작 -->
            <div class="pagination-wrap">            
              <ul class="pagination">
                 <ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="fn_pageNoSearch" /> 
              </ul>
            </div> 
            <!-- //페이지 네비게이션 끝 -->  
                      
        </div>
        
          <!-- footer  -->
	 	  <c:import url="/PageLink.do?link=web/z/footer" />
      </div>
    </div>
  	</div>
  </body>
</html>