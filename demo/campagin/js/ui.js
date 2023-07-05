$(document).ready(function(){
    $(function() {
        var $camp_header=$('.camp_header');
        $camp_header.find('.sch_btn').click(function(){
            $camp_header.find('.sch_box').addClass('visible');
        })
        $camp_header.find('.btn_close').click(function(){
            $camp_header.find('.sch_box').removeClass('visible');
        });
        $click_sort_sns=$('.click_sort.sns');
        /*sns*/
        var windowWidth;
        $(window).resize(function() {
            windowWidth = $(window).width();
            if (windowWidth <= 1023) {
                $click_sort_sns.removeClass('pc');
            } else {
                $click_sort_sns.addClass('pc');
            }
        });
        windowWidth = $(window).width();
        if (windowWidth <= 1023) {
            $click_sort_sns.removeClass('pc');
        } else {
            $click_sort_sns.addClass('pc');
        }
        //button
        $sort_box=$('.click_sort button');
        $sort_box.click(function(){
            $(this).toggleClass('active');
            $(this).next().toggleClass('active');
        })
        $btn_global =$('.footer_bottom .btn_global');
        $btn_global.find('.btn').mouseover(function(){
            $btn_global.find('.global_box').show();
        });
        $btn_global.find('.global_box').mouseleave(function(){
            $btn_global.find('.global_box').hide();
        });
        /*top button */
        var windowHeight= $(window).height();
        var $togoBtn= $('.fix_right .togo_top');
        $(window).scroll(function(){
            var scrollT = $(this).scrollTop();
            if(scrollT>300){
                $togoBtn.addClass('active');
            }else{
                $togoBtn.removeClass('active');
            }
        });
        $togoBtn.click(function(){
            $('html, body').animate({scrollTop: 0}, );
        })
        //mobile menu pop
        $mb_add_footer=$('.mb_add_footer .category');
        $mobile_pop=$('.mobile_pop_wrap');
        $mb_add_footer.click(function(e){    
            e.preventDefault();
            $mobile_pop.addClass('visible');
        });
        $mobile_pop.find('.close').click(function(){
            $mobile_pop.removeClass('visible');
        });
        //content
       var $gallerycont= $('.gallery_container');
       var $btn_like=$gallerycont.find('.like');
       $btn_like.click(function(){
        $(this).toggleClass('on');
       })
       //right menu
       var $cont_inner=$gallerycont.find('.tab_cont1 .content_inner');
       var $contArea=$cont_inner.find('.content_area');
       var $rightMenu=$cont_inner.find('.menu_wrap');
       var $section = $cont_inner.find('.scroll_sec');
       var $menuitem= $rightMenu.find('.menu li');
       function scrollMenu(){
           var cont_offset= $cont_inner.offset().top;
           var scT = $(window).scrollTop();	
           var contH= $contArea.outerHeight();//cont height
           var menuH= $rightMenu.outerHeight();//menu height
           var calc =  contH - menuH;
            if (scT > cont_offset && scT < calc) {
                $rightMenu.addClass('fixed').removeAttr('style');
            } else if (scT >= calc) {
                $rightMenu.removeClass('fixed').css({'position': 'absolute', 'top': calc + 'px', 'left': '50%', 'margin-left': '272px'});
            } else {
                $rightMenu.removeClass('fixed').removeAttr('style');
            }
       }
       $menuitem.click(function(e){
            e.preventDefault();
            var idx=$(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('html, body').stop().animate({
                'scrollTop': $section.eq(idx).offset().top -200
            }, 800);
       })
       //tab
       $gallerycont.find('.tab_area a').click(function(e){
            e.preventDefault();
            $gallerycont.find('[class^="tab_cont"]').removeClass('active');
            $($(this).attr("href")).addClass('active');
            if ($gallerycont.find('.tab_cont1.active').length > 0) {
                $gallerycont.find('.tab_cont1').scrollTop(0);
                $rightMenu.removeAttr('style');
            }
       })
       $gallerycont.find('.ico_links a').click(function(e){
            e.preventDefault();
            $('html, body').stop().animate({
                'scrollTop': $($(this).attr("href")).offset().top
            }, 800);
       })
       //layer
       var $btnClose=$gallerycont.find('.pop_layer .btn_close');
       var $btnCopy=$gallerycont.find('.btn_copy');
       var $btnInfrom=$gallerycont.find('.btn_inform');
       $btnCopy.click(function(){
            $gallerycont.find('.pop_copy_wrap').show();
       });
       $btnInfrom.click(function(){
            $($(this).attr("href")).show();
       })
       $btnClose.click(function(){
            $(this).parents('.pop_cover').hide();
       });
       $(document).mouseup(function (e){
            var LayerPopup = $(".pop_cover");
            if(LayerPopup.has(e.target).length === 0){
            LayerPopup.hide();
        }
        });
       $(window).scroll(function(){  
            if($cont_inner.length > 0){
                scrollMenu();
            }
       });
   
    })
});