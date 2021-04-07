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
		
			
			// 등록 버튼 클릭
			$("#saveBtn").click(function(){
				fn_save();
			});
			
			// 초기화 버튼 클릭
			$("#resetBtn").click(function(){
				
				$.each($("#userForm").find("input:not(:hidden)"), function(idx, obj){
					
					$(obj).val("");
				});
				
				$("#etcCntn").val("");
			});
						
		});
		
		function fn_save(){
			
			// validation check		
			if(!cmm_chkValidation("userForm")){
				return false;
			}

			// 사용자분류코드
			if(cmm_isNull($("#userClsfCd").val())){
				jWarningAlert("사용자분류는 필수선택사항입니다.","경고",function() {
					$("#userClsfCd").focus();
				});
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
					
			document.userForm.submit();
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
            <h2 class="margin-bottom-10">사용자정보 등록</h2>
            <!-- <p></p> -->
            
			<form:form name="userForm" id="userForm" method="post" action="/user/insert.do" modelAttribute="userSVO" >
			  <input type="hidden" name="screenId" value="UWEBAB001" />
			  
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userId">아이디</label>
                    <div class="input-group">
	                    <input type="text" class="form-control" id="userId" name="userId" placeholder="아이디 중복체크하세요" required maxlength="50"> 
	                    <div class="input-group-addon"><a href="javascript:void(0)" id="dupCheck" ><i class="fa fa-check fa-fw"></i></a></div>           
                    </div>
                </div>
                
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userNm">사용자명</label>
                    <input type="text" class="form-control" id="userNm" name="userNm" placeholder="홍길동" required maxlength="50">                 
                </div> 
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userClsfCd">사용자분류선택</label>   
                    <select class="form-control" id="userClsfCd" name="userClsfCd" style="overflow-y: scroll;">
                      <option value="">----선택----</option>
                      <option value="01">관리자(원장)</option>
                      <option value="02">선생님</option>
                      <option value="03">일반</option>
                    </select>     
                </div>
                
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userAdr">주소</label>
                    <input type="text" class="form-control" id="userAdr" name="userAdr" placeholder="세종특별시 나성동" required maxlength="50" >                  
                </div>
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="hpNo">핸드폰번호</label>
                    <input type="text" class="form-control" id="hpNo" name="hpNo" placeholder="010-1234-1234" required maxlength="13" >                  
                </div>
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="emlAdr">Email</label> 
                    <input type="email" class="form-control" id="emlAdr" name="emlAdr" placeholder="admin@company.com" maxlength="50" >                  
                </div> 
              </div>
              
              <div class="row form-group">
                <div class="col-lg-12 form-group">                   
                    <label class="control-label" for="etcCntn">기타내용</label>
                    <textarea class="form-control" id="etcCntn" name="etcCntn" rows="5" ></textarea>
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