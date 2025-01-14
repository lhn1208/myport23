//parallax 플러그인

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
  //패럴럭스
  $('.content_header').parall();

  //nav
  $('.nav_open').click(function(){
    if($(this).hasClass('is-active')){
       $(this).removeClass('is-active');
       $('#nav').stop().animate({right:'-300px'})
    }else{
       $(this).addClass('is-active');
       $('#nav').stop().animate({right:'-0'})
    }
    return false;
  })
  var $navItem= $(".nav li");
  var $section=$('section');
  var scT = $(window).scrollTop();  
  $navItem.click(function(e){
    e.preventDefault();
     var idx=$(this).index();
    $('html, body').stop().animate({
      'scrollTop': $section.eq(idx).offset().top
    }, 800);
  })

  //헤더 화살표
  scroll();
  function scroll(){
    $('.scroll').animate({
      bottom:'20%'
    },2000).animate({
      bottom:'10%'
    },2000, scroll);
  }
  $('.main .tit').addClass('fadeInUp');


  /*hover*/
  // var $items= $('.portfolio>li a');
  // var $moredetail;
  // $items.on('mouseenter', function(){
  //     $moredetail= $(this).find('.desc');
  //       $(this).find('>img').stop().animate({
  //          left:"-3%",top:"-3%",width:"106%",height:"106%"
  //        },300);
  //       $moredetail.removeClass('fadeOutDown')
  //       $moredetail.addClass('fadeInUp animated');
  //   }).on('mouseleave', function(){
  //       $(this).find('>img').stop().animate({
  //          left:"0",top:"0", width:"100%", height:"100%"
  //       },300);    
  //       $moredetail.addClass('fadeOutDown');
  //       $moredetail.removeClass('fadeInUp')
  //   }); 
  function progressBar(){
    var wins = $(this).scrollTop();
    var hei = $('.wrap').outerHeight(); //전체 페이지 높이
    var hei2 = $(window).outerHeight(); //윈도우의 높이
    var height = hei - hei2;
    var bar = (wins / height) * 100;
    $('#myBar').css('width', bar + '%');
  }

  function port_fadeup(){
    if($(window).scrollTop()>100){
      $('.portfolio').addClass('fadeInUp');
    }
  }
  function skill_ev(){
    var $skillTop=$('.content_skill').offset().top;
    if($(window).scrollTop()>=$skillTop-500){
      $('.skill_list li .front').addClass('bounce').css({'opacity':'1'});
    }
  }
  function about_ev(){
    var $aboutTop=$('.content_about').offset().top;
    if($(window).scrollTop()>=$aboutTop-400){
      $('.content_about .about').addClass('bounceInLeft').css({'opacity':'1'});
    }
  }
  /*탑 스크롤*/  
  var $btnTop=$('.bt_top');
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

  //quick
  var $quick = $('.quick');
  var $quickItem = $quick.find('li');
  var $section = $('.main .sec');
  function quick(){
    var scT = $(window).scrollTop();
    var $port_top= $('.portfolio_area').offset().top;
    if (scT > $port_top)
      $quick.addClass('fixed');
    else
        $quick.removeClass('fixed');

     //section
     $section.each(function () {
        var idx = $(this).index()-1;
        var offst = $(this).offset().top -200; 
        if (offst <= scT) {
            $quickItem.eq(idx).addClass('on').siblings().removeClass('on');
        }
    });

    var second_sec = $('.content_skill').offset().top -200; 
    if (second_sec <= scT) {
        $quickItem.find('button').css('color','white');
    }else{
      $quickItem.find('button').css('color','black');
    }
  }
  //port tab
  // $('.portfolio').isotope({
  //   itemSelector: '.port_li',
  // });
  // filter items on button click
  // $('.tab_menu ul').on( 'click', 'li', function() {
  //   var filterValue = $(this).children().attr('data-filter');
  //   $('.portfolio').isotope({ filter: filterValue });
  //   $('.tab_menu li').removeClass('on');
  //   $(this).addClass('on');
  // });

  //port tab
  var $tab_li=$('.tab_menu li'),
  $tab_button=$tab_li.find('button');

  $tab_button.click(function(){
    $tab_li.removeClass('on');
    $(this).parent().addClass('on');
    var category=$(this).data('category');
    if (category=="*"){
      $('.portfolio>li').css('display','block');
    }else{
      $('.portfolio>li').css('display','none');
      $(category).css('display','block')
    }
  })

  //quick click
  $quickItem.click(function(e){
    e.preventDefault();
		var idx=$(this).index();
		$('html, body').stop().animate({
			'scrollTop': $section.eq(idx).offset().top
		}, 800);
	})
  
  $(window).scroll(function(){
    progressBar();
    dpnoneTop(); 
    port_fadeup();   
    skill_ev();
    about_ev();
    quick();
  });

});