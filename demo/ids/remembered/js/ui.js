
$(document).ready(function () {
    var $gnb_header=$('#memorialCanvas header');
    $(window).scroll(function(){
        //gnb
        var scTop = $(window).scrollTop();
        if(scTop>0){							
            $gnb_header.addClass('is-fixed');						
        }else{
            $gnb_header.removeClass('is-fixed');
        }           
    });
    //toggle-gnb
    $gnb_header.find('.toggle_gnb').click(function(){
        $(this).closest('header').toggleClass('is-active');
    })


    //공개여부
    $('.register_form .switch').on({
        click:function(e){
            // $('.register .switch').toggleClass('active');
             $(this).toggleClass('active');
        }
    });
    //프리미엄 서비스 탭
    // var item=$('.tab_area').find('button');
    // var section=$('.section_wrap section');						
    // var gnb_h=$('#remember_gnb').height();
    // item.click(function(){
    //     $(this).addClass('on').siblings().removeClass('on');
    //     var idx=$(this).index();
    //     $('html, body').stop().animate({
    //         'scrollTop': section.eq(idx).offset().top-gnb_h
    //     }, 1000);													
    //     return false;
    // });		

    //부고 슬라이드     
    var swiper = new Swiper(".memorial_slide", {
        slidesPerView: 3.5,
        spaceBetween:50,
        centeredSlides:true,
        loop:true,
        // autoHeight:true,
        simulateTouch:true,
        navigation:false,
        pagination: {
        el: ".memorial_slide .swiper-pagination",
        type: "progressbar"
        },
        breakpoints: {
        760: {
            slidesPerView: 2,
            loop:true,
            simulateTouch:true,
        }
        }
    });
    // 탭메뉴            
    var $tab=$("#tab_menu li");
    var $tab_cont=$(".tab_cont_wrap .tab_cont");

    $tab.click(function(){
        var idx=$(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $tab_cont.eq(idx).addClass('on').siblings().removeClass('on');
        return false;
    });

    //faq
    $(".faq_area .header").click(function() {
        $(this).next(".content").stop().slideToggle(300);
        $(this).toggleClass('on').siblings().removeClass('on');
        $(this).next(".content").siblings(".content").slideUp(300); // 1개씩 펼치기
    });
});