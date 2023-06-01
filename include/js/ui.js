
const docElement=document.documentElement,
      skipContent = document.querySelector('.quick_link'),
      mainContent=document.querySelector('#main'),
      portfolioSec=document.querySelector('.portfolio'),
      skillSec=document.querySelector('.content_skill'),
      skill_items=skillSec.querySelectorAll('.skill_list li .front'),
      aboutSec=document.querySelector('.content_about'),
      about_items=aboutSec.querySelectorAll('.about'),
      bottom_bt=document.querySelector('.bt_top'),
      topBox=document.querySelector('.top_fix'),
      topBoxHeight=topBox.offsetHeight;
let scrollPos, 
    mainContentOST = mainContent.offsetTop-100;


skipContent.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({left:0, top:mainContentOST, behavior:"smooth"})
});

bottom_bt.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({left:0, top:0, behavior:"smooth"})
});

window.addEventListener('scroll',(e)=>{
  e.preventDefault();
  scrollPos=docElement.scrollTop; //스크롤 양
  if(scrollPos>mainContentOST-300){
   portfolioSec.classList.add('fadeInUp');
  }
  let skillSecTop=skillSec.offsetTop;
  if(scrollPos>skillSecTop-500){
    for(let i=0; i<skill_items.length; i++){
      skill_items[i].classList.add('bounce');
      skill_items[i].style.opacity=1;
    }
   }
   let aboutSecTop=aboutSec.offsetTop;
   if(scrollPos>aboutSecTop-400){
      for(let i=0; i<about_items.length; i++){
        about_items[i].classList.add('bounceInLeft');
        about_items[i].style.opacity=1;
      }
   }
   //logo
   if(scrollPos>0){
    topBox.classList.add('fixed');
   }else{
    topBox.classList.remove('fixed');
   }

});

//tab
$(document).ready(function(){
  var $tab_li=$('.tab_menu li'),
  $tab_button=$tab_li.find('button');
  //portfolio tab
  $tab_button.click(function(){
    $tab_li.removeClass('on');
    $(this).parent().addClass('on');
    var category=$(this).data('category');
    if (category=="*"){
      $('.portfolio>li').css('display','block');
    }else{
      $('.portfolio>li').css('display','none');
      $(category).css('display','block')
    }
  });
  function progressBar(){
    var wins = $(this).scrollTop();
    var hei = $('.wrap').outerHeight(); //전체 페이지 높이
    var hei2 = $(window).outerHeight(); //윈도우의 높이
    var height = hei - hei2;
    var bar = (wins / height) * 100;
    $('#myBar').css('width', bar + '%');
  }
  //quick
  var $quick = $('.quick');
  var $quickItem = $quick.find('li');
  var $section = $('.main .sec');
  function quick(){
    var scT = $(window).scrollTop();
    var $port_top= $('.portfolio_area').offset().top;
    if (scT > $port_top)
      $quick.addClass('fixed');
    else
        $quick.removeClass('fixed');

     //section
     $section.each(function () {
        var idx = $(this).index()-1;
        var offst = $(this).offset().top -200; 
        if (offst <= scT) {
            $quickItem.eq(idx).addClass('on').siblings().removeClass('on');
        }
    });

    var second_sec = $('.content_skill').offset().top -200; 
    if (second_sec <= scT) {
        $quickItem.find('button').css('color','white');
    }else{
      $quickItem.find('button').css('color','black');
    }
  }
  $quickItem.click(function(e){
    e.preventDefault();
		var idx=$(this).index();
		$('html, body').stop().animate({
			'scrollTop': $section.eq(idx).offset().top
		}, 800);
	})
  $(window).scroll(function(){
    progressBar();
    quick();
  });

  
})
