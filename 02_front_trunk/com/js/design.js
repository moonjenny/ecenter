// location
$(function(){
	// 전체더보기 view hide //
	$('#allView').click(function(){
		$('.allViewSub').toggle();
		$("#allView").toggleClass('allViewOn'); // 추가

	});
	$('.allViewSub').mouseleave(function() {

		$(this).hide();
		$("#allView").removeClass('allViewOn'); // 추가
	});

	// location depth //
	$('ul.depth01 > li.arrow').click(function(){
		$(this).children().next().toggle();
	});
	
	$('.subDepth').mouseleave(function() {
		$(this).hide();
	});

/* 서브메뉴 슬라이드 20131009 */
$(function() {

	$("#header .depth").height(0); /* 20131111 id추가 */
	$("#header").bind("mouseenter", function(){
		$(".depth").animate({
			height:90
		},
		{
			duration : 200,
			queue : false
		});
	});

	$("#header").bind("mouseleave", function(e){
		$("#header .depth").animate({ /* 20131111 id추가 */
			height:0
		},
		{
			duration : 200,
			queue : false
		});
	})
});

	// gnb menu on off //
	$(".gnb > li > a").each(function(){
        var image = $(this).children('img');
        var imgsrc = $(image).attr("src");
        //add mouse over
        $(this).on("mouseenter",function(){
        	$(".sub-gnb").slideUp(100);
        	var id = $(this).parent().index();
        	
        	if(id>1) {
        		//alert($(this).next().html())
        		$(this).next().stop().show();
        		$(this).next().on("mouseleave", function(e){
        			$(this).stop().slideUp(100);
        		});
        	} else {
        		var on = imgsrc.replace (/.gif/,"_on.gif");
                $(image).attr("src",on);
        	}
         	
        	
            
        })
        //add mouse out
        $(this).on("mouseleave",function(){
        	var id = $(this).parent().index();
        	if(id>1) {
        	} else {
        		 var off = imgsrc.replace (/_on.gif/,".gif");
                 $(image).attr("src",off);
        	}
        });
        
        
     });
	
	$(".gnb").on("mouseleave", function(e){
		$(this).find(".sub-gnb").slideUp(100);
	});

    // gnb search box view hide //
    $('#miniBarSch a').click(function(){
    //	$('.schArea').show();
    //	$('.dim').show();
    });
    $('.dim').click(function(){
	//	$(this).hide();
	//	$(".schArea").hide();
		return false;
	});

	// sub menu on off 20130812 //
	$(".depth ul li a").each(function(){
        var image = $(this). children('img');
        var imgsrc = $(image).attr("src");
        //add mouse over
        $(this).mouseover(function(){
            var on = imgsrc.replace (/.gif/,"_on.gif");
            $(image).attr("src",on)
        })
        //add mouse out
        $(this).mouseout(function(){
            var off = imgsrc.replace (/_on.gif/,".gif");
            $(image).attr("src",off)
        })
     })

	// FAQ list view //
	$('#faqList div').hide();
	$('#faqList p').click(function() {
		$(this).next('#faqList div').slideToggle().siblings('#faqList div').slideUp("fast");
		return false;
	});

 });

// FAQ
$(document).ready(function(){
	$('.toggle_con').hide();

	$('.toggle_tit').click(function(){
	 if( $(this).next().is(':hidden') ) {
		$('.toggle_tit').removeClass('active').next().slideUp(0); //
		$(this).toggleClass('active').next().slideDown(0);
		$(this).find("span.question").addClass('tit_faq');
		$(this).siblings().find("span.question").removeClass('tit_faq');
	 }else {
		$(this).removeClass('active').next().slideUp(0);
		$(this).find("span.question").removeClass('tit_faq');
	 }
	 return false;
	});
});

// input
function clearField(field){
	if (field.value == field.defaultValue) { field.value = ""; }
}
function checkField(field){
	if (field.value == "") { field.value = field.defaultValue; }
}

// 이미지 변환
function imageOn(imgEl){
	imgEl.src = imgEl.src.replace(".jpg", "_over.jpg")
}
function imageOff(imgEl){
	imgEl.src = imgEl.src.replace("_over.jpg", ".jpg")
}


//메인, 마이페이지메인 롤링
var m_bn_count=new Array(0);
var m_bn_p_click_check= new Array(0);

window.onload = function() {
	m_bn_init();
}

