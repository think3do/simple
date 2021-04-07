
cmmframework = (function($, undefined){	

$that = {
						session : {
									set : function(key, data) {
										if (typeof data === 'object') {
											sessionStorage.setItem(key, "o:" + JSON.stringify(data));
										} else {
											sessionStorage.setItem(key, "s:" + data);
										}
									},
									get : function(key, data) {
										var value = sessionStorage.getItem(key);
										
										if (value != null) {
											return value.substring(0, 2) == 'o:' ? JSON.parse(value.substring(2)): value.substring(2); 
										}
										
										return data;
									},
									del : function(key) {
										if (key) {
											delete sessionStorage[key];
										} else {
											for (i in sessionStorage) delete sessionStorage[i];
										} 
									}
								}
	       };
	
	return $that;
})(jQuery);


/**
 * 공통
 */
webcommon = (function($, undefined){
	
	var $that = {};
	
	$that = {
					
		// 마이너스 미포함
		commaNumber : function(id) {
			var o = $("#"+id);
			webcommon.commaNumberObj(o);
		},
		
		// 마이너스 미포함
		commaNumberObj : function(obj) {
			var o = obj;
			o.attr("typeTmp", "number");
			o.prop("type", "text");

			o.focus(function() {

				if(!cmm_isNull(o.val())) {
					o.val(Number(fnCm_parseNumber(o.val())).toFixed(0));
				}

				if(cmmframework.session.get("userAgent") == "iOS"){
					o.prop("type", "number");
					o.attr("pattern", "[0-9]*");
					o.attr("inputmode", "numeric"); 
					$(o).get(0).setSelectionRange(0,99999); //  ios에서 블럭지정하기
				} else {
					o.prop("type", "number");
					$(o).select();
					o.attr("pattern", "\d*");
				}
				
			});
			
			o.blur(function() {

				var rValue = Number(fnCm_parseNumber(o.val())).toFixed(0);
				
				if(rValue < 0){
					
					jAlert("마이너스(-)금액은 입력할 수 없습니다.","알림",function() {
						   o.focus();
	                       return false;
	                });
				} else {

					o.prop("type", "text");
					o.removeAttr("pattern");
					o.removeAttr("inputmode");
					o.val(cmm_defaultString(cmm_getMoneyFormat(rValue), "0"));
				}
			});
		},

		// 마이너스 포함
		commaNumberMinus : function(id) {
			var o = $("#"+id);
			webcommon.commaNumberMinusObj(o);
		},
		
		// 마이너스 포함
		commaNumberMinusObj : function(obj) {
			var o = obj;
			o.prop("type", "text");
			
			o.bind("keyup", function(event) {
				var regex = /[^0-9\-]/;
				var str = $(this).val();
				if (regex.test(str)) {
					$(this).val("");
				}
			});
			
			o.focus(function() {
				
				if(!cmm_isNull(o.val())) {
					o.val(Number(fnCm_parseNumber(o.val())).toFixed(0));
				}

				// 마이너스가 없는 숫자키패드가 나올 수 있어서 type을 number에서 text로 변경
				if(cmmframework.session.get("userAgent") == "iOS"){
					o.prop("type", "text");
					//o.attr("pattern", "[0-9]*");
					//o.attr("inputmode", "numeric"); 
					$(o).get(0).setSelectionRange(0,99999); //  ios에서 블럭지정하기
				} else {
					o.prop("type", "text");
					$(o).select();
					//o.attr("pattern", "\d*");
				}
				
			});
			
			o.blur(function() {

				var rValue = Number(fnCm_parseNumber(o.val())).toFixed(0);
				
				o.prop("type", "text");
				o.removeAttr("pattern");
				o.removeAttr("inputmode");
				o.val(cmm_defaultString(cmm_getMoneyFormat(rValue), "0"));
			});
		},

		// 정수 소수점 2자리 체크
		commaDecimalNumber : function(id) {
			var o = $("#"+id);
			webcommon.commaDecimalNumberObj(o);
		},
		
		// 정수 소수점 2자리 체크
		commaDecimalNumberObj : function(obj) {
			
			var o = obj;
						
			o.blur(function() {
				
				var checkNum = o.val();
				
				if(cmm_isNull(checkNum)){

					o.val("");
				} else if(isNaN(checkNum)){

					jAlert("숫자 형식이 올바르지 않거나 유효하지 않습니다.", "알림", function(){
						 
						if(cmmframework.session.get("userAgent") == "iOS"){
							$(o).get(0).setSelectionRange(0,99999); //  ios에서 블럭지정하기
						} else {
							$(o).select();
						}
						
						o.focus();
	                    return false;
					});
				} else {

					var returnValue = 0;
					
					if(checkNum.indexOf('.') > -1){
						// 소수점 둘째자리까지 나머진 반올림
						returnValue = Number(checkNum).toFixed(2);
					} else {
						returnValue = Number(checkNum);
					}
					
					o.val(returnValue);
				}
			});
		},
		
		commaNumberBusn : function(obj) {
			var o = obj;
			o.attr("typeTmp", "number");
			o.prop("type", "text");

			o.focus(function() {

				if(!cmm_isNull(o.val())) {
					o.val(cmm_parseNumber(o.val()));
				}

				if(cmmframework.session.get("userAgent") == "iOS"){
					o.prop("type", "number");
					o.attr("pattern", "[0-9]*");
					o.attr("inputmode", "numeric"); 
					$(o).get(0).setSelectionRange(0,99999); //  ios에서 블럭지정하기
				} else {
					o.prop("type", "number");
					$(o).select();
					o.attr("pattern", "\d*");
				}
			});
			
			o.blur(function() {
				o.prop("type", "text");
				o.removeAttr("pattern");
				o.removeAttr("inputmode");
				o.val(fnCm_fmtTaxpayerNo(o.val()));
			});
		}
	};
	
	return $that;
})(jQuery);


/**
 * form의 name을 배열형식으로 변경
 */
function fnCm_formNameListChange(tbody_name, prefix) {

	$(tbody_name).each(function(idx, o){
        
		$(o).find("[name]").each(function(sub_idx, e){
			var change_name = prefix+"["+idx+"]."+$(e).attr("name");
			$(e).attr("name", change_name);
	    });
    });
}

/**
 * 주민번호 or 사업자번호 formater
 * @param value
 * @returns
 */
function fnCm_fmtTaxpayerNo(value) {
    if(cmm_isNull(value)) return "";
    value = "" + value;
    //if(value.length == 13) value = value.substring(0, 6) + "-" + value.substring(6);
    if(value.length == 13) value = value.substring(0, 6) + "-" + value.substring(6,7) + "******";
    if(value.length == 10) value = value.substring(0, 3) + "-" + value.substring(3,5) + "-" + value.substring(5);
    return value;
}

/***************************************
* 숫자 이외의 문자 삭제 단, '-' 가능
****************************************/
function fnCm_parseNumber(sFieldValue) {

	var minus = "";
	if( (""+sFieldValue).indexOf("-") == 0 ) minus = "-";
	
	sFieldValue = fnCm_parseNoMinusNumber(sFieldValue);
	
	return Number(minus + sFieldValue);
}


/***************************************
* 숫자로 리턴
****************************************/
function fnCm_parseNoMinusNumber(sFieldValue) {

	sFieldValue = ("" + sFieldValue).replace(/\D/g,"");
	
	if(isNaN(sFieldValue)){
		return 0;
	} else {
		return Number(sFieldValue);
	}
}

/**
 * ACTION ID 서비스 호출 함수
 * @param {String} actionId ACTION ID
 * @return 
 */
function cmm_doService(actionId, options) {
	
	var param = cmm_indata(actionId);
	//cmmframework.debug("param : ", param);
	cmmframework.callServer(actionId, param, null, options);
	if(options == undefined || (options.popup == undefined && options.popupAction == undefined) || (options.popup != "Y" && options.popupAction != "Y")) {
		var screenId = cmmframework.session.get("screenId");
		cmmframework.session.del(screenId+"_html");
		cmmframework.session.del(screenId+"_mapper");
		cmmframework.session.del(screenId+"_retain");
	}
}

/**
 * 팝업창 호출
 * @param {String} actionId ACTION ID
 * @param {object} data 팝업창에 전달할 data값
 * @return 
 */
function cmm_openPopup (actionId, data, server, layerId) {
	if (data == undefined) data = "";
	if (layerId == undefined) layerId = "layer_pop";
	var param = JSON.stringify(data);
	cmmframework.session.set("param_popup",param);

	cmm_pushMapperData();
	
	if($('#masking').length == 0) {
		$("body").append('<div id="masking"></div>');
	}
	$("#masking").addClass("masking");
	eval($("#masking").css("height", $(document).height()+'px'));
	// 부모창 스크롤방지
//	$("body").css({'overflow':'hidden'});
//	$(window).css({'overflow':'hidden'});

	var url;
	if(server != undefined && server != "") {
		url = cmmframework.session.get(server)+"/jsonAction.do?actionId="+actionId;
	} else {
		url = cmmframework.session.get("server")+"/jsonAction.do?actionId="+actionId;
	}
	$.mobile.loadPage(url).done(function() {
		// 다른 도메인의 팝업을 호출하고 나면 현재 도메인의 정보가 변경되기 때문에 원래 도메인으로 맞춰주기 위해 dummy로 호출
		$.mobile.loadPage(cmmframework.session.get("server")+"/setSession.jsp").done(function() {
			cmm_openDialog(layerId);
			try {
				var layerPopId = "#layer_pop_" + actionId.substr(0,10);
				if ($(layerPopId).length < 1) {
					layerPopId = "#layer_pop";
				}
				if ($(layerPopId).length > 0) {
					var outerPopObj = $("body").find("[tabIndex=0], [href], button, select, textarea, input").not(":hidden, [tabIndex=-1], " + layerPopId + " *");
					var innerPopObj = $(layerPopId).find("[tabIndex=0], [href], button, select, textarea, input").not(":hidden, [tabIndex=-1]");
					outerPopObj.attr("tabIndex", "-1");
					// close에서 다시 tabIndex 0 바꾸기 위해
					if ($(":focus").length > 0) {
						outerObj.beforeOuterObj.push($(":focus").get(0));
					}
					$(layerPopId).find('.title_wrap h2').attr("tabindex","0");
					$(layerPopId).find('.title_wrap h2').focus();
					outerObj.outerPopObj = outerPopObj;
					if (innerPopObj.length > 2) {
						// 알림창에서만 tab이 이동되게 설정하는 버튼 이벤트 등록
						innerPopObj.first().on("keydown",function(event) {
							if (event.shiftKey && (event.keyCode || event.which) === 9) {
								event.preventDefault();
								innerPopObj.last().focus();
							}
						});
						innerPopObj.last().on("keydown",function(event) {
							if (!event.shiftKey &&(event.keyCode || event.which) === 9) {
								event.preventDefault();
								innerPopObj.first().focus();
							}
						});
					}
				}
			} catch (e) {
				console.log(e);
			}
//			layerPopCount++;
		});
	});
}


