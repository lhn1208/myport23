(function ($) {
    $(document).ready(function () {
        //header
    //    var $gnb_area= $('.drv_gnb_area');
   
    //     var $gnb=$('.drv_gnb_list>li');
    //     $gnb.mouseenter(function(){
    //         $(this).children('.drv_gnb_sub').stop().slideDown();;
    //     })
    //     $gnb.mouseleave(function(){
    //         $(this).children('.drv_gnb_sub').stop().slideUp();
    //     })

    // $('.drv_gnb_sub').parent().hover(function(){
    //     var submenu=$(this).children('.drv_gnb_sub');
    //     if ( $(submenu).is(':hidden') ) {
    //         $(submenu).slideDown(200);
    //       } else {
    //         $(submenu).slideUp(200);
    //       }
    // });
        
        //전체메뉴
         var $all_menu_box= $('.all_menu_box');
         var $menu_close_btn=$all_menu_box.find('.btn_close');
         var $menue_btn=$('.all_menu_btn');
        $($menue_btn).click(function(){
            if($(this).hasClass('active')){                        
                $(this).removeClass('active');
                $all_menu_box.removeClass('active');
            }else{
                $(this).addClass('active');
                $all_menu_box.addClass('active');
            }
        })
        $($menu_close_btn).click(function(){
            $menue_btn.removeClass('active');
            $all_menu_box.removeClass('active');
        });



    });
})(jQuery);