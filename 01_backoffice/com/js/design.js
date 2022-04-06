/* gnb */
$(document).ready(function(){	
	var gnb = $(".gnb"),
			dep = $("ul.depth01", gnb),
			nav = $("> li", dep),
			sub = ".sub_menu",
			timer;
			
	nav.mouseover(function(){
		var self = $(this),
				h = self.height() + self.find(sub).height();
		clearTimeout(timer);

		nav.removeClass("hover");
		self.addClass("hover");
		$(sub).hide();
		$(sub, self).show().css({"z-index":"100000"});
		
		gnb.find(".bg").show();
		//dep.unbind("mouseout");
		dep.css({
			"height" : h + "px" 
		});
	});
});

//20140129 댓글 이용 안내 추가 Start
$(function(){
	$(".reply_info").hide();
	$(".btn_reply").mouseover(function() {
		$(".reply_info").show();
	});
	$(".btn_reply").mouseleave(function() {
		$(".reply_info").hide();
	});
})
//20140129 댓글 이용 안내 추가 End


//20140207 20140207 신규댓글 Start
$(function(){

	var moveNum = 134; // li 마진값 포함된 넓이
	var liNum = $(".rolling li").length; // li 수
	var movePage = 5; //한화면에 보여지는 수
	var page = 0; //화면 이동 값
	$(".tbl_paginate2 .prev").click(function(){
		movePage--;
		if(movePage < 5){
			movePage = 5;
			page = 0;
		}else{
			page = movePage - 5;
		}
		$(".rolling").stop().animate({
			marginLeft: -(moveNum*page) + "px"
		});
	});
	$(".tbl_paginate2 .next").click(function(){
		movePage++;
		if(movePage >= liNum){
			movePage = liNum;
		}
		page = movePage - 5;
		$(".rolling").stop().animate({
			marginLeft: -(moveNum*page) + "px"
		});
	})
});
//20140207 20140207 신규댓글 End