/**
 * 단순 VIEW 팝업창 호출   cmm_pushMapperData() 제외
 * @param {String} actionId ACTION ID
 * @param {object} data 팝업창에 전달할 data값
 * @return 
 */
function cmm_openPopupView (actionId, data, server, layerId) {
	if (data == undefined) data = "";
	if (layerId == undefined) layerId = "layer_pop";
	var param = JSON.stringify(data);
	cmmframework.session.set("param_popup",param);
	
	if($('#masking').length == 0) {
		$("body").append('<div id="masking"></div>');
	}
	$("#masking").addClass("masking");
	eval($("#masking").css("height", $(document).height()+'px'));
	
	var url;
	if(server != undefined && server != "") {
		url = cmmframework.session.get(server)+"/jsonAction.do?actionId="+actionId;
	} else {
		url = cmmframework.session.get("server")+"/jsonAction.do?actionId="+actionId;
	}

	$.mobile.loadPage(url).done(function() {
		// 다른 도메인의 팝업을 호출하고 나면 현재 도메인의 정보가 변경되기 때문에 원래 도메인으로 맞춰주기 위해 dummy로 호출
		$.mobile.loadPage(cmmframework.session.get("server")+"/setSession.jsp").done(function() {
			cmm_openDialog(layerId);
//			layerPopCount++;
		});
	});		
}



/**
 * layer 팝업창 Open
 * @param {String} id layer 팝업의 Div id
 * @return 
 */
function cmm_openDialog(id) {
	layerPopCount++;
	var funcName = "cmm_start_popup";
	if (id != "layer_pop") funcName = "cmm_start_popup_"+id;
	$.get(eval(funcName)(id), function() {
//		var margin = $('#'+id).css('margin');
//		margin = margin.substring(0, margin.indexOf('px'));
//		var footer = $('#footer').height();
//		var height = eval($(window).height() - margin - footer);
//		var height = eval($(window).height());
//		eval($('#'+id).css("height",height+'px'));
		pop_full();	// layoutTb.js 
//		$('#'+id).css('top', $(window).scrollTop()+'px');
//		loaded();		// iScroll setting 
		
		if($(".search_wrap.board").length > 0 || $(".sch_wrap").length > 0){
			if($("#searchWrapCloseBtn").length > 0) $("#searchWrapCloseBtn").remove();
				
			//검색창 닫기기능
			$("<a href='javascript:void(0);' id='searchWrapCloseBtn' class='close_btn'>닫기</a>").insertAfter($(".search_wrap.board input, .sch_wrap input"));
			$(".search_wrap.board, .sch_wrap").on("input",function() {
				if($(this).find("input").val() == ""){
					$(this).find(".close_btn").fadeOut(200);
				} else {
					$(this).find(".close_btn").fadeIn(200);
				}
			});
			$(".search_wrap.board .close_btn, .sch_wrap .close_btn").click(function(e) {
				e.preventDefault();
				$(this).fadeOut(200).siblings("input").val("");
			});
		}
	});
}


/**
 * layer 팝업창 Close
 * @param {String} id layer 팝업의 Div id
 * @return 
 */
function cmm_closeDialog(id, callFuncName) {
	try {
		if (typeof outerObj.outerPopObj != "undefined" && outerObj.outerPopObj.length > 0) {
			outerObj.outerPopObj.attr("tabIndex", "0");
		}
		if (outerObj.beforeOuterObj.length > 0) {
			var focusObj = outerObj.beforeOuterObj.pop();
			if (typeof focusObj != "undefined") {
				focusObj.focus();
			}
		}
	} catch (e) {
		console.log(e);
	}
	
	layerPopCount--;
	if (layerPopCount == 0) {
		$("#masking").remove();
	}
	$("#"+id).remove();
	
	// 부모창 스크롤방지 해제
//	$("body").css({'overflow':'inherit'});
//	$(window).css({'overflow':'auto'});
	pop_full_close(id);	// layoutTb.js
	var screenId = cmmframework.session.get("screenId");
	
	cmm_pullMapperData(screenId, callFuncName);
}


/**
 * layer 단순 VIEW 팝업창 Close
 * @param {String} id layer 팝업의 Div id
 * @return 
 */
function cmm_closeDialogView(id) {
	layerPopCount--;
	if (layerPopCount == 0) {
		$("#masking").remove();
	}
	$("#"+id).remove();
}

/**
 * Validation Check
 * @param {arrary} chkArr 체크ID 배열
 * @return Boolean 
 */
function cmm_chkValidation (formId) {
	
	var chkObj = $("#" + formId);
	var return_bool = true;
	
	// 필수 체크
	$.each( $("#" + formId).find("[required]"), function (idx, obj) {
		
		if(cmm_isNull( $(obj).val())){
			
			var nm = $("label[for='"+obj.id+"']").html();
			jWarningAlert(nm + "은(는) 필수입력 항목입니다.","경고",function() {
				$(obj).focus();
			});
			return_bool = false;
			return false;
		}
	});
	
	if(return_bool == false){
		
		return false;
	}
	
	// minlength check
	$.each( $("#" + formId).find("[minLength]"), function (idx, obj) {
		
		var size = $(obj).attr("minLength");
		
		if(!cmm_chkMinLength($(obj).val(), size)){
			
			var nm = $("label[for='"+obj.id+"']").html();
			jWarningAlert(nm+"은(는) "+size+"자 이상 입력해야 합니다.","경고",function() {
				$(obj).focus();
			});
			
			return_bool = false;
			return false;
		}
	});

	if(return_bool == false){
		
		return false;
	}

	// maxlength check
	$.each( $("#" + formId).find("[maxLength]"), function (idx, obj) {
		
		var size = $(obj).attr("maxLength");
		
		if(!cmm_chkMaxLength($(obj).val(), size)){
			
			var nm = $("label[for='"+obj.id+"']").html();
			jWarningAlert(nm+"은(는) "+size+"자 이상 입력할수 없습니다.","경고",function() {
				$(obj).focus();
			});
			
			return_bool = false;
			return false;
		}
	});

	if(return_bool == false){
		
		return false;
	}
	
	
	return true;
}





/**
 * Validation Check
 * @param {arrary} chkArr 체크ID 배열
 * @return Boolean 
 */
function cmm_chkValidation_bak (chkArr) {
	var chkId = "";
	var chkValue = "";
	for (var i=0; i<chkArr.length; i++) {
		chkId = $("#" + chkArr[i]);

		chkValue = chkId.val();
		if(chkValue==undefined) {
			//cmm_getMsgAlert("id =" +chkArr[i] + " 에서 오류가 발생하였습니다.");
			jAlert("id =" +chkArr[i] + " 에서 오류가 발생하였습니다.", "에러");
			return false;
		}
		if (chkValue.trim() == "" ) {
			
			var nm = $("label[for='"+chkArr[i]+"']").html();
			cmm_getMsgAlert(nm + "은(는) 필수입력 항목입니다.","경고",function() {
				chkId.focus();
			});
			return false;
		}
	}
	
	return true;
}

/**
 * include messgae Validation Check
 * @param {object} obj 체크ID, 메세지 형태의 json 타입
 * @return Boolean 
 */
function cmm_chkMsgValidation (obj) {
	for (var i=0; i<obj.length; i++) {
		var id = $("#" + obj[i].id);
		var msg = obj[i].msg;

		var type = id.attr("type");
		switch (type) {
			case "text" :
				if (id.val().trim() == "" ) {
					alert(msg);
					return false;
				}		
				break;
			case "checkbox" :
				if (!id.is(":checked")) {
					alert(msg);
					return false;
				}
				break;
		}
	}
	
	return true;
}

/**
 * Validation Checkbox
 * @param {String} formId
 * @return Boolean 
 */
function cmm_checkboxValidation (formId) {
	
	var cnt = 0;
	var id = $("#" + formId + " :input[type=checkbox]");
	
	id.each(function() {
		if ($(this).is(":checked")) cnt++;
    });
	
	if (cnt==0) {
		cmm_getMsgAlert("삭제할 항목을 선택하시기 바랍니다.");
		return false;
	}
	
	return true;
}

/**
 * 
 * 문자열 앞뒤에 따옴표 추가
 * @param {String} str 문자열
 * @return String
 * @ignore
 */
function cmm_quote(str) {
	return "\"" + str + "\"";
}

/**
 * String Empty
 * @param {String} str 체크할 문자열
 * @return Boolean
 * @ignore
 */
function cmm_strEmpty(str) {
	return str == null || str == "";
}

/**
 * Null 체크
 * @param {String} sValue 체크할 Value
 * @return Boolean
 */
function cmm_isNull(sValue) {
    if (sValue == null || (typeof sValue == "string" ? sValue.replace(/\s/g,"") : "x") == "") {
        return true;
    } else {
        return false;
    }
}

/**
 * defaultString - null일 경우 지정된 값을 리턴
 * @param {String} sValue 체크할 Value
 * @param {String} dValue default값
 * @return String NVL기능 적용된 문자열
 */
function cmm_defaultString(sValue, dValue) {
	if( cmm_isNull(sValue) ){
		return dValue;
	}
	else{
		return sValue;
	}
}

