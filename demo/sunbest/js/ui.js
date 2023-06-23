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
    var $menuTarget=$mbCont.find('ul li a');
    var $mbLayer=$('.mb_layer');
    $btnMb_all.click(function(){var $subMenu=$('#header .navi .sub_menu');
    var $sub_li=$subMenu.find('ul li')
    $sub_li.hover(function(){
        var idx= $(this).index();
        $(this).parent('ul').siblings().find('.link_img').eq(idx).addClass('active').siblings().removeClass('active');
    }); 
    //sub menu
    $menuTarget.click(function(){
       $(this).parents('.menu_list li').siblings().find('ul').slideUp(100);
       $(this).siblings().slideToggle(100);
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