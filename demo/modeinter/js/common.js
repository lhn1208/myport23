(function($){
	var $window = $(window);
	$.fn.parall=function(){
		// 요소 개수 만큼 루프 돌기
		this.each(function(index){
			var $self = $(this);
			var offsetCoords = $self.offset();
			$(window).scroll(function() {
				// If this section is in view
				if (($window.scrollTop() + $window.height()) > offsetCoords.top && ((offsetCoords.top + $self.height()) > $window.scrollTop())) {
					var yPos = -($window.scrollTop() / 8);
					yPos += 0;
					var coords = '50%' + yPos + 'px';
					$self.css('backgroundPosition', coords);
				}
			});
		})
		return this;
	}
})(jQuery);

$(document).ready(function(){
	//global
	 $('.global_area').click(function(){
	 	if($(this).hasClass('on')){
	 		$(this).removeClass('on');	
	 	}else{
	 		$(this).addClass('on');
	 	}
	 })
	//nav
	var $navOpen=$('#navOpen');
	var $navBtn=$navOpen.find('.btn');
	function navOption(){
		var scTop = $(window).scrollTop();	
		var headH= $('#header').outerHeight();	
		if(scTop>headH){
			$navBtn.css('background-position-y','-126px');
		}else{
			$navBtn.removeAttr('style');	
		}
	}
	 var $navOpen=$('#navOpen');
	 var $menuWrap=$('.menu_wrap');
	 var $body=$('body');
	 //네비오픈
	 $navOpen.click(function(){
	 	$navi.animate({right: '0'},300);
	 	$menuWrap.css('display','block');
	 	$body.css('overflow','hidden');
	 })
	 var $navi=$('#navi');
	 //네비클로즈
	 $("#header #close,#header .menu_wrap").click(function(){
	 	$navi.animate({right: '-524px'},300)
	 	$menuWrap.css('display','none');
	 	$body.removeAttr('style');	
	 	return false;
	 })
	 var $naveItem=$('.navi_intro li a');
	 $naveItem.on('mouseenter', function(){
		var $linkBtn= $(this).find('.link_btn_area');
		$linkBtn.animate({top: '12px'},300);
	})		
	 $naveItem.on('mouseleave', function(){
		var $linkBtn= $(this).find('.link_btn_area');
		$linkBtn.animate({top: '66px'},300);
	})
	//패럴럭스
	$('.sub_visual').parall();
	//visualEvent
	 var  scT = 0, sctPrev = 0;
     var $visual=$('.visual_bg');
      function visualEvent(){
      	if($visual.length){
       		var $visualH=$('.sub_visual').offset().top + $('.visual_bg').outerHeight();
	          	scT = $(window).scrollTop();	
	          	var $moveT=$visual.css("top").replace('px','');
		          if(scT > 0 && scT < $visualH ){
		              if(scT > sctPrev){
		              	$visual.delay(200).css({"top" : $moveT*1-10});
		              }
		              else if(scT < sctPrev){
		              	$visual.delay(200).css({"top" : $moveT*1+10});
		              }
		          }
	    		sctPrev = scT;
	    	}
     }	   		
     //턉버튼
     var $btnTop=$('.btn_top');
     $btnTop.click(function(){
     		$('html, body').stop().animate({scrollTop: 0},500);
     		return false;
     })
   	function dpnoneTop(){
   		if($(window).scrollTop()>200){
   			$btnTop.fadeIn();
   		}else{
   			$btnTop.fadeOut();
   		}
   	}

	//familysite
	var $btnArea=$('.foo_btn_area');
	$btnArea.click(function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
	})
	 //ie체크
	var Browser={chk:navigator.userAgent}
	Browser={ie8 : Browser.chk.indexOf('MSIE 8.0') != -1, ie9 : Browser.chk.indexOf('MSIE 9.0') != -1}
			
	$(window).scroll(function(){
		navOption();
		 if(!(Browser.ie8) && !(Browser.ie9)){visualEvent();}	
		dpnoneTop();  	
	});
})