/**
 * 입력된 날짜 String을 지정된 format으로 리턴<br>
 * 입력값은 숫자만 추출되며, 년월일시간분초 순으로 인식된다.<br>
 * 추출된 숫자는 4자리(yyyy) or 6자리(yyyyMM) or 8자리(yyyyMMdd) <br>
 *               or 10자리(yyyyMMddhh) or 12자리(yyyyMMddhhmm) or 14자리(yyyyMMddhhmmss) 이어야 한다.
 * @param {String} format Format Value
 * @param {String} sValue 체크할 Value
 * @return String 포멧팅 된 문자열
 */
function cmm_cvtDateFormat(format, sValue) {
	if( cmm_isNull(sValue) ){
		return sValue;
	}
	else{
		var testValue = "" + sValue;
		testValue = testValue.replace(/\D/g,"");
		if( "4,6,8,10,12,14".indexOf(testValue.length) >= 0 || testValue.length > 14 ){
			var year,month,day,hour,min,sec;
			try{
				year = testValue.substring(0,4);
				month = testValue.substring(4,6);
				day = testValue.substring(6,8);
				hour = testValue.substring(8,10);
				min = testValue.substring(10,12);
				sec = testValue.substring(12,14);
			}
			catch(e){}
			
			testValue = format.replace("yyyy",year).replace("MM",month).replace("dd",day)
								.replace("hh",hour).replace("mm",min).replace("ss",sec);
			return testValue;
		}
		else{
			return sValue;
		}
	}
}

/**
 * 리턴된 날짜 String을 지정된 format으로 리턴<br>
 * 입력값은 숫자만 추출되며, 년월일시간분초 순으로 인식된다.<br>
 * 추출된 숫자는 4자리(yyyy) or 6자리(yyyyMM) or 8자리(yyyyMMdd) <br>
 *               or 10자리(yyyyMMddhh) or 12자리(yyyyMMddhhmm) or 14자리(yyyyMMddhhmmss) 이어야 한다.
 * @param {String} format Format Value
 * @param {String} sValue 체크할 Value
 * @return String 포멧팅 된 문자열
 */
function cmm_rtnDateFormat(format, sValue) {
	if( cmm_isNull(sValue) ){
		return sValue;
	}
	else{
		var curDate = new Date(sValue);
		var year,month,day,hour,min,sec;
		try{
			year = curDate.getFullYear();
			month = cmm_twoZero(curDate.getMonth()+1);
			day = cmm_twoZero(curDate.getDate());
			hour = cmm_twoZero(curDate.getHours());
			min = cmm_twoZero(curDate.getMinutes());
			sec = cmm_twoZero(curDate.getSeconds());
		}
		catch(e){}
		
		var rtnDate = format.replace("yyyy",year).replace("MM",month).replace("dd",day)
							.replace("hh",hour).replace("mm",min).replace("ss",sec);
		return rtnDate;
	}
}

/**
 * 두 날짜 사이의 간격을 체크
 * @param {String} fromDt 시작일자
 * @param {String} toDt 종료일자
 * @param {String} div 비교구분자( "Y" : 년도비교, "M" : 개월수비교, "D" : 일자비교 )
 * @param {Number} num 비교일자
 * @return Boolean
 */
function cmm_chkCompareDate(fromDt, toDt, div, num) {
	if( cmm_chkDate8(fromDt) && cmm_chkDate8(toDt) ){
		var compareDt = cmm_getDateAdd(cmm_cvtDateFormat("yyyy-MM-dd", fromDt), num, div);
		if( toDt <= compareDt ){ return true; }
	}
	return false;
}

/**
 * @description 날짜 계산 함수
 * @example cmm_getDateAdd(date,num,opt);
 * @param {String} date 'yyyy-MM-dd'형식의 문자열
 * @param {Number} num 더하거나 빼고자 하는 정수 값
 * @param {String} opt "Y", "M", "D" 중의 하나 
 * @return String 계산된 날짜 String
 * @since 2013/11/28
 */
function cmm_getDateAdd(date,num,opt){
	if( cmm_isNull(date) || cmm_isNull(num) || cmm_isNull(opt) ){ alert("date, num, opt Parameter는 필수입니다."); return null; }

	var dt = new Date ( date );
	//일자 계산
	if( opt.toUpperCase()=="D" ){		
		dt.setDate(dt.getDate() + num);
	} 
	//월 계산
	else if( opt.toUpperCase()=="M" ){		
		var preDate = dt.getDate();
		dt.setDate(1);
		dt.setMonth(dt.getMonth() + num);
		var preMonth = dt.getMonth();		
		dt.setDate(preDate);
		if( dt.getMonth() != preMonth ){ dt.setDate(0); }
	} 
	//년도 계산
	else if( opt.toUpperCase()=="Y" ){		
		dt.setFullYear(dt.getFullYear() + num);
	}
	else{ return null; }
	return cmm_rtnDateFormat("yyyyMMdd", dt);
}

/**
 * 2자리 숫자 체크(10보다 작을때 "0" + 숫자로 변환
 * @param {Integer} sFieldValue 필드값
 * @return String
 */
function cmm_twoZero(value) {
	var rtnValue = (value<10) ? "0" + value : ""+value;
	return rtnValue;
}

/**
 * 8자리 날짜 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkDate8(sFieldValue) {
    var pattern = /^(((\d{4}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|((\d{2}[02468][048]|\d{2}[13579][26]))0229)){0,8}$/;
    var rtn = pattern.test(sFieldValue);
    // 윤년 체크 로직 추가
    if( rtn ){
    	var md = sFieldValue.substring(4,8);
    	if( md == "0229" ){
    		var year = Number(sFieldValue.substring(0,4));
    		if( year%4 == 0 && (year%100 != 0 || year%400 == 0) ){ return true; }
    		else{ return false; }
    	}
    }
    return rtn;
}

/**
 * 10자리 날짜 체크(년월일 사이 구분자있는 경우)
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkDate10(sFieldValue) {
    return cmm_chkDate8(sFieldValue.replace(/([0-9]{4})[\w|\W]([0-9]{2})[\w|\W]([0-9]{2})/,"$1$2$3"));
}

/**
 * 6자리 날짜 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkDate6(sFieldValue) {
    var pattern = /^(\d{4}(0[1-9]|1[012]))$/;
    return pattern.test(sFieldValue);
}

/**
 * 7자리 날짜 체크(년월 사이 구분자있는 경우)
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkDate7(sFieldValue) {
    return cmm_chkDate6(sFieldValue.replace(/([0-9]{4})[\w|\W]([0-9]{2})/,"$1$2"));
}

/**
 * 년도 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkYear(sFieldValue) {
	return /^[1-9]{1}[0-9]{3}$/.test(""+sFieldValue);
}

/**
 * 윤년 여부 체크
 * 윤년이면 true
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkLeapYear(sFieldValue) {
	return cmm_chkDate8(sFieldValue + "0229");
}

/**
 * 월의 마지막 일자 가져오기
 * @param {String} sYearMonth 년월
 * @return Number 월의 마지막 일자
 */  
function cmm_getMonthLastDay(sYearMonth) {
	if( cmm_isNull(sYearMonth) || (""+sYearMonth).length < 6  ) return null;
	
	var psYear = ("" + sYearMonth).substring(0,4);
	var psMonth = Number(("" + sYearMonth).substring(4,6));
	
	var vaDaysInMonth = new Array(13);
	vaDaysInMonth [1] = 31;
	vaDaysInMonth [2] = ((psYear % 4 == 0) && (!(psYear % 100 == 0) || (psYear % 400 == 0)) ? 29 : 28);
	vaDaysInMonth [3] = 31;
	vaDaysInMonth [4] = 30;
	vaDaysInMonth [5] = 31;
	vaDaysInMonth [6] = 30;
	vaDaysInMonth [7] = 31;
	vaDaysInMonth [8] = 31;
	vaDaysInMonth [9] = 30;
	vaDaysInMonth [10] = 31;
	vaDaysInMonth [11] = 30;
	vaDaysInMonth [12] = 31;
  
    return vaDaysInMonth [psMonth];
}

/**
 * 이메일 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkEmail(sFieldValue) {
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return pattern.test(sFieldValue);
}

/**
 * URL 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkURL(sFieldValue) {
    var pattern = /^((http|ftp|https):\/\/w{3}[\d]*.|(http|ftp|https):\/\/|w{3}[\d]*.)([\w\d\._\-#\(\)\[\]\\,;:]+@[\w\d\._\-#\(\)\[\]\\,;:])?([a-z0-9]+.)*[a-z\-0-9]+.([a-z]{2,3})?[a-z]{2,6}(:[0-9]+)?(\/[\/a-z0-9\._\-,]+)*[a-z0-9\-_\.\s\%]+(\?[a-z0-9=%&amp;\.\-,#]+)?$/;
    return pattern.test(sFieldValue);
}

/**
 * 전화번호 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkPhone(sFieldValue) {
	var pattern = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;
    return pattern.test(sFieldValue);
}

/**
 * 핸드폰번호 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkCellPhone(sFieldValue) {
    var pattern = /^01(0|1|[6-9])-?[0-9]{3,4}-?[0-9]{4}$/;
    return pattern.test(sFieldValue);
}

/**
 * 시간(24시기준)체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkTime24(sFieldValue) {
    var pattern = /^([01][0-9]|2[0-3]):?[0-5][0-9]$/;
    return pattern.test(sFieldValue);
}

/**
 * 시간(12시기준)체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkTime12(sFieldValue) {
    var pattern = /^(0[1-9]|1[0-2]):?[0-5][0-9]$/;
    return pattern.test(sFieldValue);
}

/**
 * IP 체크
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkIp(sFieldValue) {
    var pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return pattern.test(sFieldValue);
}

/**
 * 외국인등록번호 적합성 여부 체크 함수 
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkForeignNo(sFieldValue) {
	// TODO 임시로 로직을 막아놈
	return true;

    var sum = 0;
    var odd = 0;

    buf = Array(13);
    for (i = 0; i < 13; i++) buf[i] = parseInt(sFieldValue.charAt(i));

    odd = buf[7]*10 + buf[8];

    if (odd%2 != 0) {
        return false;
    }

    if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) {
        return false;
    }

    multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
    for (i = 0, sum = 0; i < 12; i++) {
        buf[i] = buf[i] * multipliers[i];
        sum = sum + buf[i];
    }

    sum = 11 - (sum%11);

    if (sum >= 10) sum -= 10;

    sum += 2;

    if (sum >= 10) sum -= 10;

    if (sum != buf[12]) {
        return false;
    } else {
        return true;
    }
}

/**
 * 사업자등록번호 적함성 여부 체크 함수
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkBizNo(sFieldValue) {
	// TODO 임시로 로직을 막아놈
	return true;

	var strNumb = sFieldValue.split("-").join("");
    if (strNumb.length != 10) {
        return false;
    }
    
    var sumMod = 0;
    sumMod += parseInt(strNumb.substr(0,1));
    sumMod += parseInt(strNumb.substr(1,1)) * 3 % 10;
    sumMod += parseInt(strNumb.substr(2,1)) * 7 % 10;
    sumMod += parseInt(strNumb.substr(3,1)) * 1 % 10;
    sumMod += parseInt(strNumb.substr(4,1)) * 3 % 10;
    sumMod += parseInt(strNumb.substr(5,1)) * 7 % 10;
    sumMod += parseInt(strNumb.substr(6,1)) * 1 % 10;
    sumMod += parseInt(strNumb.substr(7,1)) * 3 % 10;
    sumMod += Math.floor(parseInt(strNumb.substr(8,1)) * 5 / 10);
    sumMod += parseInt(strNumb.substr(8,1)) * 5 % 10;
    sumMod += parseInt(strNumb.substr(9,1));
    if (sumMod % 10 != 0) {
        return false;
    }

    return true;
}

/**
 * 주민등록번호 적합성 여부 체크 함수(외국인등록번호 포함)
 * @param {String} sFieldValue 필드값
 * @return Boolean
 */
