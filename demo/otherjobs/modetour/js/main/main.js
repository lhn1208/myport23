$(document).ready(function(){

	var $window = $(window),
	$body = $('body'),
	$mnContents =  $body.find('.mn-contents');

	//메인, 여행 맞춤검색, 버튼 액션 (select arr)
	$body.find('.search-custom').on('click', '.select-wrap', function(e){
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('on') ){
			_this.addClass('on');
		}else {
			_this.removeClass('on');
		}
	});
	//메인, 여행 맞춤검색, 스크롤시 하단고정
	var cusSrchPos = $mnContents.find('.mn-custom-search').position().top + $mnContents.find('.btn-search-wrap').height();
	$window.scroll(function () {
		var scrollTop = $window.scrollTop();
		if ( scrollTop > cusSrchPos) {
			$('.mn-custom-search').addClass('is-fixed');
		} else {
			$('.mn-custom-search').removeClass('is-fixed');
		}
	});
	//메인, 여행 맞춤검색, 팝업 show/hide
	var $customSearchPop = $body.find('.search-custom');
	$mnContents.find('.btn-search-wrap').on('click', '.btn-search', function(e){
		e.preventDefault();
		 $customSearchPop.show();
		 $customSearchPop.find('.pop-wrap').height($customSearchPop.find('.pop-wrap').height());
		$body.addClass('fixed-dim');
	});
	 $customSearchPop.on('click', '.screen, .close', function(e){
		e.preventDefault();
		e.stopPropagation();
		$customSearchPop.hide();
		$body.removeClass('fixed-dim');
	});
	//메인, 여행 맞춤검색, 셀렉트 색상변경
	$body.find('.search-custom .select, .search-custom .input, .search-custom .calendar').on('change', function(e){
		$(this).addClass('is-change');
	});
	//메인, 여행 맞춤검색, 최근 검색
	$customSearchPop.find('.btn-recent').on('click', function(e){
		e.preventDefault();
		$customSearchPop.find('.recent').addClass('is-open');
   });
	//메인, 여행 맞춤검색, 검색 화면으로
	$customSearchPop.find('.btn-recent-back').on('click', function(e){
		e.preventDefault();
		$customSearchPop.find('.recent').removeClass('is-open');
   });
   //메인, 여행 맞춤검색, 여행가실지역은 어디인가요?
   $customSearchPop.find('.input-wrap .input').on('keydown', function(e) {
		$customSearchPop.find('.lst-result-wrap').addClass('is-open');
   });
   $customSearchPop.find('.input-wrap .input').on('focusout', function(e) {
		$customSearchPop.find('.lst-result-wrap').removeClass('is-open');
   });
//    $customSearchPop.find('.lst-result-wrap').on('click', function(e) {
// 		$customSearchPop.find('.lst-result-wrap').removeClass('is-open');
//    });
   $customSearchPop.find('.lst-result-wrap a').on('click', function(e) {
	   e.preventDefault();
	   var tourSpot = $(this).find('span:last-child').text();
	   $(this).closest('.sel-box-inner').find('.input').addClass('is-change').val(tourSpot);
	});
    //메인, 여행 맞춤검색, 인기도시 스와이퍼
   var popularcitySwiper = new Swiper('.search-custom .swiper-container', {
		slidesPerView: 'auto',
		preventClicks: true,
		preventClicksPropagation: false,
		observer: true,
		observeParents: true
	});

	//메인, 베스트 지역 상품/베스트 테마 상품 #키워드 스와이퍼
	var localSwiper = new Swiper('.mn-best .ui-tabs-menu.swiper-container', {
		slidesPerView: 'auto',
		preventClicks: true,
		preventClicksPropagation: false,
		observer: true,
		observeParents: true
	});

	var $lankTitle = $('.mn-best .ui-tabs-menu .swiper-slide a');
	$lankTitle.on('click', function(e){
		e.preventDefault();
		var $target = $(this).parent();
		$target.addClass('on').siblings().removeClass('on');
		muCenter($target);
	});

	function muCenter($target){
		var snbwrap = $target.closest('.swiper-wrapper');
		var targetPos = $target.position();
		var $bodywidth = $target.closest('.swiper-wrapper').width(); //$body.width();
		var winHalf = ( $bodywidth ) / 2;
		var pos;
		var wrapWidth=0;

		snbwrap.find('.swiper-slide').each(function(){
			wrapWidth += $(this).outerWidth();
		})
		if ((targetPos.left + $target.outerWidth()/2) <= winHalf) { // left
			pos = 0;
		}else if ((wrapWidth - targetPos.left - $target.outerWidth()/2) <= winHalf) { //right
			pos = wrapWidth - $bodywidth;
		}else {
			pos = targetPos.left - winHalf + ($target.outerWidth()/2);
		}
		
		setTimeout(function(){snbwrap.css({
			"transform": "translate3d("+ (pos*-1) +"px, 0, 0)",
			"transition-duration": "500ms"
		})}, 200);
	}

	//메인, 베스트 지역 상품/베스트 테마 상품 스와이퍼
	var bestItemSwiper = new Swiper('.mn-coupon .swiper-container', {
		slidesPerView: 1.01, 
		spaceBetween: 10,
		observer: true,
		observeParents: true
	});
	//퀵 스와이퍼
	var bestItemSwiper = new Swiper('.mn-quick .swiper-container', {
		slidesPerView: 4.2, 
		spaceBetween: 10,
		observer: true,
		observeParents: true
	});

	//나이대 인기 상품
	var popularSwiper = new Swiper('.mn-popular .swiper-container', {
		slidesPerView: 1.01, 
		spaceBetween: 10
	});

	//메인, 요즘뜨는 상품(연령대 인기상품)
	// $mnContents.on("click",'.fav', function (e) {
	// 	e.preventDefault();
	// 	var _this = $(this);
	// 	if( !_this.hasClass('on') ){
	// 		_this.addClass('on');
	// 	}else {
	// 		_this.removeClass('on');
	// 	}
	// });

	//메인, 기획전 스와이퍼
	var $mnContents =  $body.find('.mn-contents');
	var promotionSwiper = new Swiper('.visual-slider .swiper-container', {
		pagination: {
			el: '.visual-slider .swiper-pagination',
			type: 'fraction'
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		loop:true
	});
	if( $body.find('.notice-pop').is(":visible") ){ //공지팝업 보일경우
		promotionSwiper.autoplay.stop(); //자동롤링 옵션 비활성
	}else{
		promotionSwiper.autoplay.start(); //자동롤링 옵션 활성
	}

	//메인, 기획전 팝업 스와이퍼
	var promotionSwiper2 = new Swiper('.pop-slider .swiper-container', {
		observer: true,
		observeParents: true,
		slidesPerView: 1.05, 
		spaceBetween: 10,
	});
	//메인, 기획전 play/stop 버튼
	$mnContents.find('.visual-slider').on('click', '.btn-stop', function(e){
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('is-stop') ){
			_this.addClass('is-stop');
			promotionSwiper.autoplay.stop();
		} else {
			_this.removeClass('is-stop');
			promotionSwiper.autoplay.start();
		}
	});
	//메인, 기획전 전체보기 클릭시 play/stop
	$mnContents.find('.visual-slider').on('click', '.btn-allpromo', function(e){
		e.preventDefault();
		$body.addClass('layer-dim');
		$body.find('.pop-slider').show();
		promotionSwiper.autoplay.stop();
	});
	//메인, 기획전팝업 닫기
	$body.find('.pop-slider').on('click', '.screen, .close', function(e){
		e.preventDefault();
		e.stopPropagation();
		$body.removeClass('layer-dim');
		$body.find('.pop-slider').hide();
		promotionSwiper.autoplay.start();
		promotionSwiper2.slideTo(0);
	});
	//공통, 공지팝업 스와이퍼
	var noticeSwiper = new Swiper('.notice-pop .swiper-container', {
		pagination: {
			el: '.notice-pop .swiper-pagination',
			clickable: true,
		}
	});
	//공통, 공지팝업 닫기
	$body.find('.notice-pop').on('click', '.check-close, .screen', function(e){
		e.preventDefault();
		$(this).closest('.notice-pop').hide();
		$body.removeClass('fixed-dim');
		promotionSwiper.autoplay.start(); //공지팝업 닫을때, 기획전 팝업 롤링 시작
	});
	
	//메인, 리뉴얼 오픈 팝업 스와이퍼
	var renewSwiper = new Swiper('.renewal-open-pop .swiper-container', {
		pagination: {
			el: '.renewal-open-pop .swiper-pagination',
			clickable: true,
		}
	});

});