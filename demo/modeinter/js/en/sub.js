$(document).ready(function(){
	//배경 이벤트
      var  topSct=0, topSctPrev=0, scT = 0, sctPrev = 0;
      function bgEvent(){
       	var $pattBotoom=$('span[class*="pattern_bt"]');
       	var $pattTop=$('.pattern_top');
          	scT = $(window).scrollTop();
	          if($pattTop.length){
          		topSct = $(window).scrollTop();       
	      		var pattH=$('.first_box').offset().top + $('.pattern_top').outerHeight();
          		var $moveT= $pattTop.css("marginTop").replace('px','');     
	                if($(window).height() - ($pattTop.offset().top - $(window).scrollTop()) > 0  && scT < pattH ){
	                  if(topSct > topSctPrev) 
	                  	$pattTop.each(function(){$pattTop.delay(200).css({"marginTop" : $moveT*1-10});});
	                  else
	                  	$pattTop.each(function(){$pattTop.delay(200).css({"marginTop" : $moveT*1+11});});
	      			topSctPrev = topSct;
		              }
		       }
	          $pattBotoom.each(function(index){
	          	var $sec=$(this).parents('section');
	          	var $secT=$sec.offset().top;
	          	var	secH=$secT+$sec.outerHeight();
	          	var $moveB=$(this).css("marginBottom").replace('px','');
	              if($(window).height() - ($(this).offset().top - $(window).scrollTop()) > 0  && scT < secH ){
	                  if(scT > sctPrev) 
	                  	$(this).each(function(){$(this).delay(200).css({"marginBottom" : $moveB*1-10});});
	                  else if(scT < sctPrev)
	                  	$(this).each(function(){$(this).delay(200).css({"marginBottom" : $moveB*1+10});});
	              }
	          });
      		sctPrev = scT;
     }//bgEvent()
      //ie체크
     var Browser={chk:navigator.userAgent}
	 Browser={ie8 : Browser.chk.indexOf('MSIE 8.0') != -1, ie9 : Browser.chk.indexOf('MSIE 9.0') != -1}
     //mice,지난행사,테마관광 첫번째 section fade
	var $cont=$('.fade_ev,.items_area');
	$('.first_box').find($cont).addClass('fadeInUp animated');
     //fade animation
     var $cont=$('.mice_img, .items_area, .fade_ev');
     if(!(Browser.ie8) && !(Browser.ie9)){$cont.css('opacity',0);}	
	function fadeAni(){
		if($cont.length){
			  scT = $(window).scrollTop();
			 $cont.each(function(){
	    			var contOff=$(this).offset().top-600;
			 	if(scT> contOff){
			 		 $(this).addClass('fadeInUp animated')
			 	}
			 });
		}
	}
	// quick메뉴
	var $quick=$('.quick_menu');
	var $quickItem= $quick.find('li');
	var $section=$('section');
	var $headerSec=$('#header');
	var $detailSec=$('.detail_sec');
	if($detailSec.length) 
		$headerSec=$detailSec;
	function quickEvent(){		
		if($quick.length){
			var secTop=$headerSec.offset().top;
			var scT = $(window).scrollTop();	
			if(scT>secTop)
				$quick.css({'position':'fixed','top':'50%','margin-top':'-50px','z-index':'9990'});
			else
				$quick.removeAttr('style');	
			$section.each(function(){
				var idx=$(this).index()-1;
				var offst=$(this).offset().top ;
				if(offst <= scT){
					$quickItem.eq(idx).addClass('on').siblings().removeClass('on');
				}
			});
		}
	}
	// quick메뉴클릭
	$quickItem.click(function(){
		var idx=$(this).index();
		$('html, body').stop().animate({
			'scrollTop': $section.eq(idx).offset().top+2
		}, 800);
		return false;
	})
	 //패키지 일정탭
	 var $schCont=$(".sch_cont");
	 var $dayTab=$(".sch_tab");
	 var $dayItems=$dayTab.find('li');
	 var $schArea= $schCont.find(".sch_area");	 
	 function dayTabEv(){
	 	if($schCont.length){
		 	var schArea=$schArea.offset().top -170;	 
		 	var schLastArea=$(".terms").offset().top-300;
		 	scT = $(window).scrollTop();	
		 	if(scT>schArea && schLastArea>scT){
		 		$dayTab.addClass('on');
		 	}else{
		 		$dayTab.removeClass('on');
		 	}
		 	$schCont.each(function(){
				var idx=$(this).index();
				var offst=$(this).offset().top -2;
				if(offst < scT){
					$dayItems.eq(idx).addClass('on').siblings().removeClass('on');
				}
			});
		 }
	 }
	$dayItems.click(function(){
		var idx=$(this).index();
		$('html, body').stop().animate({
			'scrollTop': $schCont.eq(idx).offset().top
		}, 800);
		if(!$(this).hasClass('on')){
			$dayItems.eq(idx).addClass('on').siblings().removeClass('on');
		}							
		return false;
	})
	//tab클릭 이벤트
	var $tabList=$('.tab_style2 li');
	var $tabCont=$('.tab_cont');
	$tabCont.hide();
	$tabCont.eq(0).show();
	$tabList.click(function(){
		var t = $(this);
		if(!t.hasClass('on')){
			t.addClass('on').siblings().removeClass('on');
			$tabCont.hide();
			$(t.find('a').attr('href')).show();
		}
		return false;
	})
	
	//문의사항 동의체크박스
	// For support IE 8, label tag
	 if(Browser.ie8){
		 $("label").on('click', function(){
		    	  if ($(this).attr("for") != "") {
		         $(this).siblings('input').removeClass('checked')
		            .end().addClass('checked');
		         $("#" + $(this).attr("for")).trigger('click');
		      }
		   });
	}	
	var agreeChk = $(".agree_chk");
	var chk= agreeChk.find(".chk");
	var chkLabel=agreeChk.find("label .chk_set");
	chk.change(function() {
		if(chk.is(":checked")){
			chkLabel.addClass("chkon");
		}else{
			chkLabel.removeClass("chkon");
		}
	});
	
	$(window).scroll(function(){	
		dayTabEv()
		quickEvent();
		if(!(Browser.ie8) && !(Browser.ie9)){bgEvent();fadeAni();}	
	});
	
});