function cmm_chkResNo(sFieldValue) {
	// TODO 임시로 로직을 막아놈
	return true;

    var val1, val2;
    var tmp1, tmp2, tmp3;
    var t1, t2, t3, t4, t5, t6, t7;
	var vtempout ;

	if(sFieldValue.indexOf("-") > -1) sFieldValue = sFieldValue.split("-").join("");
    if(sFieldValue.length != 13) return false;

    val1 = sFieldValue.substr(0,6);
    val2 = sFieldValue.substr(6,7);
    vtempout = sFieldValue.substr(6,1);

    if( vtempout == '5' || vtempout == '6' || vtempout == '7' || vtempout == '8' ){ 
		return cmm_chkForeignNo( sFieldValue ); 
	} 
    
    tmp1 = val1.substr(2, 2);
    tmp2 = val1.substr(4);
    tmp3 = val2.substr(0, 1);

    if (!cmm_chkProResNoLength(val1)) return false;
    if (!cmm_chkPreResNoLength(val2)) return false;
    if ((tmp1 < "01") || (tmp1 > "12")) return false;
    if ((tmp2 < "01") || (tmp2 > "31")) return false;
    if ((tmp3 < "1" ) || (tmp3 > "4")) return false;
    t1  = val1.substr(0, 1);
    t2  = val1.substr(1, 1);
    t3  = val1.substr(2, 1);
    t4  = val1.substr(3, 1);
    t5  = val1.substr(4, 1);
    t6  = val1.substr(5, 1);
    t11 = val2.substr(0, 1);
    t12 = val2.substr(1, 1);
    t13 = val2.substr(2, 1);
    t14 = val2.substr(3, 1);
    t15 = val2.substr(4, 1);
    t16 = val2.substr(5, 1);
    t17 = val2.substr(6, 1);

    var tot = parseInt(t1) * 2 + parseInt(t2) * 3 + parseInt(t3) * 4 + parseInt(t4) * 5 + parseInt(t5) * 6 + parseInt(t6) * 7;
    tot += parseInt(t11) * 8 + parseInt(t12) * 9 + parseInt(t13) * 2 + parseInt(t14) * 3 + parseInt(t15) * 4 + parseInt(t16) * 5 ;

    var result = parseInt(tot) % 11;
    result = (11 - parseInt(result)) % 10;

    if (result == t17) {
        return true;
    } else {
        return false;
    }
}

/**
 * 주민번호 형식 check (앞 6자리)
 * @param {String} sProResNo 주민번호
 * @return Boolean
 * @ignore
 */
function cmm_chkProResNoLength(sProResNo) {
    if (sProResNo.length == 6) {
        return true;
    } else {
        return false;
    }
}

/**
 * 주민번호 형식 check (뒤 7자리)
 * @param {String} sPreResNo 주민번호
 * @return Boolean
 * @ignore
 */
function cmm_chkPreResNoLength(sPreResNo) {
    if (sPreResNo.length == 7) {
        return true;
    } else {
        return false;
    }
}

/**
 * 알파벳 여부 체크
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkAlphabet(sFieldValue) {
    var pattern = /^([a-zA-Z\s])+$/;
    return pattern.test(sFieldValue);
}

/**
 * 숫자 체크
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkNumber(sFieldValue) {
    var pattern = /^\-?\d*\.?\d*$/;
    return pattern.test(sFieldValue);
}

/**
 * 정수 체크
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkInteger(sFieldValue) {
	var pattern = /^\-?\d*$/;
	return pattern.test(sFieldValue);
}

/**
 * 금액 체크(양수 & 3자리쉼표허용)
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkMoney(sFieldValue) {
	var pattern1 = /^\-?\d{0,3}(,\d{3})*?$/; // 쉼표를 한번 쓰면 3자리 맞추어 쓰기
	var pattern2 = /^\-?\d*$/;                     // 안쓸라면 숫자만 쓰기
	return pattern1.test(sFieldValue) || pattern2.test(sFieldValue);
}

/**
 * 한글 체크
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkKorean(sFieldValue) {
    var i = 0;
    while (true) {
        var varCh = sFieldValue.charAt(i++);
        if (varCh == "" || varCh == null) {
            break;
        } else if (varCh == ' ') {
            continue;
        } else {
            var ch = escape(varCh);
            if (ch.substring(0, 2) == "%u") {
                if (ch.substring(2, 4) == "00") {
                    return false;
                }
            } else if (ch.substring(0, 1) == "%") {
                if (parseInt(ch.substring(1, 3), 16) <= 127) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    return true;
}

/**
 * 한글/영문 체크
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkKorEng(sFieldValue) {
	var i = 0;
	while (true) {
		var varCh = sFieldValue.charAt(i++);
		if (varCh == "" || varCh == null) {
			break;
		} else if (varCh == ' ') {
			continue;
		} else {
			if( (varCh >= 'a' && varCh <= 'z') ||  (varCh >= 'A' && varCh <= 'Z') ){ continue; }
			var ch = escape(varCh);
			if (ch.substring(0, 2) == "%u") {
				if (ch.substring(2, 4) == "00") {
					return false;
				}
			} else if (ch.substring(0, 1) == "%") {
				if (parseInt(ch.substring(1, 3), 16) <= 127) {
					return false;
				}
			} else {
				return false;
			}
		}
	}
	
	return true;
}

/**
 * 우편번호 체크
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkPostcode(sFieldValue) {
	var pattern = /^(\d{3}-|\d{3})\d{3}$/;
	return pattern.test(sFieldValue);
}

/**
 * 최소길이 체크
 * @param {String} sFieldValue 문자
 * @param {Number} size 체크 길이 숫자
 * @return Boolean
 */
function cmm_chkMinLength(sFieldValue, size) {
	var length = null;
	
	if (!!sFieldValue) {
		length =(sFieldValue+'').length;
	} else {
		length = 0;
	}
	
	return length >= size;
}

/**
 * 최대길이 체크
 * @param {String} sFieldValue 문자
 * @param {Number} size 체크 길이 숫자
 * @return Boolean
 */
function cmm_chkMaxLength(sFieldValue, size) {
	var length = null;
	
	if (!!sFieldValue) {
	    length = (sFieldValue+'').length;
	} else {
		length = 0;
	}
	
	return length <= size;
}

/**
 * 공백제거(전체) 
 * @param {String} sFieldValue 문자열
 * @return String 공백제거된 문자열
 */
function cmm_trim(sFieldValue){
	return (""+sFieldValue).replace(/\s/g,"");
}  

/**
 * 공백제거(좌측) 
 * @param {String} sFieldValue 문자열
 * @return String 좌측 공백제거된 문자열
 */
function cmm_ltrim(sFieldValue){
	return (""+sFieldValue).replace(/^\s*/g,"");
}

/**
 * 공백제거(우측) 
 * @param {String} sFieldValue 문자열
 * @return String 우측 공백제거된 문자열
 */
function cmm_rtrim(sFieldValue){
	return (""+sFieldValue).replace(/\s*$/g,"");
}  

/**
 * replaceAll
 * @param {String} sFieldValue 문자열
 * @param {String} sourceStr 치환을 처리할 대상 문자열
 * @param {String} targetStr 치환 되는 문자열
 * @return String replaceAll 결과 문자열
 */
function cmm_replaceAll(sFieldValue, sourceStr, targetStr){
	var pattern = eval("/"+sourceStr+"/g");
	return (""+sFieldValue).replace(pattern,targetStr);
}  

/**
 * 문자채우기(좌측)<br>
 * paddingStr이 2자이상일 경우 총 길이에 맞춰서 일부분만 들어가게 될 수 있다.<br>
 * ex) paddingStr - abc, length - 5 인 경우<br>
 *      return값 => abcab 
 * @param {String} sFieldValue 문자열
 * @param {String} paddingStr 채워지게 될 문자 default - 공백
 * @param {Number} length 채워야 할 총 길이
 * @return String 결과 문자열
 */
function cmm_lpad(sFieldValue, paddingStr, length){
	if( cmm_isNull(paddingStr) ) paddingStr = " ";
	
	var padIdx = 0;
	var padLength = paddingStr.length;
	var sFieldValue = "" + sFieldValue;
	var sFieldValueLen = sFieldValue.length;
	var resultStr = "";
	for(var i=sFieldValueLen;i<length;i++){
		resultStr += paddingStr.charAt(padIdx);
		padIdx = (padIdx+1) % padLength;
	}
	return resultStr + sFieldValue;
}  

