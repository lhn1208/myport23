
//전체메뉴
var allMenu,allMenu_btn;
function allmenu_fnc(){
    allMenu_btn = document.getElementById("all_menu_btn");
    allMenu = document.getElementById("all_menu_box");
    swtich(allMenu_btn);
    swtich(allMenu);
}

function allmenu_close(){
    allMenu.classList.remove('active');
    allMenu_btn.classList.remove('active');
}

var drIntro = document.querySelectorAll(".dr_intro");
for (var i=0; i < drIntro.length; i++){
    drIntro[i].querySelector('.arr').addEventListener('click', function(e){
        if(!this.parentElement.classList.contains('active')){
            this.parentElement.classList.add('active');
        }else{
            this.parentElement.classList.remove('active');
        }   
        e.preventDefault();
    });
}

function swtich(item){
    if(!item.classList.contains('active')){
        item.classList.add('active');
    }else{
        item.classList.remove('active');
    }   
}
//slide
var swiper = new Swiper(".dr_intro_slide", {
    slidesPerView: 1,
    navigation: {
        nextEl: ".dr_intro_slide_wrap .swiper-button-next",
        prevEl: ".dr_intro_slide_wrap .swiper-button-prev",
    },
});


//layer
// var layer= document.getElementsByClassName("layer_pop")[0];
// if (!(layer==null)){
//     var layerH;
//     layerH = layer.offsetHeight;
//     var math_top = Math.ceil((window.innerHeight - layerH)/2);
//     layer.style.top = math_top+"px";
// }
//layer 열기
function click_ev(btn,pop){
    btn.addEventListener('click', function(e){
        e.preventDefault();
        pop.classList.add('on');
    });
}

//layer닫기
var layer_pop=document.querySelectorAll('.pop_dim');
for (var i=0; i < layer_pop.length; i++){
    layer_pop[i].querySelector('.pop_close').addEventListener('click', function(e){
        e.preventDefault();
        this.closest('.pop_dim').classList.remove('on');
    });
}


//검색 탭
const tabList = document.querySelectorAll('.board_tab a');
const contents = document.querySelectorAll('.seminar_content');
let activeCont = ''; // 현재 활성화 된 컨텐츠

for(var i = 0; i < tabList.length; i++){
  tabList[i].addEventListener('click', function(e){
    e.preventDefault();
    for(var j = 0; j < tabList.length; j++){
      // 나머지 버튼 클래스 제거
      tabList[j].classList.remove('on');
      // 나머지 컨텐츠 display:none 처리
      contents[j].style.display = 'none';
    }
    // 버튼 관련 이벤트
    this.classList.add('on');
    // 버튼 클릭시 컨텐츠 전환
    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}

//search
// var schInput = document.getElementById("sch_input");
// var schRecomm= document.getElementById("sch_recomm");
// schInput.addEventListener('focus', function(e){
//     schRecomm.classList.add('active');
// });
// schInput.addEventListener('focusout', function(e){
//     schRecomm.classList.remove('active');
// })


//footerslide
var foo_notice_swiper = new Swiper(".drv_footer .notice_slide", {
    slidesPerView: 1,
    simulateTouch:false,
    navigation: {
        nextEl: ".drv_footer .notice_btn .swiper-button-next",
        prevEl: ".drv_footer .notice_btn .swiper-button-prev",
    },
});

// footer
var familySite;
function family_fun(){
    familySite = document.getElementById("family_site");
    if(!familySite.classList.contains('active')){
        familySite.classList.add('active');
    }else{
        familySite.classList.remove('active');
    }   
}
