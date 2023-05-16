
$(document).ready(function () {
    var gnb=$('.remember_gnb');
    $(window).scroll(function(){
        //gnb
        var scTop = $(window).scrollTop();
        if(scTop>0){							
            gnb.addClass('fix_on');						
        }else{
            gnb.removeClass('fix_on');
        }           
    });
    //mobile menu
    gnb.find('.menu').click(function(){
        $('body').addClass('fixed');
        $('.mobile_menu').addClass('on');
    })
    $('.mobile_menu .close').click(function(){
        $('body').removeClass('fixed');
        $('.mobile_menu').removeClass('on');
    })
    //공개여부
    $('.register .switch').on({
        click:function(e){
            // $('.register .switch').toggleClass('active');
             $(this).toggleClass('active');
        }
    });
    //프리미엄 서비스 탭
    var item=$('.tab_area').find('a');
    var section=$('.section_wrap section');						
    var gnb_h=$('#remember_gnb').height();
    item.click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        var idx=$(this).index();
        $('html, body').stop().animate({
            'scrollTop': section.eq(idx).offset().top-gnb_h
        }, 1000);													
        return false;
    });		

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
    // 컨텐츠 내용을 숨겨주세요!
    var tabBtn = $("#tab_btn > ul > li"); //각각의 버튼을 변수에 저장
    var tabCont = $("#tab_cont > div");  //각각의 컨텐츠를 변수에 저장

    tabCont.hide().eq(0).show();

    tabBtn.click(function(){
    var target = $(this);        //버튼의 타켓(순서)을 변수에 저장
    var index = target.index();  //버튼의 순서를 변수에 저장
        tabBtn.removeClass("active");   //버튼의 클래스를 삭제
        target.addClass("active");   //타켓의 클래스를 추가
        tabCont.css("display","none");
        tabCont.eq(index).css("display","block");
    });

    var tabBtn1 = $(".tab_menu_list > ul > li"); //각각의 버튼을 변수에 저장
    var tabCont1 = $(".subtab_content_area > div");  //각각의 컨텐츠를 변수에 저장
    tabCont1.hide().eq(0).show();

    tabBtn1.click(function(){
    var target = $(this);        //버튼의 타켓(순서)을 변수에 저장
    var index = target.index();  //버튼의 순서를 변수에 저장
        tabBtn1.removeClass("active");   //버튼의 클래스를 삭제
        target.addClass("active");   //타켓의 클래스를 추가
        tabCont1.css("display","none");
        tabCont1.eq(index).css("display","block");
    });
    //faq
    $(".faq_area .header").click(function() {
        $(this).next(".content").stop().slideToggle(300);
        $(this).toggleClass('on').siblings().removeClass('on');
        $(this).next(".content").siblings(".content").slideUp(300); // 1개씩 펼치기
    });
});