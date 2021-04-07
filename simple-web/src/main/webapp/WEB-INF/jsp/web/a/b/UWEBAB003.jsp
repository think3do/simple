<%--
  Description : 사용자정보 등록
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
		
			
			// 목록 버튼
			$("#listBtn").click(function(){
				
				fn_list();
			});
			
			// 수정 버튼 클릭
			$("#updateBtn").click(function(){

		    	jConfirm("수정하시겠습니까?","확인", function(){

					fn_update();
		    	});
			});
			// 삭제 버튼 클릭
			$("#deleteBtn").click(function(){

				fn_delete();
			});
						
		});

		// 시작
		function web_start(){
			
			if ("<c:out value='${result}'/>" == "S" && !cmm_isNull("<c:out value='${msg}'/>") ) {
				jAlert("<c:out value='${msg}'/>", "알림");
	        }
		}
		
		// 목록으로 이동
		function fn_list(){
			
			document.userForm.action="/user/list.do";
			document.userForm.submit();
		}
		
		// 삭제 버튼
	    function fn_delete(){

	    	jConfirm("삭제하시겠습니까?","확인", function(){

		        document.userForm.action="/user/delete.do" 
		        document.userForm.submit();  
	    	});
	    }

		// 수정 버튼
		function fn_update(){
			
			// validation check		
			if(!cmm_chkValidation("userForm")){
				return false;
			}
			
			// 핸드폰번호
			if(!cmm_chkCellPhone($("#hpNo").val())){
				jWarningAlert("핸드폰번호 형식이 아닙니다.","경고",function() {
					$("#hpNo").focus();
				});
				return false;
			}
			// 이메일
			if(!cmm_isNull($("#emlAdr").val()) && !cmm_chkEmail($("#emlAdr").val())){
				jWarningAlert("이메일 형식이 아닙니다.","경고",function() {
					$("#emlAdr").focus();
				});
				return false;
			}
			// 전화번호
			if(!cmm_isNull($("#telNo").val()) && !cmm_chkPhone($("#telNo").val())){
				jWarningAlert("전화번호 형식이 아닙니다.","경고",function() {
					$("#telNo").focus();
				});
				return false;
			}

	        document.userForm.action="/user/update.do" 
	        document.userForm.submit(); 
		}
		
	</script>
  </head>
  <body onload="web_start();">
    <div class="templatemo-flex-row">
    
    
      <!-- Left column -->
	  <c:import url="/PageLink.do?link=web/z/left" />
      
      <!-- Main content -->
      <div class="templatemo-content col-1 light-gray-bg">
      
      
        <!-- header -->
	 	<c:import url="/PageLink.do?link=web/z/header" />
      
        <div class="templatemo-content-container">
          <div class="templatemo-content-widget white-bg">
            <h2 class="margin-bottom-10">사용자정보수정</h2>
            <!-- <p></p> -->
            
			<form:form name="userForm" id="userForm" method="post" action="/user/update.do" modelAttribute="userSVO" >
			  <input type="hidden" name="screenId" value="UWEBAB003" />
			  <input type="hidden" name="userNo" value="<c:out value='${userDVO.userNo}'/>"/>
			  <input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
			  <input type="hidden" name="searchCnd" value="<c:out value='${searchVO.searchCnd}'/>"/>
			  <input type="hidden" name="searchWrd" value="<c:out value='${searchVO.searchWrd}'/>"/>
			  
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userId">아이디</label>
                    <input type="text" class="form-control" id="userId" name="userId" value="<c:out value='${userDVO.userNm}'/>"  readonly="readonly" > 
                </div>
                
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userNm">사용자명</label>
                    <input type="text" class="form-control" id="userNm" name="userNm" placeholder="홍길동" required maxlength="50" value="<c:out value='${userDVO.userNm}'/>" >                 
                </div> 
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userClsfCd">사용자분류</label>   
                    <input type="text" class="form-control" id="userClsfCd" name="userClsfCd" value="<c:out value='${userDVO.userClsfCd}'/>" readonly="readonly" >
                </div>
                
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userAdr">주소</label>
                    <input type="text" class="form-control" id="userAdr" name="userAdr" placeholder="세종특별시 나성동" required maxlength="50"  value="<c:out value='${userDVO.userAdr}'/>"  >                  
                </div>
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="hpNo">핸드폰번호</label>
                    <input type="text" class="form-control" id="hpNo" name="hpNo" placeholder="010-1234-1234" required maxlength="13"  value="<c:out value='${userDVO.hpNo}'/>"  >                  
                </div>
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="emlAdr">Email</label> 
                    <input type="email" class="form-control" id="emlAdr" name="emlAdr" placeholder="admin@company.com" maxlength="50"  value="<c:out value='${userDVO.emlAdr}'/>"  >                  
                </div> 
              </div>
              
              <div class="row form-group">
                <div class="col-lg-12 form-group">                   
                    <label class="control-label" for="etcCntn">기타내용</label>
                    <textarea class="form-control" id="etcCntn" name="etcCntn" rows="5" >  <c:out value='${userDVO.etcCntn}'/>  </textarea>
                </div>
              </div>
              
              <div class="form-group text-right">
                <button type="button" id="listBtn"   class="templatemo-blue-button" >목록</button>
                <button type="button" id="updateBtn" class="templatemo-blue-button" >수정</button>
                <button type="button" id="deleteBtn" class="templatemo-white-button">삭제</button>
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