/**
 * 문자채우기(우측)<br>
 * paddingStr이 2자이상일 경우 총 길이에 맞춰서 일부분만 들어가게 될 수 있다.<br>
 * ex) paddingStr - abc, length - 5 인 경우<br>
 *      return값 => abcab 
 * @param {String} sFieldValue 문자열
 * @param {String} paddingStr 채워지게 될 문자 default - 공백
 * @param {Number} length 채워야 할 총 길이
 * @return String 결과 문자열
 */
function cmm_rpad(sFieldValue, paddingStr, length){
	if( cmm_isNull(paddingStr) ) paddingStr = " ";
	
	var padIdx = 0;
	var padLength = paddingStr.length;
	var sFieldValue = "" + sFieldValue;
	var sFieldValueLen = sFieldValue.length;
	for(var i=sFieldValueLen;i<length;i++){
		sFieldValue += paddingStr.charAt(padIdx);
		padIdx = (padIdx+1) % padLength;
	}
	return sFieldValue;
}  

/**
 * 문자열에서 지정된 문자를 제거한다
 * @param {String} sFieldValue 문자열
 * @param {String} removeStr 지울 문자열
 * @return String 결과 문자열
 */
function cmm_removeString(sFieldValue, removeStr){
	var pattern = eval("/"+removeStr+"/g");
	return (""+sFieldValue).replace(pattern,"");
}  

/**
 * 영문자, 숫자로만 구성되어있는지 체크하는 함수
 * @param {String} sFieldValue 문자
 * @return Boolean
 */
function cmm_chkAlphaNumeric(sFieldValue) {
    var pattern = /^[a-zA-Z0-9]*$/;
    return pattern.test(sFieldValue);
}  
    
/**
 * 3자리 단위로 Comma<br>
 * 숫자 이외의 문자는 replaceAll처리 되고 Comma 처리 
 * @param {String} sFieldValue 문자열
 * @return String comma 처리 된 문자열
 */
function cmm_getMoneyFormat(sFieldValue) {
	var returnValue = "";
	var minus = "";
	if( (""+sFieldValue).indexOf("-") == 0 ) minus = "-";
	sFieldValue = ("" + sFieldValue).replace(/\D/g,"");
	for(var i=sFieldValue.length-1;i>=0;i--){
		returnValue = sFieldValue.charAt(i) + returnValue;
		if( i!=0 && returnValue.replace(/\D/g,"").length % 3 == 0 ){
			returnValue = "," + returnValue;
		}
	}
	return minus + returnValue;
}

/**
 * 숫자 이외의 문자 제거 
 * @param {String} sFieldValue 문자열
 * @return Number 숫자만 Number 형태로 리턴
 */
function cmm_parseNumber(sFieldValue) {
	return Number(("" + sFieldValue).replace(/\D/g,""));
}

/**
 * 특수문자가 문자열 내에 존재하는지 체크하는 함수<br>
 * 특수문자 =>  ~`!@#$%%^&*()-_=+\|[{]};:\'\",<.>/?
 * @param {String} sFieldValue 문자열
 * @return Boolean
 */
function cmm_chkEtcChar(sFieldValue) {
	var etcValue = "~`!@#$%%^&*()-_=+\|[{]};:\'\",<.>/?";
	for(i=0;i<sFieldValue.length;i++){
		for(j=0;j<etcValue.length;j++){
			if(sFieldValue.charAt(i) == etcValue.charAt(j)) {
				return true;
			}
		}
	}
	return false;
}

/**
 * BigInt 타입 처리<br>
 * -9223372036854775808 ~ 9223372036854775807 
 * @param {String} sFieldValue 문자열
 * @return Boolean
 */
function cmm_chkBigInteger(sFieldValue) {
	if( cmm_chkInteger(sFieldValue) ){
		var chkValue = "" + sFieldValue;
		// 음수인 경우
		if( chkValue < "0" ){
			chkValue = chkValue.replace(/^-/,"");
			if( chkValue.length < 19 ){ return true; }
			else if( chkValue.length > 19 ){ return false; }
			else{
				if( chkValue <= "9223372036854775808" ){ return true;}
				else{ return false; }
			}
		}
		// 양수인 경우
		else{
			if( chkValue.length < 19 ){ return true; }
			else if( chkValue.length > 19 ){ return false; }
			else{
				if( chkValue <= "9223372036854775807" ){ return true;}
				else{ return false; }
			}
		}
	}
	return false;
}

/**
 * 브라우저의 종류를 확인하는 함수
 * @param 
 * @return String 브라우저 종류(약어)
 */
function cmm_getBrowser() {
    var ret = navigator.appName;
	if (ret == "Netscape")
		return "NE";
	else if (ret == "Microsoft Internet Explorer")
		return "IE";
	else
		return ret;
}

/**
 * 메세지 String
 * @param {String} messageID 메세지 ID
 * @param {Array} param 파라미터 Array
 * @return String 파라미터 적용된 String
 */
function cmm_getMsg(messageID, param){
	var msgStr = eval("cmm_messageJSON."+messageID);
	if( cmm_isNull(msgStr) ){
		alert("MessageID가 존재하지 않습니다. - "+messageID);
		return null;
	}
	
	var paramMatchArr = msgStr.match(/\$\d+/g);
	var paramIndex;
	if( paramMatchArr != null ){
		for(var i=0;i<paramMatchArr.length;i++){
			paramIndex = Number(paramMatchArr[i].replace("$","")) - 1;
			if( param != null && param[paramIndex] != null ){
				msgStr = msgStr.replace(paramMatchArr[i],param[paramIndex]);
			}
		}
	}
	return msgStr;
}

/**
 * Alert창으로 메세지 String을 보여준다.
 * @param {String} msg 메시지
 * @param {String} title Alert창 제목
 * @param {String} callback 확인 버튼 클릭시 callback 함수
 * @return
 */
function cmm_getMsgAlert(message, title, callback, position) {
	// message 부분에 messageId를 넣었을 경우에 기본 Alert로 띄움
	var msgStr;
	try {
		msgStr = eval("cmm_messageJSON."+message);
	} catch (e) {}

	if( !cmm_isNull(msgStr) ) {
		alert(cmm_getMsg(message));
	} else {
		jAlert(message, title, callback, position);
	}
}

/**
 * Confirm창으로 메세지 String을 보여준다.
 * @param {String} msg 메시지
 * @param {String} title Alert창 제목
 * @param {String} okCallback 확인 버튼 클릭시 callback 함수
 * @param {String} cancelCallback 닫기 버튼 클릭시 callback 함수
 */
function cmm_getMsgConfirm(message, title, okCallback, cancelCallback, position, okBtn, cancelBtn) {
	// message 부분에 messageId를 넣었을 경우에 기본 Confirm으로 띄움
	var msgStr;
	try {
		msgStr = eval("cmm_messageJSON."+message);
	} catch (e) {}

	if( !cmm_isNull(msgStr) ) {
		return confirm(cmm_getMsg(message));
	} else {
	    jConfirm(message, title, function(r) {
	        if(r) {
	            if (okCallback) eval(okCallback)();
	        } else {
	            if (cancelCallback) eval(cancelCallback)();
	        }
	    }, position, okBtn, cancelBtn);
	}
}

/**
 * 화면 전환 함수
 * @param {String} action URL - Context Root를 제외한 절대경로 ex) /ui/cm/a/a/TEP.xml
 * @param {String} data 전달 데이터값(json)
 * @param {String} options 전달 옵션값(json)
 * @param {String} menuId 전달 메뉴ID(String)
 * @return 
 */
function cmm_openPage(actionId, data, options, menuId) {
	var curPos = cmmframework.session.get("historyCurrentPosition"); // history상의 현재페이지의 위치
	++curPos;
	cmmframework.session.set("historyCurrentPosition", curPos);
	cmmframework.session.set("historyCurrentPositionSum", curPos);
	
	if(options != undefined && options.retain == "Y") {
		cmm_pushMapperData();
		var screenId = cmmframework.session.get("screenId");
		cmmframework.session.set(screenId+"_html", $('[data-role="page"]').html());
		cmmframework.session.set(screenId+"_retain", "Y");
	}
	cmmframework.goPage(actionId, data, menuId);
}

/**
 * 타 서버 이동에 param 던져주는 화면 전환 함수
 * @param {String} action Id - 액션ID ex) UTBMPAAA01F001
 * @param {String} data 전달 데이터값(json)
 * @param {String} options 전달 옵션값(json)
 * @param {String} menuId 전달 메뉴ID(String)
 */
function cmm_openPageParam(actionId, data, options, menuId) {
	var curPos = cmmframework.session.get("historyCurrentPosition"); // history상의 현재페이지의 위치
	++curPos;
	cmmframework.session.set("historyCurrentPosition", curPos);
	cmmframework.session.set("historyCurrentPositionSum", curPos);
	
	if(options != undefined && options.retain == "Y") {
		cmm_pushMapperData();
		var screenId = cmmframework.session.get("screenId");
		cmmframework.session.set(screenId+"_html", $('[data-role="page"]').html());
		cmmframework.session.set(screenId+"_retain", "Y");
	}
	cmmframework.goPageParam(actionId, data, menuId);
}


/**
 * @description Full전화번호를 '-'으로 표시하기 위해 3단계로 나눈다. 
 * @example cmm_setTelnoSep(fullTelNo, telno0, telno1, telno2);<br>
 * 02-xxx-xxxx, 02-xxxx-xxxx, xxx-xxx-xxxx, xxx-xxxx-xxxx
 * @param {String} fullTelNo Full전화번호
 * @param {String} telno0 지역번호를 넣는 텍스트박스 ID값
 * @param {String} telno1 가운데자리 번호를 넣는 텍스트박스 ID값
 * @param {String} telno2 마지막자리 번호를 넣는 텍스트박스 ID값
 * @return ID가(telno0, telno1, telno2)인 Component에 전화번호를 파싱하여 값을 넣는다.
 * @since 2013/10/01
 */
