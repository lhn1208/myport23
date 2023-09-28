$(function(){
    $('.btn_lnb_move').click(function(){
       $('.admin_wrap').toggleClass('mini');
    });

    $('.lnb menu .depth1 a').click(function(){
        $(this).next().toggleClass('active');
    })
})