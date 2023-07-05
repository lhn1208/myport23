var loading = function(){
  var _loading = $('.loading-layer').find('.loading'),
      className = 'icon',
      timer = null,
      count = 0,
      max = 16,
      speed = 100,
      activeClass= '';

  var show = function() {
      clearInterval(timer);

      count = 1;
      $('.dimmed').css('display', 'block');
      $('.loading-layer').css('display', 'block');

      timer = setInterval(function(){
        if(count > max) { count = 1; }

        _loading.removeClass(activeClass);

        activeClass = className + count;
        _loading.addClass(activeClass);

        count++;

      }, speed);
  };
  var hide = function() {
    $('.dimmed').css('display', 'none');
    $('.loading-layer').css('display', 'none');
  };

  return {
    show: show,
    hide: hide
  }
}();

$(document).ready(function(){
	//스카이배너
	var main_offset=$('#mainContainer').offset().top;
	$(window).scroll(function(){	
		var scTop = $(window).scrollTop();
		if(scTop > main_offset){
			$('.skybanner_wrap').css({'position':'fixed', 'top':'40px'});
		}else{
			$('.skybanner_wrap').css({'position':'absolute', 'top':'355px'});
		}
	});		
	//최상단 롤링 
	var $stop = $('#subVisualStop01'),
		$rolling = $('.section_rolling');
	$stop.on('click', function(){
		if($stop.hasClass('on')){
			$rolling.cycle("resume");
			$stop.removeClass("on");
		}else{
			$rolling.cycle("pause");
			$stop.addClass("on");
		}
		return false;
	}); 
	function RandomSlide_slide () {
		var elem = $('.cycle_show_slide'); 
		var j =  Math.floor(Math.random()*(elem.find('> li').length));
		elem.cycle('goto', j);
	};
	RandomSlide_slide();		
	//핫클릭 베스트,테마여행 shadow
	$('.list_info li a, .theme_list li a').on('mouseenter', function(){
		var $info= $(this).children('.info');
		$info.animate({height: '100%'},300);
	})		
	$('.list_info li a').on('mouseleave', function(){
		var $info= $(this).children('.info');
		fadeSet($info,'hot');	
	});
	$('.theme_list li a').on('mouseleave', function(){
		var $info= $(this).children('.info');			
		fadeSet($info,'theme');	
	});
	function fadeSet($info,key){
		if(key=='hot'){
			$info.animate({height: '60px'},300);
		}else{
			$info.animate({height: '50px'},300);
		}
	}
	//긴급모객
	$('.product_tit li a').click(function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
		var active = $(this).parent().attr("rel");
		$("#" + active).show().siblings('.product').hide();
		return false;
	});
	$('.product:first').show();
	//긴급모객, 모두의 여행:shadow
	$('.product li a, .modes_banner li a').on('mouseenter', function(){
		$(this).children('.shadow').stop().fadeIn();			
	}).on('mouseleave', function(){
		$(this).children('.shadow').stop().fadeOut(100);		
	});	
	//기획전
	$('.promotion_area .pic1').on('mouseenter focusin', function(){
		$(this).find('.pic_util').addClass('on');
	}).on('mouseleave focusout', function(){
		$(this).find('.pic_util').removeClass('on');
	});
	//팝업창
	$('.pop_close').click(function(){
		$('.bg_layer, .popup_area').css('display','none');
	})
	//로딩
	loading.show();
});