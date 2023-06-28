$(document).ready(function(){
$(function() {
    //sub menu
    var $subMenu=$('#header .navi .sub_menu');
    var $sub_li=$subMenu.find('ul li')
    $sub_li.hover(function(){
        var idx= $(this).index();
        $(this).parent('ul').siblings().find('.link_img').eq(idx).addClass('active').siblings().removeClass('active');
    }); 

    //quick
    var $quickBtn=$('#header .btn_quick');
    var $quickCont=$('.quick_cont');
    $quickBtn.click(function(){
        $quickCont.toggleClass('active');
    });
    /*mobile_menu*/
    var $btnMb_all=$('#header .btn_mb_all');
    var $mbCont=$('.mobile_menu');
    var $mbCont_clse=$('.mobile_menu .btn_close');
    var $menuTarget=$mbCont.find('.menu_list li a');
    var $mbLayer=$('.mb_layer');
    $btnMb_all.click(function(){
        var $subMenu=$('#header .navi .sub_menu');
        var $sub_li=$subMenu.find('ul li')
        //pc sub_menu 
        $sub_li.hover(function(){
            var idx= $(this).index();
            $(this).parent('ul').siblings().find('.link_img').eq(idx).addClass('active').siblings().removeClass('active');
        }); 
        //mobile sub menu
        $menuTarget.click(function(){
            $mbCont.find('.mb_sub').slideUp(100);
            $(this).next('.mb_sub').slideToggle(100);
        })
        $mbCont.addClass('active');
        var timer = setInterval(function() {
            $mbLayer.show();
            clearInterval(timer);
        }, 200);
    });
    $mbCont_clse.click(function(){
        $mbCont.removeClass('active');
        $mbLayer.hide();
    })

    var windowWidth = $(window).width();  
    $(window).resize(function() {
        windowWidth = $(window).width();  
        if (windowWidth <= 1440) {
            $quickCont.removeClass('active');
        }else{
            $mbCont.removeClass('active');
            $mbLayer.hide();
        }
    });
    //main button hover
    var $customerLinks=$('.customer_center .customer_links a');
    $customerLinks.hover(function(){
       $customerLinks.find("img").attr("src", function(i, val) {
           return val.replace("_over.png", ".png");
       });
       $(this).find("img").attr("src", function(i, val) {
           return val.replace(".png", "_over.png");
       });
   },function(){
       $customerLinks.find("img").attr("src", function(i, val) {
           return val.replace("_over.png", ".png");
       });
   })
    //top_visual 공통
    var $intro_vis = $('.top_visual');
    var baseAniTitle = 0; // 초기 애니메이션 값
    var baseAniText = 0;
    var aniTitle = baseAniTitle; 
    var aniText = baseAniText; 
    function updateAnimation() {
        $intro_vis.find('.title').css({
            'transition': 'transform .6s',
            'transform': (aniTitle > 0) ? `translateY(0) scale(${1 + aniTitle / 50})` : `translateY(${aniTitle}px) scale(${1 - aniTitle / 100})`,
            'opacity': (aniTitle <= 0) ? 1 : 0.4 // 스크롤 위치가 0보다 작을 때는 opacity를 1로 설정, 그 외에는 0.4로 설정
        });
        $intro_vis.find('.text').css({
            'transition': 'transform .6s', 
            'transform': (aniText > 0) ? `translateY(${aniText}px) scale(${1 - aniText / 250})` : `translateY(${aniText}px) scale(1)`,
            'opacity': (aniText <= 0) ? 1 : 0.4
        });
    }
   $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        if ($intro_vis.length > 0) {
            aniTitle = Math.max(baseAniTitle - scrollTop, -100); // 최대 -100px까지 애니메이션 값 계산
            if (scrollTop > 0) {
               aniText = Math.min(baseAniTitle + scrollTop - 40, 110); // 최대 100px까지 애니메이션 값 계산
            } else {
              aniText = 0; // 스크롤 위치가 0 이하일 때 0으로 설정
            }
            updateAnimation();
          } else {
            aniTitle = baseAniTitle; // 스크롤 위치가 0 이하일 때 기본 애니메이션 값으로 설정
            aniText = baseAniText;
            updateAnimation();
          }
    });
})

new Swiper(".visual .swiper",{
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    }
 });
 var prod_swiper = new Swiper(".product_type .swiper",{
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }, 
 });
});