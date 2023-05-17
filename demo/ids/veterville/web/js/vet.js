//전체메뉴
var allMenu,allMenu_btn;
function allmenu_fnc(){
    // allMenu_btn = document.getElementById("all_menu_btn");
    // swtich(allMenu_btn);
    allMenu_btn= document.getElementsByClassName("all_menu_btn")[0];
    allMenu = document.getElementById("all_menu_box");
    swtich(allMenu_btn);
    swtich(allMenu);
}

function swtich(item){
  if(!item.classList.contains('active')){
      item.classList.add('active');
  }else{
      item.classList.remove('active');
  }   
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

//layer
var layer= document.getElementsByClassName("layer_pop")[0];
if (!(layer==null)){
    var layerH;
    layerH = layer.offsetHeight;
    var math_top = Math.ceil((window.innerHeight - layerH)/2);
    layer.style.top = math_top+"px";
}
//검색 탭
const tabList = document.querySelectorAll('.board_tab a');
const contents = document.querySelectorAll('.tab_content')
let activeCont = ''; 

for(var i = 0; i < tabList.length; i++){
  tabList[i].addEventListener('click', function(e){
    e.preventDefault();
    for(var j = 0; j < tabList.length; j++){
      tabList[j].classList.remove('on');
      contents[j].style.display = 'none';
    }
    this.classList.add('on');
    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}
function findParent(el, className){
  let check = el.parentNode.classList.contains(className);
  
  if(check === true){
     return el.parentNode;
  }else{
    return findParent(el.parentNode, className);
  }
}

function bindingTabEvent(wrap){
  let wrapEl = document.querySelectorAll(wrap);
  
  wrapEl.forEach(function(tabArea){
    let btn = tabArea.querySelectorAll('.btn_tab');
    
    btn.forEach(function(item){
      item.addEventListener('click', function(){
        let parent = findParent(this, 'tab_area');
        let idx = this.dataset['idx'];
        let depth = this.dataset['depth'];
        let btnArr = parent.querySelectorAll('.btn_tab[data-depth="'+ depth +'"]');
        let contentArr = parent.querySelectorAll('.content_area[data-depth="'+ depth +'"]');
        
        btnArr.forEach(function(btn){ btn.classList.remove('act'); });
        this.classList.add('act');
        contentArr.forEach(function(content){ content.classList.remove('act'); });
        parent.querySelector('.content_area[data-idx="'+ idx +'"][data-depth="'+ depth +'"]').classList.add('act');
      });
    });
  });
}

bindingTabEvent('.multi_tab_wrap');

//footerslide
var foo_notice_swiper = new Swiper(".vet_footer .notice_slide", {
    direction: 'vertical',
    slidesPerView: 1,
    simulateTouch:false,
    navigation: {
        nextEl: ".vet_footer .notice_btn .swiper-button-next",
        prevEl: ".vet_footer .notice_btn .swiper-button-prev",
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
