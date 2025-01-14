var shopUI = shopUI || {};

shopUI = {
	init: function() {
		this.loadTimeOut = function() {};
		this.fileRegist = 0;
	},
	// 헤드 영역
	head: function() {
		// 검색
		$(".main_search input").on("focus",function () {
			$("html").addClass("search_on");
			$(".wrap_rank").removeClass("screen_out");
			var searchInput = $(".main_search input").val().length;
			if(searchInput > 0){
				$(this).next().show();
			} else{
				$(this).next().hide();
			}
			// 판매랭킹 최소높이 값 지정 2018-05-31 추가
			var deviceHeight = $(window).height();
			$(".wrap_rank").css("min-height",deviceHeight-352);
		});
		$(".main_search .link_back").on("click",function (e) {
			$("html").removeClass("search_on");
			$(".main_search .btn_del").hide();
			e.preventDefault();
		});
		// 카테고리 메뉴
		$(".head_shop .btn_cate").on("click", function (e) {
			$("html").toggleClass("cate_on");
			var deviceHeight = $(window).height(); // 2018-11-12 수정
			var topHeight = $(".bnr_main").height() + $(".main_tit").height() + $(".wrap_menu").height() + $(".cate_menu .tab_g").height() + 14; // 2018-11-12 추가
			$(".cate_menu .tab_cont").css("max-height",deviceHeight-topHeight); // 2018-11-12 수정
			$(".bg_dimmed").on("click", function () {
				$("html").removeClass("cate_on");
			});
			e.preventDefault();
		});
		// 카테고리 탭
		shopUI.tab({
			"tabs" : $(".tab_g li"),
			"contWrap" : $(".tab_cont > div")
		});
		// 카테고리 - 공급사별 보기 슬라이드
		$(".slide_g3 .btn_slide").on("click", function(e){
			var thisView = $(this).parent().next();
			$(".slide_g3 .view_slide").slideUp();
			$(".slide_g3 .item").removeClass("on");
			if(! thisView.is(':visible')){
				thisView.slideDown();
				$(this).parent().parent().addClass("on").siblings().removeClass("on");
			}
			e.preventDefault();
		});
	},
	// 탭
	tab: function(options) {
		var defaults = {
			"tabs" : $(".tab_g li"),
			"contWrap" : null,
			"callback" : null
		};
		var options = $.extend(defaults, options);

		$(options.tabs).click(function(e) {
			var tabHref = $(this).children("a").attr("href");

			$(options.contWrap).css("display", "none");
			$(tabHref).css("display", "block");
			$(this).addClass("on").siblings("li").removeClass("on");

			if(typeof(options.callback) == "function"){
				options.callback.call( $(this), {index: options.tabs.index($(this))} );
			};
			e.preventDefault();
		});
	},
	// 퀵메뉴, 탑버튼
	quick : function () {
		var btnTop = $(".btn_top");
		var quickMenu = $("#quickMenu");
		$(window).scroll(function(){
			var topHeight = $(".bnr_main").height() + $(".main_tit").height(); /* 2018-11-12 추가 */
			if($(window).scrollTop() > topHeight){ /* 2018-11-12 수정 */
				btnTop.fadeIn(300);
				quickMenu.fadeIn(300);
				$("html").addClass("fixed_on");
			} else {
				btnTop.fadeOut(300);
				quickMenu.fadeOut(300);
				$("html").removeClass("fixed_on");
			};
		});
		btnTop.click(function(){
			$("html, body").animate({ scrollTop: 0 }, 500);
			return false;
		});
	},
	// 모달레이어
	modalLayer: function(target, options, callback) {
		var bPopup = target.bPopup(options, callback);

		// 기본 event 취소
		if ("undefined" !=  typeof event) event.preventDefault ? event.preventDefault() : event.returnValue = false;
		modalOverflow();
		return bPopup;
	},
	// 모달레이어 공통
	modalLayerComm: function(options, callback) {
		var target = null;
		var bPopup = null;
		var $body = $("body");

		if (options.type == "1") {
			target = $("#modalType1");
		} else if (options.type == "2") {
			target = $("#modalType2");

			// 취소버튼
			$body.on("click." + options.eventCustom, '.btn_cancel', function(e) {
				// 콜백 함수 실행
				if (options.cancelFunc) {
					options.cancelFunc();
					// 팝업 닫기
					if (options.afterCancel == true) {
						bPopup.close();
						// 이벤트 해제
						$body.off("click." + options.eventCustom, ".btn_cancel");
					};
				} else {
					bPopup.close();
					// 이벤트 해제
					$body.off("click." + options.eventCustom, ".btn_cancel");
				};
			});
		};

		target.find(".tit_popup").html(options.title);
		target.find(".desc_inner").html(options.description);

		bPopup = target.bPopup({
			positionStyle: "fixed",
			closeClass: "btn_close",
			onClose: function() {
				// 이벤트 해제
				$body.off("click." + options.eventCustom, ".btn_confirm");
			}
		}, callback);

		// 확인버튼
		$body.on("click." + options.eventCustom, '.btn_confirm', function(e) {
			// 팝업 닫기
			if (options.afterConfirm == true) {
				bPopup.close();
			};

			// 콜백 함수 실행
			if (options.confirmFunc) {
				options.confirmFunc();
			};

			// 이벤트 해제
			$body.off("click." + options.eventCustom, ".btn_confirm");
		});

		// 기본 event 취소
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		return bPopup;
	}
};

function modalOverflow(){
	var windScrollTop = $(window).scrollTop();
	if($(".b-modal").is(":visible")){
		$("html").addClass("layer_on");
		$("body").css({
			"position":"fixed",
			"top":-windScrollTop
		});
	};
	$(".pop_layer").find(".btn_close").click(function(){
		$("html").removeClass("layer_on");
		$("body").css({
			"position":"static",
			"top":"inherit"
		});
		$(window).scrollTop(windScrollTop);
	});
	$(".b-modal").click(function(){
		$("html").removeClass("layer_on");
		$("body").css({
			"position":"static",
			"top":"inherit"
		});
		$(window).scrollTop(windScrollTop);
	});
}
$(function(){
	var num_box= $('.ctl_prod');
    num_box.find('.btn_minus').on('click', function(e) {
        var input = $(e.target).closest(num_box).find('input');
        input[0]['stepDown']();
    });
    num_box.find('.btn_plus').on('click', function(e) {
        var input = $(e.target).closest(num_box).find('input');
        input[0]['stepUp']();
    });
});
shopUI.init();