function m_bn_init(){
    var $j=jQuery;
	$j(".slide_box").each(function(n){
		
		m_bn_count[n] = $j(".slide_box").eq(n).find(".slide > li").size();
		//$j(".tab_area").eq(n).find(".partner_slider").css({"height":"37px", "overflow":"hidden"});
		
		if(m_bn_count[n] < 2) {
			$j(".slide_box .btn-area").eq(n).find(".m_bn_r").hide();
			$j(".slide_box .btn-area").eq(n).find(".m_bn_l").hide();
		}
	
		$j(".slide_box .btn-area").eq(n).find(".m_bn_r").click(function(e){
			e.preventDefault();
			
			var id = mianBanId + 1;
			if(id > $(".slide_box .slide > li").size()-1 ) {id = 0;}
			renderContent(id);
			//m_bn_r_click(n);
			return false;
		});

		$j(".slide_box .btn-area").eq(n).find(".m_bn_l").click(function(e){
			e.preventDefault();
			var id = mianBanId - 1;
			if(id < 0) {id = $(".slide_box .slide > li").size()-1;}
			renderContent(id);
			//m_bn_l_click(n, id);
			return false;
		});
	})
}

function m_bn_s_click(n){

    var $j=jQuery;
    var count = $j(".slide_box").eq(n).find(".slide > li").size();

    m_bn_p_click_check[n] = 0;
    $j(".slide_box").eq(n).find(".slide").stop();
    $j(".slide_box").eq(n).find(".slide").css({"left":"0px"});
    if(m_bn_count[n] < count){
        $j(".slide_box").eq(n).find(".slide > li:last").remove();
    }
}

function m_bn_r_click(n){
    var $j=jQuery;
    m_bn_s_click(n);
    $j(".slide_box").eq(n).find(".slide > li").eq(0).clone().appendTo( $j(".slide_box").eq(n).find(".slide"));
    $j(".slide_box").eq(n).find(".slide > li").eq(0).remove();

}

function m_bn_l_click(n){

    var $j=jQuery;
    m_bn_s_click(n);

     $j(".slide_box").eq(n).find(".slide > li:last").clone().prependTo( $j(".slide_box").eq(n).find(".slide"));
     $j(".slide_box").eq(n).find(".slide > li:last").remove();
}

//메인 금주강좌
$(document).ready(function(){
	  $('.over_box.slidedown').hover(function(){
		  $(".cover", this).stop().animate({top:'-160px'},{queue:false,duration:300});
	  }, function() {
		  $(".cover", this).stop().animate({top:'0px'},{queue:false,duration:300});
	  });
});

var tabCursor = true;

//교육과정안내 > 상세 20131009
jQuery("document").ready(function($){
	var arrNavPos = new Array("lecture_info01","lecture_info02_1","lecture_info02_2","lecture_info03");
	var arrNavPos2 = new Array("lecture_info01","lecture_info02","lecture_info03","lecture_info04","lecture_info05" );
	var nav = $('.tabTypeC');
	var lecture = $('.lecture_info');
	var lectureBox = $('.lecture');
	var isToggle = false;

	$(window).scroll(function () {
		if ($(this).scrollTop() > 830) {
			nav.addClass("f-nav");
			lecture.addClass("fixed");
			lectureBox.addClass("fixed");

			isToggle = true;


		} else {
			nav.removeClass("f-nav");
			lecture.removeClass("fixed");
			lectureBox.removeClass("fixed");

			isToggle = false;
		}
	});
	
	if(tabCursor != false) {
	nav.find("a").on("click", function(e){
		var id = $(this).parent().index();
		
		if( id < 5 ) {
			e.preventDefault();
			var posy  = $("#"+arrNavPos2[id]).position().top - (isToggle?-50:170); //2013-11-26 수정
			$('html, body').animate({scrollTop : posy}, 300);
			
			$(".tabTypeC li").removeClass("selected");
			$(this).parent().addClass("selected");
			
			
		}
	});
	}
});

var isRun = false;
//20131203 메인배너 추가 Start
var mianBanId = 0;
$(function(){
	var intervalId;
	$(".slide_box .slide>li").each(function(n){
		if(n !== 0) $(this).hide();
	})
	$(".control a").on("click", function(e){
		var id = $(this).index();
		if(mianBanId == id) return;
		renderContent(id);
	})
	$(".mypage_interest").on("mouseenter", function(){
		stopInterval();
	}).on("mouseleave", function(){
		startInterval();
	})
	startInterval();
})


function renderContent(id) {
		if(isRun) return;
		isRun = true;
		
		
		$(".control a").removeClass("on");
		$(".control a").eq(id).addClass("on");
		
		$(".slide_box .slide > li").hide();
		$(".slide_box .slide > li").eq(id).fadeIn(0, function(){
			
			mianBanId = id;
			isRun = false;
		});
	}
	function startInterval() {
		intervalId = setInterval(function(){
			var id = mianBanId + 1;
			
			
			if(id > $(".slide_box .slide > li").size()-1 ) {id = 0;}
			
			
			renderContent(id);
		}, 6000)
	}
	function stopInterval() {
		clearInterval(intervalId);
	}
