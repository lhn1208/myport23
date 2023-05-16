$(document).ready(function(){
	
	var $window = $(window),
		$htmlBody = $('html, body');
		$body = $('body'),
		$comnHeader = $body.find('.comn-header'),
		$comnfooter = $body.find('.comn-footer'),
		$lnkTab = $comnHeader.find('.link-tab'),
		$categories = $body.find('.categories');
		
	//공통헤더, 고정
	var headerHeight = $comnHeader.outerHeight();
	var scrollBefore = $window.scrollTop();
	var scrollBuffer = 5;

	function scrollHandle() {
		var scrollTop = $window.scrollTop();
		var scrollGap = Math.abs(scrollTop - scrollBefore);	
		if( scrollTop < 1 ){
			if(currentPage == 'main.html'){ //메인페이지인 경우
				$comnHeader.removeClass('fix');
			}
			$lnkTab.removeClass('is-drop');
		}else if(scrollGap > scrollBuffer) {
			if(currentPage == 'main.html' || currentPage == 'main.html#' ){ //메인페이지인 경우
				$comnHeader.addClass('fix').toggleClass('is-scroll-down', scrollTop > headerHeight && scrollTop > scrollBefore);
				scrollBefore = scrollTop;
			}
			$lnkTab.removeClass('is-drop');
		}	
	}
	$window.on('scroll resize', scrollHandle);
	scrollHandle();

	//공통헤더, 드롭박스 show
	$lnkTab.on("click", 'a', function(e){
		if( $(this).closest('.comn-header').hasClass('fix') && !$(this).closest('.link-tab').hasClass('is-drop') ){
			e.preventDefault();
			$lnkTab.addClass('is-drop');
		}
	});
	
	//공통헤더, 드롭박스 hide
	$lnkTab.next('.screen').on("click", function (e) {
		e.preventDefault();
		$lnkTab.removeClass('is-drop');
	});

	//공통헤더, 메뉴 show
	// var thisPos = 0;
	$comnHeader.on("click",'.comn-cate-open', function (e) {
		e.preventDefault();
		// thisPos =  $window.scrollTop();
		$categories.addClass('is-open');
		$body.addClass('fixed-dim');	
		promotionSwiper.autoplay.stop();//기획전 슬라이드 stop
	});

	//공통헤더, 메뉴 hide
	$categories.on("click",'.comn-cate-close, > .screen', function (e) {
		e.preventDefault();
		// $window.scrollTop(thisPos);
		$categories.removeClass('is-open');
		$body.removeClass('fixed-dim');
		$categories.find('.categories_wrap').scrollTop(0);
		promotionSwiper.autoplay.start(); //기획전 슬라이더 play
	});

	//공통탭
	var $menu = $('.ui-tabs-menu'),
		$contWrap = $('.ui-tabs-contents-wrap'),
		_content ='.ui-tab-content',
		curr = 'current';

	// if(!$menu.length ) { return }
	$(_content).css('display', 'none');
	$contWrap.each(function(){
		$(this).find('div' + _content +':first').css('display', 'block');
	});
	$menu.on('click','a', function(){
		if(!$(this).hasClass(curr)){
			$(this).addClass(curr).closest('li').siblings('li').find('.' + curr).removeClass(curr);
			$($(this).attr('href')).css('display', 'block').siblings('div'+_content).css('display', 'none');
		}
		this.blur();
		return false;
	});

	//카테고리
	$categories.find('.place-two, .place-three, .place-four, .place-five').on('click', '> a', function(e){
		var _this = $(this);
		_this.parent('div').siblings().removeClass('on');
		_this.parent('div').toggleClass('on');
	});
	//카테고리, 하위메뉴 없을때 화살표 삭제
	$categories.find('.place-two, .place-three, .place-four, .place-five').each(function(){
		if( $(this).children('a').next().length == 0) {
			$(this).children('a').addClass('nocate');
		}
	});

	//공통팝업
	var thisPos = 0;
	var popID;
	var popup = {
		// 공통 pop_열기
		open : function(_this){
			$body.find('.pop-layer').hide(); //모든 팝업 닫기
			popID = _this.attr('href'); //팝업 ID
			thisPos =  $window.scrollTop(); //팝업누른 위치
			$body.addClass('fixed-dim'); //딤드			
			$body.find(popID).show(); //팝업보이기
			lockBody();
		},
		// 공통 pop-닫기
		close : function(){
			$body.removeClass('fixed-dim');
			$body.find('.pop-layer').hide();
			$window.scrollTop(thisPos);
			unlockBody();
		}
	};

	var currentPageArr = window.location.href.split('/');
	var currentPage =  currentPageArr[currentPageArr.length - 1];
	$body.on('click', '.pop-tit .close, .pop-layer > .screen', function(){
		window.history.back();
		return false;
	}).on('click', '.pop-open', function(){
		window.history.pushState({}, 'page', currentPage);
		popup.open($(this));
		return false;
	});

	window.onpopstate = history.onpushstate = function(e) {
		if(window.location.href.split('/').pop().indexOf(currentPage) === 0){
			popup.close();
		}
	}
	//공통 pop IOS body 스크롤 문제 해결
	var $docEl = $('html'),
		$comnWrap = $body.find('.wrapper'),
		scrollTopBody;
	
	function lockBody() {
		if(window.pageYOffset) {
			scrollTopBody = window.pageYOffset;			
			$comnWrap.css({
				top: - (scrollTopBody)
			});
		}		
		$docEl.css({
			height: "100%",
			overflow: "hidden"
		});
	}	
	function unlockBody() {
		$docEl.css({
			height: "",
			overflow: ""
		});	
		$comnWrap.css({
			top: ''
		});	
		window.scrollTo(0, scrollTopBody);
		window.setTimeout(function () {
			scrollTopBody = null;
		}, 0);	
	}	  

	//공통푸터, 토글
	$comnfooter.on("click",'.btn-tog', function (e) {
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('on') ){
			_this.addClass('on');
		}else {
			_this.removeClass('on');
		}
	});

	//공통, top버튼 노출
	$window.scroll(function () {
		var winHeight = $window.height(),
			scrollTop = $window.scrollTop();
		if ( scrollTop > winHeight) {
			$(".comn-go-top").addClass('is-show');
		} else {
			$(".comn-go-top").removeClass('is-show');
		}
	});
	//공통, top버튼 이동
	$body.on('click', '.comn-go-top', function (e) {
		e.preventDefault();
		$htmlBody.animate({scrollTop:0}, 500);
	});

	//통합검색
	var $integrate = $body.find('.search-integrate');
	var $inteSortSec = $body.find('.sec-sort');

   //통합검색, 리스트형/섬네일형 토글
	$inteSortSec.on('click', '.btn-change', function (e) {
		e.preventDefault();
		var _this = $(this);
		var $listPack = $integrate.find('.lst-pack');
		if( !$listPack.hasClass('view-thumb') ){
			$listPack.addClass('view-thumb').removeClass('view-list');
			_this.addClass('thum')
		}else {
			$listPack.addClass('view-list').removeClass('view-thumb');
			_this.removeClass('thum');
		}
	});

	//통합검색, 필터/인기순/예약마감제외 레이어, show/hide
	$inteSortSec.on('click', '.btn-popular, .btn-filter', function (e) {
		e.preventDefault();
		var _this = $(this);
		if( _this.hasClass('is-open') ){
			_this.removeClass('is-open').siblings().removeClass('is-open');
		}else {
			_this.addClass('is-open').siblings().removeClass('is-open');
		}
	});
	//통합검색, 필터/인기순/예약마감제외 레이어, 워드 삭제
	$integrate.find('.word-area').on('click', '.btn-remove', function (e) {
		e.preventDefault();
		var _this = $(this);
		_this.hide();
	});
	//통합검색, 필터/인기순/예약마감제외 레이어, 딤드영역 클릭시 닫기
	$integrate.find('.pop-filter .screen, .pop-popular .screen').on('click',function(e){
		e.preventDefault();
		var _this = $(this);
		_this.closest('.sec-sort').children().removeClass('is-open');
	});

	//통합검색, 인기순/예약마감제외 레이어, 버튼클릭시 소팅영역에 글자적용
	$integrate.on('click', '.pop-popular .popular-wrap a', function (e) {
		e.preventDefault();
		var _this = $(this);
		var optionTxt = _this.text();
		_this.closest('.popular-wrap').find('a').removeClass('on');
		_this.addClass('on');
		_this.closest('.range-area').find('.btn-popular').text(optionTxt);
	});

	//통합검색, 최근검색어 삭제
	var $srchDetail = $body.find('.search-detail');
	$srchDetail.on('click', '.btn-remove', function (e) {
		e.preventDefault();
		var _this = $(this);
		_this.closest('li').remove();
	});

	//공통, 폰트사이즈 
	var $fontChangePop = $body.find('.font-change-pop');
	$body.find('.comn-font-change').on('click', 'a', function(e){
		e.preventDefault();
		$body.addClass('layer-dim');
		$fontChangePop.show();
	});
	$fontChangePop.on('click', '.screen, .close', function(e){
		e.preventDefault();
		e.stopPropagation();
		$body.removeClass('layer-dim');
		$fontChangePop.hide();
	});
	$fontChangePop.find('.lst-calcuate').on('click', ' a', function(e){
		e.preventDefault();
		var index = $(this).parent('li').index();
		if( index == 0 ) {
			$htmlBody.css('fontSize', '16px' );
		} else if ( index == 1 ) {
			$htmlBody.css('fontSize', '17px' );
		} else if ( index == 2 ) {
			$htmlBody.css('fontSize', '18px' );
		} else {
			$htmlBody.css('fontSize', '19px' );
		}
	});

	//공통, 서브페이지 헤더 fav/share
	var $comnTitle;
	var comTitBtn = '';
		comTitBtn = '<a href="#" class="btn-comtit-fav">좋아요</a><a href="#pop-comtit-share" class="btn-comtit-share pop-open">공유하기</a>';
	var comTitPop = '';
		comTitPop += '<div class="pop-comtit-fav">';
		comTitPop += '<span class="blind">좋아요</span>';
		comTitPop += '</div>';
		comTitPop += '<div class="pop-comtit-share pop-layer" id="pop-comtit-share">';
		comTitPop += '<div class="screen"></div>';
		comTitPop += '<div class="pop-wrap">';
		comTitPop += '<div class="pop-con">';
		comTitPop += '<div class="tit">공유하기</div>';
		comTitPop += '<ul class="">';
		comTitPop += '<li><a href="#" class="kakao">카카오톡으로 링크 보내기</a></li>';
		comTitPop += '<li><a href="#" class="link">링크 복사하기</a></li>';
		comTitPop += '<li><a href="#" class="email">e-mail 발송</a></li>';
		comTitPop += '</ul>';
		comTitPop += '</div>';
		comTitPop += '</div>';
		comTitPop += '</div>';
	if( !$body.find('.section_title').length > 0) { //리뉴얼헤더
		$comnTitle = $body.find('.comn-page-title');
		$comnTitle.append(comTitBtn).after(comTitPop);		
	} else {  //구헤더
		$comnTitle = $body.find('.section_title');
		$comnTitle.append(comTitBtn).after(comTitPop);
	}
	$body.on("click",'.btn-comtit-fav', function (e) { //좋아요
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('is-on') ){
			_this.addClass('is-on');
			$body.find('.pop-comtit-fav').show();
		}else {
			_this.removeClass('is-on');
			$body.find('.pop-comtit-fav').hide();
		}
	});
	

	

});