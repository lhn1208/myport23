var shopUI = shopUI || {};

shopUI = {
	init: function() {
		this.loadTimeOut = function() {};
		this.fileRegist = 0;
	},
	// 상단 메뉴
	navigation: function() {
		//2022-10-24 메뉴 전체 수정
		//기존 gnb
		var gnb_list=$('#gnb >ul>li:not(.gnb_type)');
		var gnb_link=gnb_list.find('>a');
		var gnb_depth2=gnb_list.find('.gnb_depth2');
		//2022-07-19 GNB 공급사별보기 작업 
		// var $gnb_sup=$('#gnb > ul > li.gnb_supplier');
		// var $sup_1depth=$gnb_sup.find(".gnb_box"); //1depth 메뉴
		gnb_link.on('mouseenter',function(){
			var menu = $(this).next("ul");
			//공급사별 닫기
			//$sup_1depth.hide();
			if ( menu.size() > 0 ) {
				menu.stop(true, true).slideDown();
			};
		})
		gnb_list.on('mouseleave',function(){
			var menu = $(this).find("a").next("ul");
			if ( menu.size() > 0 ) {
				menu.stop(true, true).hide();
			};
		})
		//2depth
		gnb_depth2.on('mouseenter',function(){			
			var menu = $(this).find(">div");
			 	if ( menu.size() > 0 ) {
			 		menu.stop(true, true).show();
			 	};
		})
		gnb_depth2.on('mouseleave',function(){
			var menu = $(this).find(">div");
			if ( menu.size() > 0 ) {
				menu.stop(true, true).hide();
			};
		})
		//공급사별보기,이벤트/혜택,공지/문의
		var gnb_type_list=$('#gnb >ul>li.gnb_type');
		var gnb_type_link=gnb_type_list.find('>a');
		var gnb_type_depth2=gnb_type_list.find('.gnb_depth2');

		gnb_type_link.on('mouseenter',function(){
			var menu = $(this).next(".menu");
			if ( menu.size() > 0 ) {
				menu.stop(true, true).slideDown();
			};
		})
		gnb_type_list.on('mouseleave',function(){
			var menu = $(this).find("a").next(".menu");
			if ( menu.size() > 0 ) {
				menu.stop(true, true).hide();
			};
		})
		//2depth		
		gnb_type_depth2.on('mouseenter',function(){			
			var menu = $(this).find(".menu");
			 	if ( menu.size() > 0 ) {
			 		menu.stop(true, true).show();
			 	};
		})
		gnb_type_depth2.on('mouseleave',function(){
			var menu = $(this).find(".menu");
			if ( menu.size() > 0 ) {
				menu.stop(true, true).hide();
			};
		})
		 //공급사별보기 GNB		
		// $("body").on("mouseenter", "#gnb > ul > li.gnb_supplier > a", function(event) {
		// 	var menu = $(this).next(".gnb_box");
		// 	if ( menu.size() > 0 ) {
		// 		menu.stop(true, true).slideDown();
		// 	};
		// });
		// $("body").on("mouseenter", "#gnb > ul > li.gnb_supplier .gnb_depth2", function(event) {
		// 	var menu = $(this).find("div");
		// 	$("#gnb > ul > li.gnb_supplier .gnb_depth2").removeClass("on");
		// 	$("#gnb > ul > li.gnb_supplier .gnb_depth2 > div").hide();
		// 	if ( menu.size() > 0 ) {
		// 		$(this).addClass("on");
		// 		menu.stop(true, true).show();
		// 	};
		// });
		// //공급사별 외부 클릭시 외부영역 닫기
		// $('body').click(function(e){
		// 	$("#gnb > ul > li.gnb_supplier .gnb_depth2 > div").hide();
		// 	if(!$sup_1depth.has(e.target).length) 
		// 		$sup_1depth.hide();
		// })

		// var gnb_list=$('#gnb >ul>li');
		// var gnb_link=gnb_list.find('>a');
		// var gnb_depth2=gnb_list.find('.gnb_depth2');
	},
	// 탭
	
	tab: function(options) {
		var defaults = {
			"tabs" : $(".tab_menu li"),
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
	// 달력레이어 datepicker
	datepicker: function() {
		$(".datepicker_view .inp_txt").datepicker({
			showOn: "both",
			buttonImage: "../../images/btn_calendar.png",
			buttonImageOnly: true,
			buttonText: "날짜 선택",
			changeMonth: true,
			changeYear: true,
			yearRange: 'c-116y:c+4',
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			showMonthAfterYear: true,
			showOtherMonths: true,
			dateFormat: "yy-mm-dd"
		});
	},
	// 모달레이어
	modalLayer: function(target, options, callback) {
		var bPopup = target.bPopup(options, callback);

		// 기본 event 취소
		if ("undefined" !=  typeof event) event.preventDefault ? event.preventDefault() : event.returnValue = false;

		// 2020-06-08 수정
		modalOverflow(options.closeClass);
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
	},
	// vip전용관 장바구니 담기 결과 scrollCheck 2018-07-02 추가
	scrollCheck: function(objHeight){
		var footOffTop = $("#footer").offset().top;
		if(objHeight < footOffTop){
			$("#content .box_result").addClass("fixed_on"); // 2018-11-30 수정
			$("#content .cart_box").addClass("fixed_on"); // 2020-06-23 추가
		} else {
			$("#content .box_result").removeClass("fixed_on"); // 2018-11-30 수정
			$("#content .cart_box").removeClass("fixed_on"); // 2020-06-23 추가
		}
		// 2021-09-13 수정
		if($("#content .cart_box").length > 0 && $("#content .cart_box").offset().top < $("#header").outerHeight()) {
			$("#content .cart_box").css({
				top: (20)+"px",
				bottom: "auto",
				position:"absolute"
			});
		}
	},
	// vip전용관 장바구니 담기 결과 scroll 2018-07-02 추가
	scrollFix: function(){
		shopUI.scrollCheck($(window).height());
		var footHeight = $("#footer").height() + 90; // 90 = #content 하단 여백 값
		$(window).scroll(function() {
			if ($(window).scrollTop() > ($(document).height() - $(window).height() - footHeight)) {
				$("#content .box_result").removeClass("fixed_on"); // 2018-11-30 수정
				$("#content .cart_box").removeClass("fixed_on"); // 2020-06-23 수정
				$("#content .cart_box").removeAttr('style'); // 2020-06-25 추가
			} else {
				$("#content .box_result").addClass("fixed_on"); // 2018-11-30 수정
				$("#content .cart_box").addClass("fixed_on"); // 2020-06-23 수정
				// 2021-09-13 수정
				if($("#content .cart_box").length > 0 && $("#content .cart_box").offset().top < $("#header").outerHeight()) {
					$("#content .cart_box").css({
						top: (20)+"px",
						bottom: "auto",
						position:"absolute"
					});
				}
			}
		});
	},
};

// 모달레이어 body overflow 
function modalOverflow(closeBtn){// 2020-06-08 수정
	if($(".b-modal").is(":visible")){
		$("body").css("overflow", "hidden");
		$(".select").on("click",function () { // 2018-06-11 추가
			$(".selectbox_option").removeClass("hide");
		});
	}
	var closeClass = closeBtn ? closeBtn : 'btn_close';// 2020-06-08 추가
	$(".pop_layer, .layer_pop").find("."+closeClass).click(function(){// 2020-06-08 수정
		$("body").css("overflow", "visible");
	});
	$(".b-modal").click(function(){
		$("body").css("overflow", "visible");
		$(".selectbox_option").addClass("hide"); // 2018-06-11 추가
	});

	/* 2019-01-14 추가 시작 */
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$("body").css("overflow", "visible");
		}
	});
	var defaultSize = $(window).width();
	$(window).on('keyup', function () {
		var expandWidth = $(window).outerWidth()
		if (defaultSize > expandWidth) {
			$("body").css("overflow", "visible");
		}
	})
	/* 2019-01-14 추가 끝 */
}

// 디자인 셀렉트 박스 크롬 스크롤 이슈 해결용 2018-07-24 수정
$(window).load(function () {
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf("chrome") != -1) {
		function selectScroll() {
			$("body .select, .pop_layer .select").click(function () {
				var selectValHeight = $(this).height();
				var selectValTop = $(this).offset().top + selectValHeight;
				$(".selectbox_option ul").parent().parent().css("top", selectValTop);
			});
		};
		if ( $(window).scrollTop() > 0 ){
			selectScroll();
		};
		$(window).scroll(function () {
			selectScroll();
		});
	};
});

// 디자인 셀렉트박스 value 리셋 2018-07-31 추가
function selectReset() {
	$("span.select").each(function () {
		var defaultVal = $(this).next().find("option:eq(0)").text();
		$(this).find("strong").text(defaultVal);
		$(this).next().find("option:eq(0)").prop("selected","selected");
	});
};

// 2021-06-29 체크박스 연동 텍스트박스 스크립트
$(function(){
	$('input[data-related-disabled]').on({
		click:function(e){
			var target = document.querySelector(e.currentTarget.getAttribute('data-related-disabled'));
			target.disabled = !e.currentTarget.checked;
			target.focus();
		}
	});
});

shopUI.init();