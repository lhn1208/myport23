$(document).ready(function(){
    var $body=$('body');
    //전체매물 slideup
    var $Slidebox=$('.slide_box');
   
    var slide_prev_h=$Slidebox.outerHeight();
    var header_h=$('.search_h').outerHeight();
    var cal_h=Math.ceil($('html,body').outerHeight() - header_h);
    $Slidebox.find('.header').click(function(){
        if(!($Slidebox.hasClass('height_up'))){
            $Slidebox.addClass('height_up');
            $Slidebox.animate({
                'height': cal_h
            },700)

            var time=setTimeout(function(){
                $('.offer_map .map, .offer_map .ico_offer_aera').css('display','none');
            },750);
          
        }else{
            $Slidebox.removeClass('height_up');
            $Slidebox.animate({
                'height':slide_prev_h
            },700)
            $('.offer_map .map, .offer_map .ico_offer_aera').css('display','block');
        }
     
    })
 
    //pop
    var $slidePop=$('.slide_pop');
    var pop_h=$slidePop.outerHeight();
    $slidePop.css('bottom',-pop_h);
    $('.slide_link').click(function(){
        up_num='0'
         $slidePop.stop().animate({bottom:up_num},speed);       
        pop_set('y');
        return false;
    })
    $('.slide_pop .close').click(function(){
        reset_num=-pop_h;
         $slidePop.stop().animate({bottom:reset_num},speed);       
        pop_set('n');
        return false;
    })

    function pop_set(hide_yn){
        if(hide_yn=='y'){
            $('.cover').addClass('active');
            $body.addClass('scroll_hidden');
        }
        if(hide_yn=='n'){
            $('.cover').removeClass('active');
            $body.removeClass('scroll_hidden');
        }
    }
                 
    //평점
    $('.star_grade span').on('click', function(){
    $(this).parent().children('span').removeClass('on');
    $(this).addClass('on').prevAll('span').addClass('on');
        return false;
    });

     //1대1문의,일정관리 슬라이드
     var targetArea= $(".open_cont");
     var speed=300;
     targetArea.hide();
     var cont_link= $(".list li a");
    
    //일정관리
    $(".schedule_box").find(cont_link).click(function(){
        var $reqArea=$(this).next(targetArea);
        if(!$(this).hasClass('on')){
            $reqArea.slideDown(speed);
            $(this).addClass('on');
        }else{
            $reqArea.slideUp(speed);
            $(this).removeClass('on');
        }
        return false;
    })
    //1대1문의
    $(".qna_box").find(cont_link).click(function(){
        var $reqArea=$(this).next(targetArea);
        if(!$(this).hasClass('on')){
            $(this).addClass('on').parent().siblings().find('a').removeClass('on');
            $reqArea.slideDown(speed);
        }else{
            $reqArea.slideUp(speed);
            $(this).removeClass('on');
        }
        cont_link.not(this).next(".request_area").slideUp(500);
        return false;
    })

});
