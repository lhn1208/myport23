/*
$(function(){
	//프로필 - 최신소식
	var slideTotal = $("#slides > .slide").length;
	$("#slidePaging .total").html("/" + slideTotal);
	$(".slideBtn > a").click(function(){
		if(slideTotal > 1){
			if($(this).index() == 0){
				if(sCurrent > 0){
					sCurrent--;
					
				}else{
					sCurrent = slideTotal-1;
				};
			}else{
				if(sCurrent < slideTotal-1){
					sCurrent++;
				}else{
					sCurrent = 0;
				};
			};		
			noticeSet();
			return false;

		}else{
			return false;
		}
	});
	$(".btnClose").click(function(){
		$(this).parent().css('display','none');
		return false;
	});

	//프로필 - 인맥신청
	var hideList = $(".acceptConnect > ul.hidden");
	$(".viewAll").click(function(){
		if(hideList.hasClass("hidden")){
			hideList.removeClass("hidden");
			$(this).html("접기");
			return false;
		}else {
			hideList.addClass("hidden");
			$(this).html("모두보기");
			return false;
		}
	});
	// 프로필 -내인맥
	$('.tabContent:not(:first)').hide();
	  $('.tab li').click(function(e) {
		$('.tabContent').hide();
		$('.tab li.on').removeClass("on");
		$(this).addClass('on');
		var clicked = $(this).find('a:first').attr('href');
		$('.tabContent' + clicked).show();
		e.preventDefault();
	  }).eq(0).addClass('on');
	
	//회원가입
	$('#layerBtn').hover(function(){
		$(this).parent().next().show();
		},function(){
		$(this).parent().next().hide();
	});
	$('.layerBox').hover(function(){
		$(this).show();
		},function(){
		$(this).hide();
	});
	$('.selectBox_sm').click(function(){
		$(this).next('.option_wrap').toggleClass("on");
		return false;
	});
	$('.selectBox a').click(function(){
		$(this).next('.option_wrap').toggleClass("on");
		return false;
	});
	$('.agreeCheck').click(function(){
		$(this).toggleClass("on");
		return false;
	});
	
	$("input.check_id, input.check_pw").each(function(){
		$(this).on("focus", function() {
			if($(this).value == '') {
				$(this).removeClass("blur");
			} else {
				$(this).addClass("blur");
			}
		});
		$(this).on("blur", function() {
			if ( $(this).val() == '' ) $(this).removeClass("blur");
		});
	});




});
*/


var sCurrent = 0;
function noticeSet() {
	$("#slides").animate({left:-496 * sCurrent}, 200, "easeOutCirc");
	$("#slidePaging .current-num").html(sCurrent+1);	
}

jQuery(function($){
	
	// Common
	var select_root = $('div.select');
	var select_value = $('.myValue');
	var select_a = $('div.select>ul>li>a');
	var select_input = $('div.select>ul>li>input[type=radio]');
	var select_label = $('div.select>ul>li>label');
	

	// Radio Default Value
	$('div.myValue').each(function(){
		var default_value = $(this).next('.iList').find('input[checked]').next('label').text();
		$(this).append(default_value);
	});
	// Line
	select_value.bind('focusin',function(){$(this).addClass('outLine');});
	select_value.bind('focusout',function(){$(this).removeClass('outLine');});
	select_input.bind('focusin',function(){$(this).parents('div.select').children('div.myValue').addClass('outLine');});
	select_input.bind('focusout',function(){$(this).parents('div.select').children('div.myValue').removeClass('outLine');});
	
	// Show
	function show_option(){
		$(this).parents('div.select:first').toggleClass('open');
		var select_width = ($(this).parents().width());
		$(this).next('ul.aList').css("width",select_width-2)
	}
	
	// Hover
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}
	
	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('div.select:first').removeClass('open');
		}, 1);
	}
	
	// Set Input
	function set_label(){
		var v = $(this).next('label').text();
		$(this).parents('ul:first').prev('.myValue').text('').append(v);
		$(this).parents('ul:first').prev('.myValue').addClass('selected');
	}
	
	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('ul:first').prev('.myValue').text('').append(v);
		$(this).parents('ul:first').prev('.myValue').addClass('selected');

	}

	// Anchor Focus Out
	$('*:not("div.select a")').focus(function(){
		$('.aList').parent('.select').removeClass('open');
	});
	
	select_value.click(show_option);
	select_root.find('ul').css('position','absolute');
	
	select_root.removeClass('open');
	select_root.mouseleave(function(){$(this).removeClass('open');});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
	select_input.change(set_label).focus(set_label);
	select_label.hover(i_hover).click(hide_option);
	
	// Form Reset
	$('input[type="reset"], button[type="reset"]').click(function(){
		$(this).parents('form:first').find('.myValue').each(function(){
			var origin = $(this).next('ul:first').find('li:first label').text();
			$(this).text(origin).removeClass('selected');
		});
	});
	
});
//placeholder
$(function(){
	$("input, textarea").placeholder();
})
$(function(){
	$(".btn_ms").click(function(){
		//var ms_left = $(this).closest("li").width();
		//alert(ms_left)
		//$(this).next().css("left",ms_left+"px");
		$(".popup_ms_wrap").hide();
		$(this).next().show();
		return false;
	})
	$(".btn_ms_close").click(function(){
		$(this).closest(".popup_ms_wrap").hide();
		return false;
	});
})
$(function(){
	
})
