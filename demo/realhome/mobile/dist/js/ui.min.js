$(document).ready(function(){
    //매물 상품swiper
    var swiper = new Swiper('.swiper_offer', {
        slidesPerView: 2,
       });
    var swiperFigure = new Swiper('.swiper_box .swiper_figure',{
        pagination: {
         el: '.pagination1',type: 'fraction',
        },
        
    });    
    
    //swiper
  var swiperMenu = new Swiper('.swiper_box .swiper_menu',{
        slidesPerView: 'auto',
        paginationClickable: true,
        freeMode: true,
        pagination: false
    });
    var $swiperMenu_li=$(".swiper_menu li");
    $swiperMenu_li.click(function(){
        var idx=$(this).index();
        swiperCon.slideTo(idx, 300);
        return false;
    });
    var tabLen = $swiperMenu_li.length;
    var swiperCon = new Swiper('.swiper_cont',{
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: false,
        loop: false,
        autoHeight:true,
        on: {
            slideChange(swiper) {
                var idx = this.activeIndex;
                $swiperMenu_li.removeClass("active").eq(idx).addClass("active");
                if(idx < tabLen){
                    swiperMenu.slideTo(idx, 300);
                }
            },
        },
    });

   
})