<%--
  Description : 공통코드 등록
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
		
			
			// 등록 버튼 클릭
			$("#saveBtn").click(function(){
				fn_save();
			});
			
			// 초기화 버튼 클릭
			$("#resetBtn").click(function(){
				
				$.each($("#cmmForm").find("input:not(:hidden)"), function(idx, obj){
					
					$(obj).val("");
				});
				
			});
						
		});
		
		function fn_save(){
			
			// validation check		
			if(!cmm_chkValidation("cmmForm")){
				return false;
			}
					
			document.cmmForm.submit();
		}
		
		
		
	</script>
  </head>
  <body>
    <div class="templatemo-flex-row">
    
    
      <!-- Left column -->
	  <c:import url="/PageLink.do?link=web/z/left" />
      
      <!-- Main content -->
      <div class="templatemo-content col-1 light-gray-bg">
      
      
        <!-- header -->
	 	<c:import url="/PageLink.do?link=web/z/header" />
      
        <div class="templatemo-content-container">
          <div class="templatemo-content-widget white-bg">
            <h2 class="margin-bottom-10">공통코드 등록</h2>
            <!-- <p></p> -->
            
			<form:form name="cmmForm" id="cmmForm" method="post" action="/cmm/insert.do" modelAttribute="cmmSVO" >
			  <input type="hidden" name="screenId" value="UWEBDA001" />
			  
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="cmmCd">공통코드</label>
                    <input type="text" class="form-control" id="cmmCd" name="cmmCd" placeholder="C01" required maxlength="3">            
                </div>
                
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="cmmNm">공통코드명</label>
                    <input type="text" class="form-control" id="cmmNm" name="cmmNm" required maxlength="20">                  
                </div> 
              </div>
              
              <div class="form-group text-right">
                <button type="button" id="saveBtn"  class="templatemo-blue-button">등록</button>
                <button type="button" id="resetBtn" class="templatemo-white-button">초기화</button>
              </div>     
              </form:form>                     
          </div>
          
          <!-- footer  -->
	 	  <c:import url="/PageLink.do?link=web/z/footer" />
        </div>
      </div>
      
      
    </div>

  </body>
</html>