function cmm_setTelnoSep(fullTelNo, telno0, telno1, telno2) {
	
	//함수오버로딩 안됨 일단 하나의 함수로 
	if(telno0 == undefined){
		if(cmm_chkPhone(fullTelNo)) {
			var telno = fullTelNo;
			var tel0 = telno.substring(0,2);
			var truncTelNum = telno.substring(0, telno.length-4);		//뒷자리 4개 자른것
			var rtnTelNo;
			
			if (tel0 == "02") {
				rtnTelNo = telno.substring(0,2) + "-" + truncTelNum.substring(2, truncTelNum.length) + "-" + telno.substring(telno.length-4, telno.length);
			} else {
				rtnTelNo = telno.substring(0,3) + "-" + truncTelNum.substring(3, truncTelNum.length) + "-" + telno.substring(telno.length-4, telno.length);
			}
			
			return rtnTelNo;
		}
	}else{
		if(cmm_chkPhone(fullTelNo)) {
			var telno = fullTelNo;
			var tel0 = telno.substring(0,2);
			var truncTelNum = telno.substring(0, telno.length-4);		//뒷자리 4개 자른것
			
			if(tel0 == "02") {
				$("#"+telno0).val(telno.substring(0,2));
				$("#"+telno1).val(truncTelNum.substring(2, truncTelNum.length));
			} else {
				$("#"+telno0).val(telno.substring(0,3));
				$("#"+telno1).val(truncTelNum.substring(3, truncTelNum.length));
			}
			
			$("#"+telno2).val(telno.substring(telno.length-4, telno.length));
		}
	}
	
	
}

/**
 * getCrlf
 * @param {String} sFieldValue string
 * @return String replaceAll Crlf -> <br>
 */
function cmm_getCrlf(str){
	return str.replace(/\n/g, "<br />");
}

/**
 *  납세자번호 masking DisplayFormatter함수
 * @param {String} value Formatting할 value
 * @return String Format이 적용된 value
 */	
function cmm_fmtMaskingTaxpayerNo(val){
	var rtnVal="";
    			
	if(val.length != 10){ // 10자리일때는 사업자등록번호일 수 있으므로 
		for(var i=0;i<val.length;i++){
			if(i>5){
				rtnVal = rtnVal + "*";
			}else{
				rtnVal = rtnVal+val.charAt(i);
			}
		}
	}else{
		rtnVal = val;
	}
    			
	rtnVal = rtnVal.replace(/^(\d{3})(\d{2})(\d{5})$/,"$1-$2-$3");
	rtnVal = rtnVal.replace(/^(\d{6})(\S{7})$/,"$1-$2");

	return rtnVal;
}

/**
 *  주민등록번호 masking DisplayFormatter함수
 * @param {String} value Formatting할 value
 * @return String Format이 적용된 value
 */
function cmm_fmtMaskingResNo(val){
	var rtnVal="";
	
	for(var i=0;i<val.length;i++){
		if(i>5){
			rtnVal = rtnVal + "*";
		}else{
			rtnVal = rtnVal+val.charAt(i);
		}
	}
    			
	rtnVal = rtnVal.replace(/^(\d{6})(\S{7})$/,"$1-$2");

	return rtnVal;
}


/**
 *  여권번호 masking DisplayFormatter함수
 * @param {String} value Formatting할 value
 * @return String Format이 적용된 value
 */
function cmm_fmtMaskingPassport(val){
	var rtnVal="";
	
	for(var i=0;i<val.length;i++){
		if(i>4){
			rtnVal = rtnVal + "*";
		}else{
			rtnVal = rtnVal+val.charAt(i);
		}
	}

	return rtnVal;
}

/**
 *  카드번호 masking DisplayFormatter함수
 * @param {String} value Formatting할 value
 * @return String Format이 적용된 value
 */
function cmm_fmtMaskingCreditCard(val){
	var rtnVal="";
	
	for(var i=0;i<val.length;i++){
		if(i>3 && i<12){
			rtnVal = rtnVal + "*";
		}else{
			rtnVal = rtnVal+val.charAt(i);
		}
	}
	
	rtnVal = rtnVal.replace(/^(\d{4})(\S{4})(\S{4})(\d{2})$/,"$1-$2-$3-$4"); //다이너스 카드
	rtnVal = rtnVal.replace(/^(\d{4})(\S{4})(\S{4})(\d{3})$/,"$1-$2-$3-$4"); //아멕스 카드
	rtnVal = rtnVal.replace(/^(\d{4})(\S{4})(\S{4})(\d{4})$/,"$1-$2-$3-$4");

	return rtnVal;
}

/**
 *  운전면허번호 masking DisplayFormatter함수
 * @param {String} value Formatting할 value
 * @return String Format이 적용된 value
 */
function cmm_fmtMaskingDriverLicense(val){
	var rtnVal="";
	
	for(var i=0;i<val.length;i++){
		if(i>3){
			rtnVal = rtnVal + "*";
		}else{
			rtnVal = rtnVal+val.charAt(i);
		}
	}
	
	rtnVal = rtnVal.replace(/^(\S{2})(\d{2})(\S{6})(\S{2})$/,"$1-$2-$3-$4");

	return rtnVal;
}

/**
 *  앞의 첫글자를 제외한 나머지 masking DisplayFormatter함수
 * @param {String} value Formatting할 value
 * @return String Format이 적용된 value
 */
function cmm_fmtMaskingNotFirst(val){
	var rtnVal="";
	
	for(var i=0;i<val.length;i++){
		if(i>0){
			rtnVal = rtnVal + "*";
		}else{
			rtnVal = rtnVal+val.charAt(i);
		}
	}

	return rtnVal;
}

/**
 *  오늘 날짜를 가져오는 함수
 * @param 
 * @return String 8자리 오늘 날짜(YYYYMMDD) 
 */
function cmm_getToday() {
	var date = new Date();
	var y = date.getFullYear();
	var m = cmm_twoZero(date.getMonth() + 1);
	var d = cmm_twoZero(date.getDate());
	
	return y+m+d;
}

/**
 *  기준일자를 기준으로 년/월/일 전후 날짜를 가져오는 함수
 * @param {String} startDt 기준일자
 * @param {String} index 구분(Y:년, M:월, D:일)
 * @param {Number} val 조회하고자 하는 전후일자
 * @return String 조회된 날짜 
 */
function cmm_getDay(startDt, index, val) {
	var newDt = new Date(cmm_cvtDateFormat("yyyy-MM-dd", startDt));
	
	if(index == "Y") {
		var y = newDt.getFullYear()+eval(val);
		var m = cmm_twoZero(newDt.getMonth());
		var d = cmm_twoZero(newDt.getDate());
		newDt = new Date(y, m, d);
	}
	else if(index == "M") {
		newDt.setMonth(newDt.getMonth()+eval(val));
	}
	else if(index == "D") {
		newDt.setDate(newDt.getDate()+eval(val));
	}
	else {
		
	}
	var y = newDt.getFullYear();
	var m = cmm_twoZero(newDt.getMonth() + 1);
	var d = cmm_twoZero(newDt.getDate());
	
	return y+m+d;	
}


/**
 *  main 페이지 이동
 */
function goToMain() {
	
	var resultId = new RegExp('[\?&]menuId=([^&#]*)').exec(window.location.href); 
	var asisYn =  cmm_getCookie("mobAsis");
	var resultMenuId = "";
	
	if(resultId != undefined && !cmm_isNull(resultId)){
		resultMenuId = resultId[1]||0;
	}
	
	if(asisYn == "Y" || resultMenuId == "8004000000"){
		cmm_openPage("UTBMPBAA44F001", {
			"server" : "ppserver"
		});

	}else{
		
		if ("02" === cmmframework.session.get("lgnUserClCd")) {
		//비회원 로그인이 되어 있는 경우 비회원 전용 메뉴 호출
//		cmm_callNative("NON_MEMBER_LOGIN", "actionId=UTBPPZAA01F001&menuId=1750000000");
		
		//비회원 메뉴 페이지 이동
		cmm_openPage("UTBPPZAA04F001",{server:"ppserver"});
		} else {
			//메인 페이지 이동
			cmm_openPage("UTBPPZAA01F001", {server:"ppserver"});
		}
		
	}
}


/**
 *  json -> xml 변환
 * @param {object} json
 * @return xml
 */
function json2Xml(json) {
	var xml = "";

	for (var x in json) {
		if (json.hasOwnProperty(x)) {
			xml += "<" + x + ">" + json[x] + "</" + x + ">";
		}
	}	
	return xml;
}

/**
 *  SessionId로 mapper Type의 데이터 Session에 저장
 * @param 
 * @return 
 */
function cmm_pushMapperData() {	
	var screenId = cmmframework.session.get("screenId");
	var tmpDataList = [];
	var tmpObj = "{";
	tmpObj += "\"mapper\":" + JSON.stringify(eval(mapper)) + ",";
	for (var i=0; i<mapper.length; i++) {
		for(var j=0; j<mapper[i].action.indatalist.length; j++) {
			var type = mapper[i].action.indatalist[j].type;
			var src = mapper[i].action.indatalist[j].src;

			switch (type) {
			case "search" :
				src = src.substring(0, src.indexOf("["));
				break;
			}
			if(JSON.stringify(eval(src)) != undefined) {
				tmpObj += "\"" + src + "\":" + JSON.stringify(eval(src)) + ",";
				tmpDataList.push(src);
			}
		}
		for(var k=0; k<mapper[i].action.outdatalist.length; k++) {
			var des = mapper[i].action.outdatalist[k].des;
			if(JSON.stringify(eval(des)) != undefined) {
				tmpObj += "\"" + des + "\":" + JSON.stringify(eval(des)) + ",";
				tmpDataList.push(des);
			}
		}
	}
	tmpObj += "\"tmpDataList\"" + ":" + "\"" + tmpDataList + "\"";
	tmpObj +="}";
	cmmframework.session.set(screenId+"_mapper", tmpObj);
}

/**
 *  SessionId로 Session에 저장 mapper Type 데이터 가져하기
 * @param {String} screenId
 * @return 
 */
