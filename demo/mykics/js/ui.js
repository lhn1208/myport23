$(function(){
    let maxSubHeight = 0;
    let $subMenu=$('.header .sub_menu');
    function handleMenuHover() {
        $(this).parents('.navi_area').addClass('active');
    }
    
    $('.header .depth1>li>a').on('mouseenter focus', handleMenuHover);
    
    $('.navi_area').mouseleave(function(){
        $(this).removeClass('active');
    })
    $('.navi .depth1 li:last-child .sub_menu ul li:last-child a').focusout(function(){
        $('.navi_area').removeClass('active');
    });
    $subMenu.children('ul').each(function() {
        let height = $(this).outerHeight();
        if (height > maxSubHeight) {
            maxSubHeight = height;
        }
    });
    $('.header .navi_area .sub_cover').css('min-height',maxSubHeight);

    $('.gnb_all_btn').on('keydown', function(e) {
        // Tab 키와 Shift 키를 함께 눌렀을 때 처리
        if (e.which === 9 && e.shiftKey) {
         
          e.preventDefault();  // 기본 Tab 이동 동작 방지
          $('.navi menu .depth1>li:last-child>a').focus();
        }
      });

    $('.header .gnb_all_btn').click(function(){
        $(this).toggleClass('is-open');
    })
    //slider
    const $visual=$('.visual_slide');
    
    $visual.on('init', function(event, slick){
        $('.control_box').prepend('<div class="slider-count"><span id="current">1</span> <i>/</i> <span id="total">'+slick.slideCount+'</span></div>');
    });
    $visual.on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.slider-count #current').html(currentSlide+1);
    });
    $visual.find('.visual').slick({
        infinite: true,
        autoplay : true, 
        autoplaySpeed : 1000,
        //dots: true,
        prevArrow: $('.control_box .prev'),
        nextArrow: $('.control_box .next'),
       //draggable:false,
    });
    $visual.find('.play').click(function(){
        $('.visual').slick('slickPlay');
        $visual.find('.stop').addClass('active').siblings().removeClass('active');
    });
     
    $visual.find('.stop').click(function(){
        $('.visual').slick('slickPause');
        $visual.find('.play').addClass('active').siblings().removeClass('active');
    });
    //service
    $('.service_slide').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 8,
        slidesToScroll: 8,
        accessibility: false, 
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },
        ]
    });
    $('.tabs_base button').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.civil_sv_box .ico_fav').click(function(){
        $(this).toggleClass('on');
    });
    //admin
    $('.btn_lnb_move').click(function(){
       $('.admin_wrap').toggleClass('mini');
    });

    $('.lnb menu .depth1 a').click(function(){
        $(this).next().toggleClass('active');
    })
})