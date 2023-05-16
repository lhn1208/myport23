$(document).ready(function(){
    //sub_header
    var $header= $(".header_section, .header_shadow");
    $(window).scroll(function() {
        var sct=$(window).scrollTop();
        if(sct>0){ 
            $header.addClass("active");
        }else{
            $header.removeClass("active");
        }
    });
    $(".offer_detail_wrap").scroll(function() {
        var sct=$(".offer_detail_wrap").scrollTop();
        if(sct>0){ 
            $header.addClass("active");
        }else{
            $header.removeClass("active");
        }
    });
    //select
    var $selectArea=$(".select_area:not('.none')"),
        $selectTop= $selectArea.find(".select_top"),
        $selectList=$selectArea.find(".select_list"),
        $selectList_link=$selectList.find("a"),
        selTop_parent;

    $selectTop.click(function(){
        $(".tooltip_box").removeClass("open");
        selTop_parent=$(this).parent(".select_area");
        if($(this).parents('.select_area').hasClass("disabled")){
            return false;
        }else{
            //selectTop클릭시 선택창 닫힘
            if(selTop_parent.hasClass("open")){
                selTop_parent.removeClass("open");
            }else{
                $selectArea.removeClass("open");
                $(this).parent().addClass("open");
            }
        }
        return false;
    })

    $selectList_link.click(function(){
        var $btnVal=$(this).text();
        $(this).parent().siblings($selectTop).text($btnVal);
        $(this).parent().siblings($selectTop).css("color","#373737")
        selTop_parent.removeClass("open");
        return false;
    });
   
    //button
    var $btn=$(".click_ev .btn_type1");
    $btn.click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on")
        }else if($(this).hasClass("off")){
            return false;
        }else{
            $(this).addClass("on")
        }
    })

    var $popTarget=$(".visit");
    $popTarget.click(function(){
        $cover.addClass("active");
        $layer.addClass("active");
             return false;
    })
    //layer
    var $layer=$(".layer");
    var $cover= $(".sub_cover");
    var $body=$('body');
    $layer.find(".close").click(function(){
        $cover.removeClass("active");
        $layer.removeClass("active");
        return false;
      })
    var layerH= $layer.outerHeight();
    var top = Math.ceil((window.screen.height - layerH)/2)-70;
     $layer.css("top",top+"px");
    
    
    function headerChg(target){
        $offer_header.text(target.text());
        var bgColor=target.css("background-color");
        $offer_header.css("background-color",bgColor);
    }

   //추가 방문 요청 함수
   function visit_headerChg($h_tit,$h_desc,target){
    $offer_h_tit.text($h_tit.text());
    $offer_h_desc.text($h_desc.text());
    var bgColor=target.css("background-color");
    $offer_header.css("background-color",bgColor);
    }

    //매물header
    var $offer_header=$(".all_offer.pick_offer>.header"),
    $pickOffer=$(".all_offer.pick_offer .offer_inner"),
    $items_f_header=$pickOffer.find(".header:first-of-type"),
    $items_header=$pickOffer.find(".header");
    
    var cal_num=120, bottom=192;

    //추가 방문 요청
    var $offer_h_tit=$offer_header.find(".h_tit"),
        $offer_h_desc=$offer_header.find(".h_desc"),
        $h_tit=$items_f_header.find(".h_tit"),
        $h_desc=$items_f_header.find(".h_desc");

    if($(".all_offer.pick_offer").hasClass("favor")==true){
        //추가 방문 요청일때만
        cal_num=0,bottom=134;
    }
    if($items_header.length){
        $pickOffer.scroll(function(){
            var sct=$pickOffer.scrollTop();
            $offer_header.css("display","block");
            $(".all_offer.pick_offer").css("bottom",bottom+"px");
            $items_header.each(function(i){
                var prevAll_items_h;
                
                var items_h=$(this).next().outerHeight();
                //해당 헤더 이전  전체 높이 값
                if(!i==0){
                    prevAll_items_h=0;
                    $(this).prevAll().each(function(i){
                        prevAll_items_h += $(this).outerHeight();
                    });
                    prevAll_items_h=prevAll_items_h-cal_num;
                }
                else{prevAll_items_h=0}

                var header_t=$(this).offset().top+prevAll_items_h;
                if(header_t<=sct){
                    //헤더변경
                    //아이템갯수가 한개 이상일때 헤더 변경
                    if(items_h>0){
                        if($(".all_offer.pick_offer").hasClass("favor")==true){
                            //추가 방문 요청일때만
                            $h_tit=$(this).find(".h_tit"),
                            $h_desc=$(this).find(".h_desc");
                            visit_headerChg($h_tit,$h_desc,$(this));
                        }else{ 
                            headerChg($(this));
                        }
                    
                    }//items_h>0
                   
                } else if(sct<60){
                    $offer_header.removeAttr("style");
                    $(".all_offer.pick_offer").removeAttr("style");
                }
            })
        });
        
    }
    //도움말
    $(".help_ico").click(function(){
        $(".select_area").removeClass("open");
        var $tooltipBox= $(this).next(".tooltip_box");
        if($tooltipBox.hasClass("open")){
            $tooltipBox.removeClass("open");
        }else{
            $tooltipBox.addClass("open");
        }
        return false;
    })
    
    $('html').click(function(e){  
        if(!$(e.target).hasClass("open")){
            $selectArea.removeClass("open");
            $(".tooltip_box").removeClass("open");
         } 
        
    });
    //필터

    $(".select_top.link_top").click(function(){
       var t=$(this);
       if(!t.parent().hasClass("active")){
            $(t.attr('href')).css('display','block').siblings('.layer_filter').css('display','none');
            $(t.attr('href')).addClass('active')
            $('.search_cover').addClass('active');
            //select_top의 필터 block
            $(this).parent().addClass('active');
            $(this).parent().siblings('.select_filter').removeClass('active');
       }else{
        lyaer_remove();
       }
        return false;
     })
    //필터 창 닫힘
    $("#header,.wrapper .search_cover").click(function(){ 
        if($(".layer_filter").hasClass("active")){
            lyaer_remove();
        }
    })
    $(".search_header").click(function(e){
        //console.log(e.target.className);
        if(!((e.target.className=='select_filter') || (e.target.className=='city_sub') || (e.target.className=='city')
        || (e.target.className=='offer_type') || (e.target.className=='deal_type') || (e.target.className=='reset')))
        { lyaer_remove();}
       
    })
    function lyaer_remove(){
        $(".wrapper .search_cover,.search_header .select_filter").removeClass("active")
        $("div[id^=layer_filter]").removeClass("active").css('display','none');
    }

    //1대1문의,일정관리 슬라이드
    var targetArea= $(".request_area,.sch_area");
    var speed=300;
    targetArea.hide();
    var cont_link= $(".custom_cont li a");

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
    $(".notice_area").find(cont_link).click(function(){
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


    //요청내역 슬라이드
    $(".detail_view .link_style").click(function() {
        var $DetailBox=$(this).parent().next(".detail_box");
        $DetailBox.slideToggle(speed);
        return false;
    });
    $(".agent_box .btn_close").click(function(){
        $(this).parent().slideUp(speed);
        return false;
    })
    //평점
        $('.star_grade span').on('click', function(){
        $(this).parent().children('span').removeClass('on');
        $(this).addClass('on').prevAll('span').addClass('on');
        return false;
    });
      
    //매물사진
    $(".layer_picture .close").click(function(){
        $(".layer_picture").removeClass("active");
    })
    var $gallery = $('.slide_container');
    var slideCount = null;
    $gallery.slick({
        dots: true,
        focusOnSelect: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		centerMode: true,
        variableWidth: false,
        swipe:false
      });
    
    var total=$(".slick-dots li").length;
    var $el = $('.slide-count-wrap').find('.total');
    $el.text(total);
    
    $gallery.on('init', function(event, slick){
        slideCount = slick.slideCount;
        setCurrentSlideNumber(slick.currentSlide);
    });
    $gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setCurrentSlideNumber(nextSlide);
    });
    function setCurrentSlideNumber(currentSlide) {
        var $el = $('.slide-count-wrap').find('.current');
        $el.text(currentSlide + 1);
    }
      
    //동영상
    $('.movie_tab li').click(function(){
        var idx=$(this).index();
        $('.movie_tab li').find('button').removeClass('on');
        $(this).find('button').addClass('on');
        $('.movie li').eq(idx).css('display','block').siblings().css('display','none');
    })
    $('.ad_movie .close').click(function(){
        $('.ad_movie').removeClass('active');
        $('body').removeClass('scroll_hidden');
    })
    
    //퀵
    $('.btn_top').click(function(){
        $('html, body').stop().animate({scrollTop: 0},800);
        return false;
    })

    //진행현황 리스트 슬라이드
    $('.content_present .present_manage li').click(function(){
        if(!$(this).hasClass('slide_open')){
            $(this).addClass('slide_open');
            $(this).find('.table_style3').slideDown();
        }else{
           $(this).removeClass('slide_open');
           $(this).find('.table_style3').slideUp();
        }
        return false;
    })
});