function cmm_pullMapperData(screenId, callFuncName) {
	
	var tmpObj = JSON.parse(cmmframework.session.get(screenId+"_mapper").replace(/\\(?!\")/g, "\\\\"));
	eval("mapper = tmpObj.mapper");
	var tmpDataList = tmpObj.tmpDataList.split(",");
	if(tmpDataList != "") {
		for ( var int = 0; int < tmpDataList.length; int++) {
			var tmpMapper = tmpDataList[int];
			eval(tmpMapper + " = tmpObj." + tmpMapper);
		}
	}
	
	if(callFuncName != undefined) {
		try {
			eval(callFuncName)();
		} catch (e) {}
	}
}

/**
 *  Native 호출
 * @param {String} id 구분ID
 * @param {String} data 전달할 data값
 * @return 
 */
function cmm_callNative(id, data) {
	
	if( id == "MAIN" ){
		goToMain();
	}else if( id == "CALLLOGOUT"){
		 cmm_callNative("LOGOUT");
	}else{	
		if (data == null) data = {};
		var interfaceInfo = new Object();
		interfaceInfo.actionId = id;
		interfaceInfo.data = data;
		var jsonData = JSON.stringify(interfaceInfo);
		
		/*모바일 환경에서만 수행 되도록 수정*/
		if (cmmframework.session.get("userAgent") == "iOS" || cmmframework.session.get("userAgent") == "Android") {
			window.location = 'hybrid_cmm_app://' + jsonData;
		}
		
	}
}

/**
 *  Native 호출 후 CallBack
 * @param {String} data 전달받은 data값
 * @return
 */
function cmm_calledByNative(data) {
	cmm_callbackNative(data);
}

/**
 * Native FIDO 관련 CallBack 함수
 * @param {Json} data 전달받은 data값
 * @return
 */
function cmm_calledByFidoNative(data) {
	cmm_callbackFidoNative(data);
}

/**
 *  Native 호출 후 CallBack
 * @param {String} data 전달받은 data값
 * @return
 */
function cmm_calledByLifeCycleNative(data) {
	if (!cmm_isNull(data)) {
		if (!cmm_isNull(data.event) && data.event == "viewWillAppear") {
			rebindSecureKeypad();
		}
	}
	//cmm_callbackNative(data);
}

/**
 *  Datepicker, Timepicker 호출 후 CallBack
 * @param {String} id date, time 타입의 id
 * @param {String} data 전달받은 data값
 * @return 
 */
function cmm_setPickerData(id, data) {
	$('#'+id).val(data);
}

/**
 *  Native에 저장된 이미지 가져오기
 * @param {String} imagePlace Session에 저장할 값
 * @param {String} type
 * @return 
 */
function cmm_getPhoto(imagePlace, type, imageCallBackFunc, imgOption) {
	if (imageCallBackFunc == undefined) imageCallBackFunc = "";
	cmmframework.session.del("imagePlace");
	cmmframework.session.del("imageCallBackFunc");
	cmmframework.session.set("imagePlace", imagePlace);
	cmmframework.session.set("imageCallBackFunc", imageCallBackFunc);
	
	
	//destinationType:destinationType.DATA_URL을 수정하여 테스트 해보자..사
	if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) {
		try{
			if(imgOption== undefined){
				imgOption.useYn = "N";
			}
			
			if(imgOption.useYn == "Y"){
				var imgTargetWidth = "793";
				var imgTargetHeight = "1123";
				if(imgOption.Width !=null){
					imgTargetWidth = imgOption.Width; 
				}
				if(imgOption.Height !=null){
					imgTargetHeight = imgOption.Height;
				}
				navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type, targetWidth:imgTargetWidth, targetHeight:imgTargetHeight});
			}else{
				navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type});
			}
		}catch(e){
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type});
		}
	}else{
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type});
	}
}



/**
 *  Native에 저장된 이미지 가져오기
 * @param {String} imagePlace Session에 저장할 값
 * @param {String} type
 * @return 
 */
function cmm_getPhotoTb(imagePlace,imageFileNm,imageFileSize, type, imageCallBackFunc, imgOption) {
	if (imageCallBackFunc == undefined) imageCallBackFunc = "";
	cmmframework.session.del("imagePlace");
	cmmframework.session.del("imageFileNm");
	cmmframework.session.del("imageFileSize");
	cmmframework.session.del("imageCallBackFunc");
	
	cmmframework.session.set("imagePlace", imagePlace);
	cmmframework.session.set("imageFileNm", imageFileNm);
	cmmframework.session.set("imageFileSize", imageFileSize);
	cmmframework.session.set("imageCallBackFunc", imageCallBackFunc);
	
	
	//destinationType:destinationType.DATA_URL을 수정하여 테스트 해보자..사
	if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) {
		try{
			if(imgOption== undefined){
				imgOption.useYn = "N";
			}
			
			if(imgOption.useYn == "Y"){
				var imgTargetWidth = "793";
				var imgTargetHeight = "1123";
				if(imgOption.Width !=null){
					imgTargetWidth = imgOption.Width; 
				}
				if(imgOption.Height !=null){
					imgTargetHeight = imgOption.Height;
				}
				//navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type, targetWidth:imgTargetWidth, targetHeight:imgTargetHeight});
				cmm_callNative("GET_PICTURE","");

			}else{
				//navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type});
				cmm_callNative("GET_PICTURE","");

			}
		}catch(e){
			//navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type});
			cmm_callNative("GET_PICTURE","");

		}
	}else{
		//navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50, destinationType:destinationType.DATA_URL, sourceType:type});
		cmm_callNative("GET_PICTURE","");
	}
}



/**
 *  Response Header의 Cookie 추출
 * @param {String} cookoie key 값
 * @return 
 */
function cmm_getCookie(key) {
	var keyvalue = document.cookie.match('(^|;)?' + key + '=([^;]*)(;|$)');
	return keyvalue ? keyvalue[2] : null;
}

/**
 * 숫자만 입력을 허용한다.
 * @param e.keyCode
 * @return
 */
function isNumber(e) {
	var code = e.keyCode;
	
	//숫자 입력 허용
	if (code > 47 && code < 58) { return; }
	//점(.) 입력 허용
	if (code === 110 || code === 190 || code === 229) { return; }
	//if (code === 110 || code === 190) { return; }
	
	//방향키(←,→) 입력 허용
	if (code === 37 || code === 39) { return; }
	//백스페이스, 삭제(Delete) 입력 허용
	if (code === 8 || code === 46) { return; }
	
	e.preventDefault();
}

function isNum(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if((keyID >=48 && keyID <=57) || (keyID >=96 && keyID <=105)){
		return;
	}else{
		keyID.preventDefault();
	}
	
}

/**
 * 세션상 메뉴 데이터 존재 여부
 */
function cmm_isMenuDataObj(){

	if( cmmframework.local.get("menuDataObj") == undefined && cmm_serverType() != "L"){
		cmm_getMenuActn();
	}			
}

// 메뉴 조회조건VO
var mobMenuInqrCndVO = {};
/**
 * 메뉴 조회를 위한 액션 
 */
 
function cmm_getMenuActn(){
	
	mobMenuInqrCndVO.lgnUserClCd	= cmmframework.session.get("lgnUserClCd");
	mobMenuInqrCndVO.lgnCertCd	= cmmframework.session.get("lgnCertCd");
	//var menuTmpMapper = [];
	//var actnCnt = 0;
	
	//mapper 생성
	var actionObj = {
			action : {
				id : "ATXPPAAA001R36",
				indatalist	: [{ type : "vo",  src : "mobMenuInqrCndVO", des : "MobMenuDataSVO"}],
				outdatalist	: [{ type : "search",  src : "response", des : "mobMenuStrcDataVO"}]
			}
	};
	
	//mapper 상태 확인하고 actionObj mapper 에 등록
	cmm_setMapper(actionObj);

	if(cmmframework.session.get("server").indexOf("teer") > 0){
		// 20191226 : 상담센터(teer)는 서버가 다르므로 server 타입을 명시
		cmm_doService("ATXPPAAA001R36", {"callbackFunc": "cmm_mobMenuCallBack","server":"ppserver", "loadingBarYn":"N"});
	}else{
		cmm_doService("ATXPPAAA001R36", {"callbackFunc": "cmm_mobMenuCallBack", "loadingBarYn":"N"});
	}
	

}

/**
 *  메뉴 조회 액션 콜백
 * @param actionId		: ATXPPAAA001R36
 * @param msgArr		: msgArr[]
 * @returns {Boolean}	: N/A
 */

function cmm_mobMenuCallBack(actionId, msgArr){
	var result = msgArr[0];		//result ==&gt; 메시지 구분 ( "S" : 성공 (메시지 유무 상관 없음) , "E" : 실패 (Exception) )
	
	if ("S" != result) {
		
		return false;
	}
	
	var menuObjResult = eval("obj=" + mobMenuStrcDataVO.menuStrcData);

	cmmframework.local.set("menuDataObj",menuObjResult);
}


/**
 * URL param 파싱
 * @param 
 * @return 
 */
function cmm_getUrlParam(){
	
	var params = {};
	
	window.location.search.replace (
		/[?&]+([^=&]+)=([^&]*)/gi,
		function (str, key, value) {
			params[key] = value;
		}
	);
	return params;
}



/**
 * mapper가 선언된 페이지를 공유하는 페이지의 경우(ex : $.mobile.loadPage 사용)
 * mapper parent 페이지의 mapper 상태를 확인한 후 mapper에 actionObj를 추가한다. 
 * @param 
 * @return 
 */
function cmm_setMapper(actionObj){
	
	
	var chkMapper = true;
	var tempMapper = [];
	
	if(typeof(mapper) === "undefined"){
		mapper = [];
	}
	
	for(var i=0; i<mapper.length;i++){
		
		if(cmm_isNull(mapper[i].action)){ //mapper 안의 Obj에 action 필드가 존재하지 않는 다면 잘못된 mapper
			chkMapper = false; 
		} 
	}
	
	//정상적인 mapper라면 
	if(chkMapper){
		
		var chkActionId = false;
		
		$.each(mapper, function (index, item){
			
			if(item.action.id === actionObj.action.id){
				chkActionId = true;
			}
		});
		
		if(chkActionId === false){
			mapper.push(actionObj);
		}
		
	} else { //정상적인 mapper가 아니라면
		
		tempMapper.push(actionObj);
		mapper = tempMapper;
		
	}
	
}

function fn_prevBtn() {
	if ( !cmm_isNull($(".btn_prev").html() && $(".btn_prev").length > 0) ) {
		footer_nav_back();
	}
	if ( !cmm_isNull($(".btn_prevetc").html() && $(".btn_prevetc").length > 0) ) {
		fn_comPrevBtn();
	}
}


