/**
 * 유틸리티
 */
$util = {};

/**
 * 이메일 셋팅
 * 
 * @param element 대상 엘리먼트
 * @param target 도메인 input 객체, 없으면 이전 이전 객체를 디폴트로 셋팅
 */
$util.setEmailSelector = function(element,target){
	var $this = $(element);
	target = target || $this.prev().prev();
	if($this.val() == ""){
		target
				.val("")
				.removeAttr('readonly')
				.focus();
	}else{
		target
				.val($this.val())
				.attr('readonly',true);
	}
};

/**
 * 고정 값
 */
$constants = {};

/**
 * width : 창 가로길이 지정 
 * height : 창 세로길이 지정
 * toolbar : 단축도구창 유무 지정 [no, yes]
 * menubar : 메뉴창 유무 지정 [no, yes]
 * location : 주소창 유무 지정 [no, yes]
 * scrollbars : 스크롤바 유무지정 [no, yes]
 * status : 아래 상태바창 유무 지정 [no, yes]
 * realzable : 창변형 유무 지정 [no, yes]
 * fullscreen : 전체화면 유무 지정 [no, yes]
 * channelmode=yes : 앞&뒤로 창최소화,닫기등을 설정 (F11키랑 같음)
 * left=0, top=0 : 창을 왼쪽 구석에 고정
 */
$constants.windowFeature = function(option){
	var result = "";
	var feature = {
		width : "1024" 
		,height : "768"
		,toolbar : "no"
		,menubar : "no"
		,location : "no"
		,scrollbars : "no"
		,status : "no"
		,realzable : "yes"
		,fullscreen : "no"
		,left : 0
		,top : 0
	};
	$.extend(feature,option);
	$.each(feature,function(key,value){
		result += ","+key+"="+value;
	});
	return result.substring(1,result.length);
};