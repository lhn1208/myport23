window.onload=function(){ 
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
  //about animation
  // const textItems=document.querySelectorAll('.text_ico_ev i');
  // textItems.forEach((item, i) => {
  //   let vh = i;
  //   item.style.setProperty('--vh', `${vh}`);
  //   i++;
  // });

  window.addEventListener('scroll',(e)=>{
    e.preventDefault();
    
    const scrollPos = docElement.scrollTop;
    function addAnimationOnScroll(elements, offset, animationClass) {
      const topOffset = offset - 700;
    
      if (scrollPos > topOffset) {
        for (let element of elements) {
          element.classList.add(animationClass);
          element.style.opacity = 1;
        }
      }
    }
    
    // portfolio section
    const portfolioSecTop = portfolioSec.offsetTop;
    if (scrollPos > portfolioSecTop - 500) {
      portfolioSec.classList.add('fadeInUp');
    }
    
    // skill section
    const skillSecTop = skillSec.offsetTop;
    addAnimationOnScroll(skill_items, skillSecTop, 'bounce');
    
    // about section
    const aboutSecTop = aboutSec.offsetTop;
    addAnimationOnScroll(about_items, aboutSecTop, 'bounceInLeft');
    
     //logo
     if(scrollPos>0){
      topBox.classList.add('fixed');
     }else{
      topBox.classList.remove('fixed');
     }
     //portfolio tab
     const portfTab=document.querySelectorAll('.portfolio_area .tab_menu li button'),
           portList=document.querySelectorAll('.portfolio>li');
     for(let pt of portfTab){
         pt.addEventListener('click', (e)=>{
            for(let ptEv of portfTab){
              ptEv.classList.remove('on');
            }
            e.currentTarget.classList.add('on');
            let targetClass=e.currentTarget.getAttribute('data-filter');
            let filteredList = document.querySelectorAll(`.portfolio>li.${targetClass}`);
            // console.log(targetClass);
            if(targetClass === 'all'){
              for(let pl of portList){
                pl.style.display = 'block';
              }
            }else{
              for(let pl of portList){
                pl.style.display = 'none';
              }
              //해당 필터로 클래스명 찾아block
              for(let fl of filteredList){
                fl.style.display = 'block';
              }
            }
            
         });//button
  
     }
  });
  
  //jquery
  $(document).ready(function(){
    // var $tab_li=$('.tab_menu li'),
    // $tab_button=$tab_li.find('button');
    //portfolio tab
    // $tab_button.click(function(){
    //   $tab_li.removeClass('on');
    //   $(this).parent().addClass('on');
    //   var category=$(this).data('category');
    //   if (category=="*"){
    //     $('.portfolio>li').css('display','block');
    //   }else{
    //     $('.portfolio>li').css('display','none');
    //     $(category).css('display','block')
    //   }
    // });
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
    $('.btn_close').click(function(){
      $('.popup').css('display','none');
    })
    $(window).scroll(function(){
      progressBar();
      quick();
    });
  
    
  })
  }