function cmm_getCookieval(offset){
	var endstr = document.cookie.indexOf(";", offset);
	
	if(endstr == -1){
		endstr = document.cookie.length;
	}
	
	return unescape(document.cookie.substring(offset, endstr));
}

function cmm_getAllDomainCookie(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	
	while( i< clen ){
		
		var j = i + alen;
		if(document.cookie.substring(i,j) == arg){
			return cmm_getCookieval(j);
		}
		i = document.cookie.indexOf("", i) + 1;
		if( i == 0){
			break;
		}
	}
	
	return null;
}

function cmm_setCookie(name, value, expires, path, domain, secure) {
	document.cookie = name + "=" + escape(value) +
	((expires)?";expires=" + expires.toGMTString():"")+
	((path)?";path=" + path:"") +
	((domain)?";domain=" + domain:"") +
	((secure)?";secure=" + secure:"");
}


/**
 * @description 현재날짜 조회
 */
function cmm_currentDate(type) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	if (type == 'year') {
		return yyyy;
	} else if (type == 'mon') {
		return mm;
	} else if (type == 'day') {
		return dd;
	}

	return '' + yyyy + mm + dd;
}

function cmm_currentDateTime() {
	var today = new Date();
	var time = cmm_getToday();
	var hh = String(today.getHours()) > 9 ? String(today.getHours()) : "0" + today.getHours();
	var mm = String(today.getMinutes()) > 9 ? String(today.getMinutes()) : "0" + today.getMinutes();
	var ss = String(today.getSeconds()) > 9 ? String(today.getSeconds()) : "0" + today.getSeconds();
	time = time.concat(hh).concat(mm).concat(ss);
	return time;
}





/**
 * 캘린더 디폴트 옵션
 */
var calendarOptions = {};

/**
 * 캘린더 바인딩
 * 
* @param {String} targetElementID : 캘린더 이벤트를 바인딩할 객체의 ID.
* @param {String} options.yearRange 디폴트 값 : 현재 년도 기준, 9년 전부터 9년 후까지.
* @param {String} options.dateFormat 디폴트 값 : "yy-mm-dd".
* @param {String} options.changeMonth 디폴트 값 : true.
* @param {Number} options.changeYear 디폴트 값 : true.
* @param {String} options.inputTargetID : 캘린더 입력값 적용 객체 ID. 디폴트 값 : targetElementID(캘린더 호출 객체 자신).
 */
function cmm_bindDatepicker(targetElementID, options) {
	var $target = $("#" + targetElementID);
	if ($target.length == 0) return;
	
	var curDate = new Date();
	var year = curDate.getFullYear();
	var yearRangeStr = (year-9)+":"+(year+9);
	
	calendarOptions[targetElementID] = options || {};
	
	var yearRange = calendarOptions[targetElementID].yearRange || yearRangeStr;
	var dateFormat = calendarOptions[targetElementID].dateFormat || "yy-mm-dd";
	var changeMonth = true;
	var changeYear = true;
	if (calendarOptions[targetElementID].changeMonth == 'N') {
		changeMonth = false;
	}
	if (calendarOptions[targetElementID].changeYear == 'N') {
		changeYear = false;
	}
	var inputTargetID = calendarOptions[targetElementID].inputTargetID || targetElementID;
	
	//cmm_openDatepickerBtnShow(inputTargetID, yearRange, dateFormat, changeMonth, changeYear);
	
	/*$target.off("focus").on("focus", function(){
		cmm_openDatepicker(inputTargetID, yearRange, dateFormat, changeMonth, changeYear);
	});*/
	
	cmm_openDatepicker(inputTargetID, yearRange, dateFormat, changeMonth, changeYear);
	
	$target.blur();
}

function cmm_openDatepicker(inputTargetID, yearRange, dateFormat, changeMonth, changeYear) {
	var $target = $("#" + inputTargetID);
	$.datepicker.setDefaults({
		/************** 업무단 수정 start **************/
		yearRange: yearRange,		//from~to년도 설정
		dateFormat: dateFormat,		//데이터 포맷
		changeMonth: changeMonth,	//month 셀렉트박스 허용
		changeYear: true,			//year 셀렉트박스 사용
		//changeYear: changeYear,	//year 셀렉트박스 사용
		/************** 업무단 수정 end **************/
		showAnim: "fadeIn",
		duration : "fast",
		//showOn: "focus",
		showOn: "",
		buttonImage: "",
		buttonImageOnly: false,
		buttonText: "",
		nextText: '다음달',
		prevText: '지난달',
		showMonthAfterYear: true,
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],		//Names of months for drop-down and formatting
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],	//For formatting
		dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],	//For formatting
		dayNamesShort: ['일','월','화','수','목','금','토'],	//For formatting
		dayNamesMin: ['일','월','화','수','목','금','토'],	//Column headings for days starting at Sunday
		ignoreReadonly: true,
		beforeShow: function(input) {	//공통 부분(달력 열기)
			$('#ui-datepicker-div').before('<div id="datepicker_container" class="dimmed"><div>');	
			$('#ui-datepicker-div').attr("tabindex","1");
			$("body").css({'overflow':'hidden'});
			$(window).css({'overflow':'hidden'});
			setTimeout(function(){
				$(".ui-datepicker-prev").attr("tabindex","0");
				$(".ui-datepicker-next").attr("tabindex","0");
				$('#ui-datepicker-div').attr("title","년월일달력");				
				$('.ui-datepicker-year').attr("title","년도선택");
				$('.ui-datepicker-month').attr("title","월선택");
				$('.ui-datepicker-current-day a').attr("title","선택된 일자");	
				$('.ui-datepicker-today a').attr("title","오늘날자");
				$('#ui-datepicker-div').focus();
			},500);
		},
		onClose: function() {			//공통 부분(달력 닫기)
			$('#datepicker_container').remove();	//삭제금지 masking
			$("body").css({'overflow':'inherit'});
			$(window).css({'overflow':'auto'});
			$($target).next().focus();
			
		}
	});
	
	$target.datepicker();
	$target.datepicker('show');
	
	if (!changeYear || !changeMonth) {
		$('.ui-datepicker .ui-datepicker-prev').css('display','none');
		$('.ui-datepicker .ui-datepicker-next').css('display','none');
	}
}
 
function cmm_openDatepickerBtnShow(inputTargetID, yearRange, dateFormat, changeMonth, changeYear) { //버튼만 보이게하기위해 사용
	var $target = $("#" + inputTargetID);
	$.datepicker.setDefaults({
		/************** 업무단 수정 start **************/
		yearRange: yearRange,		//from~to년도 설정
		dateFormat: dateFormat,		//데이터 포맷
		changeMonth: changeMonth,	//month 셀렉트박스 허용
		changeYear: true,			//year 셀렉트박스 사용
		//changeYear: changeYear,	//year 셀렉트박스 사용
		/************** 업무단 수정 end **************/
		showAnim: "fadeIn",
		duration : "fast",
		//showOn: "focus",
		showOn: "button",
		buttonImage: "",
		buttonImageOnly: false,
		buttonText: "달력",
		nextText: '다음달',
		prevText: '지난달',
		showMonthAfterYear: true,
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],		//Names of months for drop-down and formatting
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],	//For formatting
		dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],	//For formatting
		dayNamesShort: ['일','월','화','수','목','금','토'],	//For formatting
		dayNamesMin: ['일','월','화','수','목','금','토'],	//Column headings for days starting at Sunday
		ignoreReadonly: true,
		beforeShow: function(input) {	//공통 부분(달력 열기)
			$('#ui-datepicker-div').before('<div id="datepicker_container" class="dimmed"><div>');
			$('#ui-datepicker-div').attr("tabindex","1");
			$("body").css({'overflow':'hidden'});
			$(window).css({'overflow':'hidden'});
			setTimeout(function(){
				$(".ui-datepicker-prev").attr("tabindex","0");
				$(".ui-datepicker-next").attr("tabindex","0");
				$('#ui-datepicker-div').attr("title","년월일달력");				
				$('.ui-datepicker-year').attr("title","년도선택");
				$('.ui-datepicker-month').attr("title","월선택");
				$('.ui-datepicker-current-day a').attr("title","선택된 일자");	
				$('.ui-datepicker-today a').attr("title","오늘날자");
				$('#ui-datepicker-div').focus();
			},500);
		},
		onClose: function() {			//공통 부분(달력 닫기)
			$('#datepicker_container').remove();	//삭제금지 masking
			$("body").css({'overflow':'inherit'});
			$(window).css({'overflow':'auto'});
			$target.focus();
		}
	});
	
	$target.datepicker();
	//$target.datepicker('show'); //버튼만 보이게하고 달력은 보이게 하지않음
	
	if (!changeYear || !changeMonth) {
		$('.ui-datepicker .ui-datepicker-prev').css('display','none');
		$('.ui-datepicker .ui-datepicker-next').css('display','none');
	}
}

$(document).on("click",".ui-datepicker-prev",function(){
	$(".ui-datepicker-month").focus();
	setTimeout(function(){
		$(".ui-datepicker-prev").attr("tabindex","0");
		$(".ui-datepicker-next").attr("tabindex","0");
		$('#ui-datepicker-div').attr("title","년월일달력");				
		$('.ui-datepicker-year').attr("title","년도선택");
		$('.ui-datepicker-month').attr("title","월선택");
		$('.ui-datepicker-current-day a').attr("title","선택된 일자");	
		$('.ui-datepicker-today a').attr("title","오늘날자");				
		$(".ui-datepicker-prev").focus();
	},500);
});
$(document).on("click",".ui-datepicker-next",function(){
	$(".ui-datepicker-month").focus();
	setTimeout(function(){
		$(".ui-datepicker-prev").attr("tabindex","0");
		$(".ui-datepicker-next").attr("tabindex","0");
		$('#ui-datepicker-div').attr("title","년월일달력");				
		$('.ui-datepicker-year').attr("title","년도선택");
		$('.ui-datepicker-month').attr("title","월선택");
		$('.ui-datepicker-current-day a').attr("title","선택된 일자");	
		$('.ui-datepicker-today a').attr("title","오늘날자");				
		$(".ui-datepicker-next").focus();
	},500);
});