//20131203 메인배너 추가 End

var rid = 0;

	/* 2014-04-10 s */
$(function(){
	if(tabCursor != false){
	$(".tab_eduPro > a").on("mouseenter", function(e){
		e.preventDefault();
		
		if($(this).parent().hasClass("fixed")) return;
		
		var id  = $(this).parent().index();

		$(".tab_eduPro > a").removeClass("selected");
		$(".tab_eduPro > a").eq(id).addClass("selected");
		
		$(".tabTitle").removeClass("step0"+(rid+1));
		$(".tabTitle").addClass("step0"+(id+1));
		
		$(".introduce-subject .btn-lecture").removeClass("lec0"+(rid+1));
		$(".introduce-subject .btn-lecture").addClass("lec0"+(id+1));
		
		rid = id;
		
	}).on("mouseleave", function(e){
		e.preventDefault();
		/*
		var id  = $(this).parent().index();
		$(".tab_eduPro > a").removeClass("selected");
		$(".tab_eduPro > a").eq(0).addClass("selected");
		
		$(".tabTitle").removeClass("step0"+(id+1));
		$(".tabTitle").addClass("step01");
		
		rid = 0;
		*/
	});
	}	

	
	$(".box-table ul li").on("mouseenter", function(e){
		var id = $(this).index();
		
		$(".box-table ul li .over").eq(id).show();
		$(this).css({zIndex:100})
		
		$(this).find(".over").on("mouseenter", function(e){
			e.preventDefault();
			$(this).hide();
		})
		
		
	}).on("mouseleave", function(e){
		var id = $(this).index();
		$(".box-table ul li .over").eq(id).hide();
		$(this).css({zIndex:55})
	})
})

/* 2014-04-10 e */
$(function(){
	$(".edu-program .line").css({"cursor":"pointer"})
	$(".edu-program .line").bind("mouseenter", function(e){
		
		$(this).bind("mousemove", function(e){
			var wid = $(this).width();
			var posX = e.pageX - $(this).offset().left;
			var target = parseInt((posX * 90) / wid);
			var id = parseInt((target/10)+1);
			
			$(".edu-program .line .over li").hide();
			$(".edu-program .line .over li.t"+id).show();
		});
		
	});
	
	$(".edu-program .line").bind("mouseleave", function(e) {
		$(this).unbind("mousemove");
		$(this).find(".over li").hide();
		
		$(this).find(".over li").each(function(n){
			if($(this).hasClass("selected")) {
				$(this).show();
			}
		})
		
		
	});
})

$(function(){
	$(".about-section .menu li a").on("click", function(e){
		e.preventDefault();
		var id = $(this).parent().index();
		
		$(".about-section .menu li a").removeClass("on");
		$(".about-section .menu li a").eq(id).addClass("on");
		
		$(".about-section .content-box ul").hide();
		$(".about-section .content-box ul").eq(id).show();
		
		
		
		if(id == 0) {
			
			$(".about-section .menu li a").eq(0).css({
				"background-position":"-1px -40px",
				"width":116,
				"margin-left":0
			});
			$(".about-section .menu li a").eq(1).css({
				"background-position":"-116px 0",
				"width":98,
			});
			$(".about-section .menu li a").eq(2).css({
				"background-position":"-214px 0"
			});
		} else if(id == 1) {
			
			$(".about-section .menu li a").eq(0).css({
				"background-position":"-1px 0",
				"width":114,
				"margin-left":1
			});
			
			$(".about-section .menu li a").eq(1).css({
				"background-position":"-116px -40px",
				"width":99
			});
			$(".about-section .menu li a").eq(2).css({
				"background-position":"-214px 0"
			});
			
		} else {
			
			$(".about-section .menu li a").eq(0).css({
				"background-position":"-1px 0",
				"width":116,
				"margin-left":1
			});
			
			$(".about-section .menu li a").eq(1).css({
				"background-position":"-117px 0",
				"width":96
			});
			
			$(".about-section .menu li a").eq(2).css({
				"background-position": "-214px -40px"
			});

		}
		$('#commBtn').attr("href", $(this).attr("href"));
		
	});
	
	$(".notice-section .menu li a").on("click", function(e){
		e.preventDefault();
	});
	
	var curArrId = 0;
	var isRun2 = false;
	$(".btn-arr.left").hide();
	if(  $(".recent-info .list-box ul li").size() < 5 ) {
		$(".btn-arr.right").hide();
	}
	
	$(".btn-arr.left").on("click", function(e){
		e.preventDefault();
		if(isRun2) return;
		isRun2 = true;
		var id = curArrId-1;
		var target = -221 * id;
		
		$(".recent-info .list-box ul").animate({
			marginLeft: target
		},
		{
			duration : 200,
			queue : false,
			complete:function(){
				curArrId = id
				
				setArrowBtn();
				isRun2 = false;
			}
		});
	})
	
	$(".btn-arr.right").on("click", function(e){
		e.preventDefault();
		if(isRun2) return;
		isRun2 = true;
		var id = curArrId+1;
		var target = -221 * id;
		
		$(".recent-info .list-box ul").animate({
			marginLeft: target
		},
		{
			duration : 200,
			queue : false,
			complete:function(){
				curArrId = id
				
				setArrowBtn();
				isRun2 = false;
			}
		});
	});
	
	function setArrowBtn() {
		if(curArrId == 0) {
			$(".btn-arr.left").hide();
			$(".btn-arr.right").show();
		} else if(curArrId == ($(".recent-info .list-box ul li").size()-4)  ) {
			$(".btn-arr.right").hide()	
			$(".btn-arr.left").show();
		} else {
			$(".btn-arr.left").show();
			$(".btn-arr.right").show();
		}
	}
	
})


