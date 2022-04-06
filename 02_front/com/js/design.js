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
	$('ul.depth > li.arrow').click(function(){
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
	$(".gnb > li a, .miniBar ul > li a").each(function(){
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

    // gnb search box view hide //
    $('#miniBarSch a').click(function(){
    	$('.schArea').show();
    	$('.dim').show();
    });
    $('.dim').click(function(){
		$(this).hide();
		$(".schArea").hide();
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

//교육과정안내 > 상세 20131009
jQuery("document").ready(function($){
	var arrNavPos = new Array("lecture_info01","lecture_info02_1","lecture_info02_2","lecture_info03");
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
			lecture.removeClass("fixed")
			lectureBox.removeClass("fixed");

			isToggle = false;
		}
	});
	
	nav.find("a").on("click", function(e){
		var id = $(this).parent().index();
		if( id < 4 ) {
			e.preventDefault();
			var posy  = $("#"+arrNavPos[id]).position().top - (isToggle?-50:170); //2013-11-26 수정
			$('html, body').animate({scrollTop : posy}, 300);
		}
	})
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

