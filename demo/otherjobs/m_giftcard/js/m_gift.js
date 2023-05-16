$(function () {
   
    //여행상품권 선택
    var $select=$('.gift_select');
    var $select_form=$select.find('.select_form');
    var $select_open=$select.find('.select_open_form');
    $select_form.click(function(){
       $(this).removeClass('open');
       $select_open.addClass('open');
    });

    $select_open.find('.gift_list button').click(function(){
        var $btnVal=$(this).text();
         $('.gift_select .select_form').find('.txt').text($btnVal);
         $('.gift_select .select_form').addClass('open');
        $select_open.removeClass('open');
    })

    $select_open.find('.list_top').click(function(){
        $('.gift_select .select_form').addClass('open');
        $select_open.removeClass('open');
    })

    var $term=$('.term_area .term');
    var $chk_all=$term.find('.chkall');
    var $term_sub=$term.find('.sub_chk_form');
    
    
    $chk_all.click(function(){
        if( $chk_all.prop("checked")){
            $term_sub.find('.chk').prop("checked",true);
            slide('down');

        }else{
            $term_sub.find('.chk').prop("checked",false);
            slide('up');
        }
    })

    function slide(option){
        if(option=='up'){
            //열렸을때
            $term_sub.slideUp();
            $term_sub.removeClass('slide');
            $term.removeClass('on')
        }else{
            //닫혔을 때
            $term_sub.slideDown();
            $term_sub.addClass('slide');
            $term.addClass('on')
        }
    }

    //layer
    $('.m_gift .term_area a').click(function(){
        $popLayer.removeClass('open');
        $('body').addClass('fix_dim');
        $($(this).attr("href")).addClass('open');
        return false;
    })
    var $popLayer= $('.m_gift .pop_layer');
    $popLayer.find('.pop_close').click(function(){
        $popLayer.removeClass('open');
        $('body').removeClass('fix_dim');
    })

    
});