$(function(){
	var totalSize = $("dl.promotion ul li").size();
	var m_cur = 0;
	var arrStr = new Array();
	var isRun = false;
	if(totalSize > 1) {
		renderIntroduceSlide();
	} else {
		$("dl.promotion .control-btn").hide();
	}
	function renderIntroduceSlide() {
		$("dl.promotion ul li").each(function(n){
			var tmp = $(this).clone().wrapAll('<div/>').parent().html();
			arrStr[n] = tmp;
		});
		$("dl.promotion ul").empty();
		$("dl.promotion ul").append(arrStr[0]);
		
		$("dl.promotion .control-btn a").on("click", function(e){
			e.preventDefault();
			if(isRun) return;
			isRun = true;
			
			var className = $(this).attr("class");
			
			if(className == "m_bn_r") {
				//오른쪽 이동코스
				var id = m_cur + 1;
				if(id > totalSize - 1 ) id = 0;
				setMovePromotion(id, "right")						
			} else {
				var id = m_cur - 1;
				if(id < 0 ) id = totalSize - 1;
				setMovePromotion(id, "left");
			}
		});
	};
	
	function setMovePromotion(_id, _direct) {
		if(_direct == "right") {
			$("dl.promotion ul").append(arrStr[_id]);
			
			$("dl.promotion ul").animate({
				marginLeft: -640
			},
			{
				duration : 200,
				queue : false,
				complete:function(){
					$("dl.promotion ul li").eq(0).remove();
					$("dl.promotion ul").css({marginLeft:0});
					m_cur = _id;
					isRun = false;
				}
			});
		} else {
			$("dl.promotion ul").css({"margin-left":-640});
			$("dl.promotion ul").prepend(arrStr[_id]);
			
			$("dl.promotion ul").animate({
				marginLeft: 0
			},
			{
				duration : 200,
				queue : false,
				complete:function(){
					$("dl.promotion ul li").eq(1).remove();
					$("dl.promotion ul").css({marginLeft:0});
					m_cur = _id;
					isRun = false;
				}
			});
		}
	}
});

$(function(){
	var mainBanner_id = 0;
	var intervalMainBanner;
	
	$("ul.banner-menu li a").on("click", function(e){
		e.preventDefault();
		var id = $(this).parent().index();
		
		setMainBanner(id);
		
	});
	
	$(".main-banner").on("mouseenter", function(e){
		stopIntervalMainBanner();
	
	}).on("mouseleave", function(e) {
		startIntervalMainBanner();
	});
	
	function startIntervalMainBanner() {
		intervalMainBanner = setInterval(function(){
			var id = mainBanner_id +1;
			if(id>4) {
				id = 0;
			}
			setMainBanner(id);
		}, 4500);
	}
	
	function stopIntervalMainBanner() {
		clearInterval(intervalMainBanner);
	}
	
	
	function setMainBanner(id) {
		
		$(".main-banner .banner li").hide();
		$(".main-banner .banner-menu li a").removeClass("on");
		
		$(".main-banner .banner li").eq(id).show();
		$(".main-banner .banner-menu li a").eq(id).addClass("on");
		
		mainBanner_id = id;
	}
	
	startIntervalMainBanner();
});
