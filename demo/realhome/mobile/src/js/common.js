$(document).ready(function(){
    //알림창
    alarm_show();
    function alarm_show(){
        $('.layer_alarm').animate({
            bottom:'8%'
        },500)
    }
    setTimeout(alarm_remove,1000);
    function alarm_remove(){
        $('.layer_alarm').animate({
            bottom:'-8%'
        },500)
    }
    var $pw_input=$('.member_form .pw_input')
    var $placeholder;
    $pw_input.on('input',function(e){
        $placeholder= $(this).siblings('.placeholder');
        $placeholder.css('display','none')
        if($(this).val()==""){
            $placeholder.css('display','block')
        }
    });

    var $member_input=$('.member_form .member_input');
    $member_input.focus('input',function(){
        $(this).next('.delete').css('display','block');
    })
    $member_input.blur('input',function(){
        $(this).next('.delete').removeAttr('style');
    })

    //swiper menu
    var top_h=$(".present_sec").outerHeight() + 34;
    var $swiperMenu=$('.swiper_fix .swiper_menu');
    $(window).scroll(function() {
        var sct=$(window).scrollTop();
        if(sct>top_h){ 
            $swiperMenu.addClass('fix')
        }else{
            $swiperMenu.removeClass('fix')
        }
    });

    //동의 박스
    // var $agreeBox=$('.agree_box');
    // $agreeBox.find('.agree_txt').click(function(){
    //     if(!($(this).next('.checkbox').is(':checked')))
    //     $(this).next('.checkbox').prop("checked", true);
    //     else
    //     $(this).next('.checkbox').prop("checked", false);
    // })
});