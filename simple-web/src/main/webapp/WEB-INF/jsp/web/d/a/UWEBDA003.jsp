<%--
  Description : 공통코드 상세화면
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
						
			// 상세저장 버튼 클릭
			$("#saveDetailBtn").click(function(){

				fn_detailSave();
			});
			
			$(document).on("change", "#chkAll", function(){
				
				if($("#chkAll").is(":checked")){

					$('#dynamicTbody td input[name^="chk"]').each(function(idx, o){
				        
						$(o).prop("checked",true);
				    });
				} else {

					$('#dynamicTbody td input[name^="chk"]').each(function(idx, o){

						$(o).prop("checked",false);
				    });
				}
		    });	
			
			
		});

		// 시작
		function web_start(){
			
			if ("<c:out value='${result}'/>" == "S" && !cmm_isNull("<c:out value='${msg}'/>") ) {
				jAlert("<c:out value='${msg}'/>", "알림");
	        }

			$('#dynamicTbody tr input[name="payAmt"]').each(function(idx, o){

				$(o).val(cmm_defaultString(cmm_getMoneyFormat($(o).val()), "0"));
				webcommon.commaNumberObj($(o));
		    });
		}
		
		// 목록으로 이동
		function fn_list(){
			
			document.cmmForm.action="/cmm/list.do";
			document.cmmForm.submit();
		}
		
		// 삭제 버튼
	    function fn_delete(){

	    	jConfirm("삭제하시겠습니까?","확인", function(){

		        document.cmmForm.action="/cmm/delete.do" 
		        document.cmmForm.submit();  
	    	});
	    }

		// 수정 버튼
		function fn_update(){
			
			// validation check		
			if(!cmm_chkValidation("cmmForm")){
				return false;
			}
			

	        document.cmmForm.action="/cmm/update.do" 
	        document.cmmForm.submit(); 
		}
		
		// 전체 체크박스
		function fn_checkbox(){
			
		}
		
		// 상세코드 한줄 추가
		function fncDetailAdd(){
			
			var seqNo = $('#dynamicTbody tr').length;
			
		    var html = new Array();
		    html.push('<tr>');
		    html.push('  <td><input type="checkbox" class="form-control" id="chk'+seqNo+'" name="chk" /><label for="chk'+seqNo+'" class="pt5"><span></span></label></td>');
		    html.push('  <td><input type="text" class="form-control" name="cmmClCd"   maxlength="3"  value="" ></td>');
		    html.push('  <td><input type="text" class="form-control" name="cmmClCdNm" maxlength="20" value="" ></td>');
		    html.push('  <td><select class="form-control" name="useYn" ><option value="Y" selected>Y</option><option value="N">N</option></select></td>');
		    html.push('  <td><input type="text" class="form-control" name="ordNo"  maxlength="2" value="" ></td>');
		    html.push('  <td><input type="text" class="form-control text-right" name="payAmt" maxlength="8" value="0" ></td>');
		    html.push('  <td class="hidden"><input type="text" class="form-control" name="seqNo" value="'+seqNo+'" /></td>');
		    html.push('  <td class="hidden"><input type="text" class="form-control" name="actionClCd" value="I" ></td>');
		    html.push('  <td class="hidden"><input type="text" class="form-control" name="cmmCd" value="<c:out value='${cmmDVO.cmmCd}'/>" ></td>');
		    html.push('</tr>');
		    $('#dynamicTbody').append(html.join(''));
		    

			$('#dynamicTbody tr input[name="payAmt"]').each(function(idx, o){

				webcommon.commaNumberObj($(o));
		    });
		}
		

		// 상세코드 선택 삭제
		function fncDetailDel(){
			

			if($('#dynamicTbody td input[name^="chk"]:checked').length == 0){

				jWarningAlert("삭제할 데이터가 없습니다.","경고",function() {
				});
				return false;
			}
			

			$('#dynamicTbody td input[name^="chk"]:checked').each(function(idx, o){
		        

				$(o).prop("checked",false); // 꼭 해줘야함.
				
				var obj = $(o).parent().parent();
				
				var actionClCd = $(obj).find("[name='actionClCd']").val();
				
				if(actionClCd == "I"){
					// 신규는 삭제
					$(obj).remove();
				} else {
					// 기존 자료는 안보이게
					$(obj).find("[name='actionClCd']").val("D");
					$(obj).addClass("hidden");
				}
				
		    });
		}
		
		// 상세 저장
		function fn_detailSave(){

			// 필수체크
			if($("#dynamicTbody tr").length == 0){

				jWarningAlert("등록할 데이터가 없습니다.","경고",function() {
				});
				return false;
			}
			
			var required_check = ["cmmClCd","ordNo"];

			var required_bool = false;
			
			$.each(required_check, function(i, value){
			    
				$('#dynamicTbody tr input[name="'+value+'"]').each(function(idx, o){
			        
					if(cmm_isNull($(o).val())){
						required_bool = true;
						return false;
					}
			    });
			});

			if(required_bool){
				jWarningAlert("공통구분코드, 정렬순서는 필수입력입니다.","경고",function() {
				});
				return false;
			}
			
			// 중복체크
			var dup_check_list = [];
			
			$('#dynamicTbody tr:not(.hidden) input[name="cmmClCd"]').each(function(idx, o){
		        
				dup_check_list.push($(o).val());
				
		    });
			
			var data_list = [];
			var dup_bool = false;
			
			$.each(dup_check_list, function(i,value){
			    
				if(data_list.indexOf(value) == -1 ){
					
					data_list.push(value);
				} else {
					dup_bool = true;
					return false;
				}
			});
			
			if(dup_bool){
				jWarningAlert("공통구분코드는 중복하여 등록 할 수없습니다.","경고",function() {
				});
				return false;
			}

	    	jConfirm("상세목록을 저장하시겠습니까?","확인", function(){


				$('#dynamicTbody tr input[name="payAmt"]').each(function(idx, o){

					$(o).val(Number(fnCm_parseNumber($(o).val())).toFixed(0));
			    });
				
	    		// form의 name을 배열형식으로 변경
	    		fnCm_formNameListChange("#dynamicTbody tr", "cmmSVOList");
		        document.cmmDetailForm.submit();  
	    	});
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
            <h2 class="margin-bottom-10">공통코드수정</h2>
            <!-- <p></p> -->
            
			<form:form name="cmmForm" id="cmmForm" method="post" action="/cmm/update.do" modelAttribute="cmmSVO" >
				<input type="hidden" name="screenId" value="UWEBDA003" />
				<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
				<input type="hidden" name="searchCnd" value="<c:out value='${searchVO.searchCnd}'/>"/>
				<input type="hidden" name="searchWrd" value="<c:out value='${searchVO.searchWrd}'/>"/>
			  
              <div class="row form-group">
                <div class="col-lg-3 col-md-3 form-group">                  
                    <label for="cmmCd">공통코드</label>
                    <input type="text" class="form-control" id="cmmCd" name="cmmCd"  required maxlength="3" value="<c:out value='${cmmDVO.cmmCd}'/>"  readOnly >            
                </div>
                
                <div class="col-lg-3 col-md-3 form-group">                  
                    <label class="control-label templatemo-block" for="stlClCd">사용자여부</label>                 
                    <select class="form-control" id="useYn" name="useYn" >
                      <option value="Y" <c:if test="${cmmDVO.useYn == 'Y'}">selected="selected"</c:if> >Y</option>
                      <option value="N" <c:if test="${cmmDVO.useYn == 'N'}">selected="selected"</c:if> >N</option>
                    </select>   
                </div>
                <div class="col-lg-6 col-md-6 form-group">                  
                    <label for="cmmNm">공통코드명</label>
                    <input type="text" class="form-control" id="cmmNm" name="cmmNm" required maxlength="20"  value="<c:out value='${cmmDVO.cmmNm}'/>" >                  
                </div> 
              </div>
              
              <div class="form-group text-right">
                <button type="button" id="listBtn"   class="templatemo-blue-button" >목록</button>
                <button type="button" id="updateBtn" class="templatemo-blue-button" >수정</button>
                <button type="button" id="deleteBtn" class="templatemo-white-button">삭제</button>
              </div>     
              </form:form>                     
          </div>
          
          
          <div class="templatemo-content-widget white-bg">
            <h2 class="margin-bottom-10">공통상세코드</h2>
          
		    <div class="search-wrap">         
		      <ul class="search">
		      	<li><a href="javascript:void(0)" onclick="fncDetailAdd()" ><button type="button" class="btn btn-default">추가</button></a></li>
		      	<li><a href="javascript:void(0)" onclick="fncDetailDel()" ><button type="button" class="btn btn-info">삭제</button></a></li>
		      </ul>
		    </div>
			
	        <form:form name="cmmDetailForm"  method="post" action="/cmmDetail/insert.do" modelAttribute="cmmSVO" >    
			<input type="hidden" name="screenId"  value="UWEBDA003" />
			<input type="hidden" name="cmmCd"     value="<c:out value='${cmmDVO.cmmCd}'/>"/>
			<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
			<input type="hidden" name="searchCnd" value="<c:out value='${searchVO.searchCnd}'/>"/>
			<input type="hidden" name="searchWrd" value="<c:out value='${searchVO.searchWrd}'/>"/> 
				       
            <div class="table-responsive">
	             <table class="table table-bordered">
                   <colgroup>
                       <col width="8%">
                       <col width="15%">
                       <col>
                       <col width="10%">
                       <col width="10%">
                       <col width="15%">
                       <col width="0px">
                       <col width="0px">
                       <col width="0px">
                   </colgroup>
	               <thead>
	                 <tr>
	                   <td scope="col">
	                            <input type="checkbox" class="form-control" id="chkAll" name="chkAll"  />
		                   		<label for="chkAll" class="pt5">
		                   		<span></span>
		                   		</label>        
	                   </td>
	                   <td scope="col">공통구분코드</td>
	                   <td scope="col">공통구분코드명</td>
	                   <td scope="col">사용여부 </td>
	                   <td scope="col">정렬순서 </td>
	                   <td scope="col">결제금액 </td>
	                   <td scope="col" class="hidden">번호(숨김)</td>
	                   <td scope="col" class="hidden">ActionClCd(숨김)</td>
	                   <td scope="col" class="hidden">공통코드(숨김)</td>
	                 </tr>
	               </thead>
                     
	               <tbody id="dynamicTbody" >
				   
                    <!-- loop 시작 -->   
                    <c:forEach var="cmmDetailDVO" items="${resultDetailList}" varStatus="status">
   					<c:set var="seqNo" value="${status.count-1}"/>
		                 <tr>
		                   <td>
		                   		<input type="checkbox" class="form-control" id="chk<c:out value='${seqNo}'/>" name="chk" />
		                   		<label for="chk<c:out value='${seqNo}'/>" class="pt5">
		                   		<span></span>
		                   		</label>
		                   </td>
		                   <td><input type="text" class="form-control" name="cmmClCd"  maxlength="3" readonly value="<c:out value='${cmmDetailDVO.cmmClCd}'/>" ></td>
		                   <td><input type="text" class="form-control" id="cmmClCdNm" name="cmmClCdNm" maxlength="20" value="<c:out value='${cmmDetailDVO.cmmClCdNm}'/>" ></td>
		                   <td>
		                   		<select class="form-control" name="useYn" >
			                   		<option value="Y" <c:if test="${cmmDetailDVO.useYn == 'Y'}">selected="selected"</c:if>>Y</option>
			                   		<option value="N" <c:if test="${cmmDetailDVO.useYn == 'N'}">selected="selected"</c:if>>N</option>
		                   		</select>
		                   </td>
		                   <td><input type="text" class="form-control" name="ordNo"  maxlength="2" value="<c:out value='${cmmDetailDVO.ordNo}'/>" ></td>
		                   <td><input type="text" class="form-control text-right" name="payAmt" maxlength="8" value="<c:out value='${cmmDetailDVO.payAmt}'/>" ></td>
		                   <td class="hidden"><input type="text" class="form-control" name="seqNo" value="<c:out value='${seqNo}'/>" /></td>
		                   <td class="hidden"><input type="text" class="form-control" name="actionClCd" value="U" /></td>
		                   <td class="hidden"><input type="text" class="form-control" name="cmmCd" value="<c:out value='${cmmDetailDVO.cmmCd}'/>" /></td>
		                 </tr> 
                    </c:forEach>  
                    <!-- loop 끝 -->
	               </tbody>
	               
	             </table>    
	        </div> 
	        
            <div class="form-group text-right mt10">
              <button type="button" id="saveDetailBtn" class="templatemo-blue-button" >저장</button>
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