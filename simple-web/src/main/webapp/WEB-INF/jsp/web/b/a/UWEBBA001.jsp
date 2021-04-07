<%--
  Description : 고객정보 등록
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
    
    <script type="text/javascript" src="/js/common.js"></script>        <!-- jQuery -->
    
    <script src="/js/jQueryTimeAuto/jquery.timeAutocomplete.js" type="text/javascript"></script>
    <script src="/js/jQueryTimeAuto/formatters/ampm.js" type="text/javascript"></script>
    <script src="/js/jQueryTimeAuto/formatters/24hr.js" type="text/javascript"></script>
    <script src="/js/jQueryTimeAuto/formatters/french.js" type="text/javascript"></script>
    
    <!-- JS -->
    <!-- <link rel="stylesheet" href="/js/jQueryTimeAuto/jquery-ui/css/ui-lightness/jquery-ui-1.10.2.custom.min.css" type="text/css"  /> -->
    <link rel="stylesheet" href="/js/jQueryTimeAuto/jquery-ui/css/ui-lightness/jquery-ui-1.10.2.custom.css" type="text/css"  />

		
	<script type="text/javascript">
	
		/*******************************************
		* 페이지 로딩 이벤트 바인딩
		********************************************/
		$(document).ready( function(){
			
			// 날짜 셋팅
			var d = new Date();
			var year = d.getFullYear();
			var month = cmm_twoZero(d.getMonth() + 1);
			var day = cmm_twoZero(d.getDate());
			var nowYear = d.getFullYear();
			var preYear = cmm_getDay(cmm_getDay(), "Y", -3).substring(0,4);
			
			// 캘린더 옵션 세팅
			/* var calendarOptions = {
				     yearRange : preYear+":"+nowYear		// from~to년도 설정(2011년~2029년), 기본값:2011:2029(현재 년도 기준, 9년 전부터 9년 후까지)
				    ,dateFormat : ""								// 데이터 포맷(2020-02-05), 기본값:yy-mm-dd
				    ,changeYear : ""								// year 셀렉트박스 사용 여부(Y:허용,N:불가), 기본값:Y
				    ,changeMonth : ""							// month 셀렉트박스 허용 여부(Y:허용,N:불가), 기본값:Y
			}; */
	
			$("#schdStartDt").val(year+"-"+month+"-"+day);
			$("#schdEndDt").val(year+"-"+month+"-"+day);
			
			// 모바일 캘린더 변경
			//cmm_bindDatepicker("schdStartDt", calendarOptions);
			//cmm_bindDatepicker("schdEndDt", calendarOptions);
			
			$("#schdStartDtBtn").click(function(){
				cmm_bindDatepicker("schdStartDt", {});
			});
	
			$("#schdEndDtBtn").click(function(){
				cmm_bindDatepicker("schdEndDt", {});
			});
			
			$('#schdStartTime').timeAutocomplete({
			    increment: 10
			});
	
			$('#schdEndTime').timeAutocomplete({
			    increment: 10
			});
			
			
		});
	
		//************************************************************************
		// 버튼 클릭
		//************************************************************************
		$(function(){

			// 고객명 팝업
			$("#cstmNmBtn").click(function(){
				
				var pop_height = Math.min(Number(document.body.clientHeight), 700); 
				var pop_width  = Math.min(Number(document.body.clientWidth ), 420); 

				//var top  = document.body.scrollTop + Math.floor((document.body.clientHeight/2)-(pop_height/2));
				//var left = Math.floor((document.body.scrollWidth/2)-(pop_width/2));
				if( top < 0 ) top = 10;
				
				$('#popup_wrap').bPopup({
					content:'iframe',
		            contentContainer:'.popup_content',
		            position: ['auto', 10],
					iframeAttr: 'scrolling="no" frameborder="0" style="height:'+(pop_height)+'px;width:'+(pop_width)+'px;"',
		            loadUrl: "/cstm/popup/listCstm.do" //Uses jQuery.load()
			    });
				
			});
			
			// 선생님 팝업
			$("#userNmBtn").click(function(){
				
				var pop_height = Math.min(Number(document.body.clientHeight), 700); 
				var pop_width  = Math.min(Number(document.body.clientWidth ), 420); 

				//var top  = document.body.scrollTop + Math.floor((document.body.clientHeight/2)-(pop_height/2));
				//var left = Math.floor((document.body.scrollWidth/2)-(pop_width/2));
				if( top < 0 ) top = 10;
				
				$('#popup_wrap').bPopup({
					content:'iframe',
		            contentContainer:'.popup_content',
		            position: ['auto', 10],
					iframeAttr: 'scrolling="no" frameborder="0" style="height:'+(pop_height)+'px;width:'+(pop_width)+'px;"',
		            loadUrl: "/user/popup/list.do" //Uses jQuery.load()
			    });
				
			});
			
			// 등록 버튼 클릭
			$("#saveBtn").click(function(){
			 	
			});
			
			// 초기화 버튼 클릭
			$("#resetBtn").click(function(){
				
				$.each($("#cstmForm").find("input:not(:hidden)"), function(idx, obj){
					
					$(obj).val("");
				});
				
				$('#sexClCd01').prop('checked', true);
				$('#sexClCd02').prop('checked', false);
				$("#etcCntn").val("");
			});
						
		});
		
				
		// 고객 조회
		function fn_cstmNm_popupCallback(cstmNm, cstmUserNo){
			
			$("#cstmNm").val(cstmNm);
			$("#cstmUserNo").val(cstmUserNo);

			$(".b-close").click();
		}
		
		// 선생님 조회
		function fn_userNm_popupCallback(userNm, userNo){
			
			$("#userNm").val(userNm);
			$("#userNo").val(userNo);

			$(".b-close").click();
		}
		
		function fn_save(){
			
			// validation check		
			if(!cmm_chkValidation("cstmForm")){
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
					
			document.cstmForm.submit();
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
      
        <div class="templatemo-content-container" >
          <div class="templatemo-content-widget white-bg">
            <h2 class="margin-bottom-10">일정등록</h2>
            <!-- <p></p> -->
            
			<form:form name="cstmForm" id="cstmForm" method="post" action="/cstm/insertCstm.do" modelAttribute="cstmSVO" >
			  <input type="hidden" name="screenId"   value="UWEBBA001" />
			  <input type="hidden" name="cstmUserNo" id="cstmUserNo" value="" />
			  <input type="hidden" name="uerNo"      id="userNo" value="" />
			  
              <div class="row form-group">
              
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="cstmNm">고객명</label>
                    <div class="input-group">
                   		<input type="text" class="form-control" id="cstmNm" name="cstmNm" required maxlength="50" readonly="readonly" > 
	                    <div class="input-group-addon"><a href="javascript:void(0)" id="cstmNmBtn" ><i class="fa fa-pencil fa-fw"></i></a></div>   
	                </div>          
                </div>
                
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="userNm">담당선생님</label>                    
                    <div class="input-group">
                   		<input type="text" class="form-control" id="userNm" name="userNm" required maxlength="50" readonly="readonly" > 
	                    <div class="input-group-addon"><a href="javascript:void(0)" id="userNmBtn" ><i class="fa fa-pencil fa-fw"></i></a></div>   
	                </div>                  
                </div> 
                
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="schdStartDt">시작일자</label>
                    <div class="input-group">
	                    <input type="text" class="form-control" id="schdStartDt" name="schdStartDt" required maxlength="10" readonly="readonly" > 
	                    <div class="input-group-addon"><a href="javascript:void(0)" id="schdStartDtBtn" ><i class="fa fa-calendar fa-fw"></i></a></div>
                    </div> 
                </div>
                
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="schdEndDt">종료일자</label>
                    <div class="input-group">
                   		<input type="text" class="form-control" id="schdEndDt" name="schdEndDt" required maxlength="10" readonly="readonly" > 
	                    <div class="input-group-addon"><a href="javascript:void(0)" id="schdEndDtBtn" ><i class="fa fa-calendar fa-fw"></i></a></div>   
	                </div>                
                </div> 
              </div>
              
              <div class="row form-group">
                <div class="col-lg-3 col-md-3 form-group">                  
                    <label for="schdStartTime">시작시간</label>
                    <input type="text" class="form-control f1" id="schdStartTime" name="schdStartTime" required  >
                </div>
                
                <div class="col-lg-3 col-md-3 form-group">                  
                    <label for="schdEndTime">종료시간</label>
                    <input type="text" class="form-control" id="schdEndTime" name="schdEndTime" required readonly="readonly"  >                    
                </div> 
                
                <div class="col-lg-3 col-md-3 form-group">                  
                    <label for="schdStartTime">종료시간 선택</label>   
                    <select class="form-control" id="stlClCd" name="stlClCd" style="overflow-y: scroll;">
                      <option value="ZZ">----선택----</option>
                      <option value="01">20분</option>
                      <option value="02">30분</option>
                      <option value="03">40분</option>
                      <option value="04">50분</option>  
                      <option value="05">60분</option>
                      <option value="06">70분</option>
                    </select>     
                </div>
                
                <div class="col-lg-3 col-md-3 form-group">                  
                    <label for="schdStartTime">상담시간추가여부</label>   
                    <div class="templatemo-block margin-bottom-5">
                      <input type="checkbox" name="emailOptions" id="c1" value="new" > 
                      <label for="c1" class="font-weight-400"><span></span>체크시 10분 추가</label> 
                    </div>          
                </div>
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">         
               		<label for="schdStartTime">요일선택(중복가능)</label>      
               		<div class="templatemo-block margin-bottom-5">
	                    <div class="margin-right-15 templatemo-inline-block">
	                      <input type="checkbox" name="server" id="c3" value="" checked>
	                      <label for="c3" class="font-weight-400"><span></span>월</label>
	                    </div>
	                    <div class="margin-right-15 templatemo-inline-block">                      
	                      <input type="checkbox" name="member" id="c4" value="">
	                      <label for="c4" class="font-weight-400"><span></span>화</label>
	                    </div>
	                    <div class="margin-right-15 templatemo-inline-block">
	                      <input type="checkbox" name="expired" id="c5" value="">
	                      <label for="c5" class="font-weight-400"><span></span>수</label>                      
	                    </div>
	                    <div class="margin-right-15 templatemo-inline-block">
	                      <input type="checkbox" name="expired" id="c5" value="">
	                      <label for="c5" class="font-weight-400"><span></span>목</label>                      
	                    </div>
	                    <div class="margin-right-15 templatemo-inline-block">
	                      <input type="checkbox" name="expired" id="c5" value="">
	                      <label for="c5" class="font-weight-400"><span></span>금</label>                      
	                    </div>
	                    <div class="margin-right-15 templatemo-inline-block">
	                      <input type="checkbox" name="expired" id="c5" value="">
	                      <label for="c5" class="font-weight-400"><span></span>토</label>                      
	                    </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-3 form-group">         
                    <label for="schdStartTime">반복일정체크</label>   
                    <div class="templatemo-block margin-bottom-5">
                      <input type="checkbox" name="emailOptions" id="c1" value="new" > 
                      <label for="c1" class="font-weight-400"><span></span>체크시 종료일까지 요일 반복적용</label> 
                    </div>                
                </div> 
                <div class="col-lg-3 col-md-3 form-group">         
                    <label for="schdStartTime">그룹수업체크</label>   
                    <div class="templatemo-block margin-bottom-5">
                      <input type="checkbox" name="emailOptions" id="c1" value="new" > 
                      <label for="c1" class="font-weight-400"><span></span>체크시 그룹수업으로 적용</label> 
                    </div>                
                </div> 
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">      
                    <label class="control-label templatemo-block" for="stlClCd">치료선택</label>                 
                    <select class="form-control" id="stlClCd" name="stlClCd" style="overflow-y: scroll;">
                      <option value="ZZ">----선택----</option>
                      <option value="01">감통1</option>
                      <option value="02">감통2</option>
                      <option value="03">놀이1</option>
                      <option value="04">놀이2</option>  
                      <option value="05">언어1</option>
                      <option value="06">언어2</option>
                    </select>             
                </div>
                <div class="col-lg-6 col-md-6 form-group">        
                    <label for="telNo">치료내용</label>
                    <textarea class="form-control" id="schdDcnt" name="schdDcnt" rows="3" placeholder="30자 내외로 적어주세요! (ex: 초기상담+평가 )" maxlength="30"></textarea>   
                </div>
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">                   
	              	<label class="control-label templatemo-block">출석여부</label> 
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="atndYn" id="atndYn01" value="Y">
                      <label for="atndYn01" class="font-weight-400"><span></span>출석</label>
                    </div>
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="atndYn" id="atndYn02" value="N" >
                      <label for="atndYn02" class="font-weight-400"><span></span>미출석</label>
                    </div>
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="atndYn" id="atndYn03" value="Z" checked>
                      <label for="atndYn03" class="font-weight-400"><span></span>해당없음</label> 
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 form-group">      
                    <label class="control-label templatemo-block" for="stlClCd">회기선택</label>                 
                    <select class="form-control" id="stlClCd" name="stlClCd" style="overflow-y: scroll;">
                      <option value="ZZ">----선택----</option>
                      <option value="01">0.5</option>
                      <option value="02">0.75</option>
                      <option value="03">1</option>
                      <option value="04">1.25</option>  
                      <option value="05">1.5</option>
                      <option value="06">1.75</option>
                      <option value="07">2</option>
                    </select>                
                </div>
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">   
                    <label class="control-label templatemo-block" for="stlClCd">결제선택</label>                 
                    <select class="form-control" id="stlClCd" name="stlClCd" style="overflow-y: scroll;">
                      <option value="ZZ">----해당없음----</option>
                      <option value="01">실비</option>
                      <option value="02">자라미(교육청 바우처)</option>
                      <option value="03">방과후(교육청 바우처)</option>
                      <option value="04">아청심(바우처)</option>  
                      <option value="05">자비</option>
                      <option value="06">발달재활(바우처)</option>
                    </select>                
                </div>
                <div class="col-lg-6 col-md-6 form-group">                   
                    <label for="stlAmt">결제금액</label>
                    <div class="input-group">
	                    <div class="input-group-addon"><a href="javascript:void(0)" ><i class="fa fa-dollar fa-fw"></i></a></div>   
	                    <input type="text" class="form-control text-right" id="stlAmt" name="stlAmt" placeholder="12,000" maxlength="10" >  
	                </div> 
                </div>
              </div>
              
              <div class="row form-group">
                <div class="col-lg-6 col-md-6 form-group">
                                       
	              	<label class="control-label templatemo-block">취소구분선택</label>
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="cnclClCd" id="cnclClCd01" value="01">
                      <label for="cnclClCd01" class="font-weight-400"><span></span>당일취소</label>
                    </div>
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="cnclClCd" id="cnclClCd02" value="02" >
                      <label for="cnclClCd02" class="font-weight-400"><span></span>이월</label>
                    </div>   
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="cnclClCd" id="cnclClCd03" value="03" >
                      <label for="cnclClCd03" class="font-weight-400"><span></span>일정변경</label>
                    </div>         
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="cnclClCd" id="cnclClCd04" value="04" >
                      <label for="cnclClCd04" class="font-weight-400"><span></span>기타</label>
                    </div>      
                    <div class="margin-right-15 templatemo-inline-block">
                      <input type="radio" name="cnclClCd" id="cnclClCd05" value="05" checked>
                      <label for="cnclClCd05" class="font-weight-400"><span></span>해당없음</label>
                    </div>  
                </div>
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label class="control-label" for="schdDcnt">취소사유내용</label>
                    <textarea class="form-control" id="schdDcnt" name="schdDcnt" rows="3" ></textarea>                
                </div>
              </div>
              
              <div class="row form-group">
                <div class="col-lg-12 form-group">                   
                    <label class="control-label" for="schdDcnt">일정상세내용</label>
                    <textarea class="form-control" id="schdDcnt" name="schdDcnt" rows="5" ></textarea>
                </div>
              </div>
              <div class="form-group text-right">
                <button type="button" id="saveBtn"  class="templatemo-blue-button">등록</button>
                <button type="button" id="saveBtn"  class="templatemo-blue-button">삭제</button>
                <button type="button" id="resetBtn" class="templatemo-white-button">초기화</button>
              </div>     
              </form:form>                     
          </div>
	      
	      <div id="popup_wrap" >
	     	<span class="button b-close"><span>X</span></span>
		    <div class="popup_content"></div>
	      </div>
          
          <!-- footer  -->
	 	  <c:import url="/PageLink.do?link=web/z/footer" />
        </div>
      </div>
      
      
    </div>

  </body>
</html>