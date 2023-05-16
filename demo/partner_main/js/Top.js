// menubar_cate_button
	var OldvisStr="";
		

	function MM_showHideLayers() { 
		var i, visStr, args, theObj;
		args = MM_showHideLayers.arguments;
		for (i=0; i<(args.length-2); i+=3) {
			visStr = args[i+2];
			if (navigator.appName == 'Netscape' && document.layers != null) {
				theObj = eval(args[i]);
				if(theObj) {
					if(OldvisStr)
						OldvisStr.style.visibility = 'hide';
					theObj.visibility = visStr;
					OldvisStr=theObj;
				}
			} else if (document.all != null) {
				if(visStr == 'show') {
					theObj = eval(args[i+1]);
					if(theObj)
					{
						if(OldvisStr)
							OldvisStr.style.visibility = 'hidden';
						theObj.style.visibility = 'visible';
						OldvisStr=theObj;
					}
				}
			}
		}
	}

	function active(direction) {
		imgOn = eval(direction+ "on.src");
		document[direction].src = imgOn;
	}

	function inactive(direction) {
		imgOff = eval(direction+ "off.src");
		document[direction].src = imgOff;
	}

	function img_act(imgName) {
		document[imgName].src = eval(imgName + "on.src");
	}

	function img_inact(imgName) {
		document[imgName].src = eval(imgName + "off.src");
	}

	function switchimage(this_obj,this_file,setstatus)
	{
			this_obj.src = this_file;
			window.status = setstatus;
	}




// 마우스 온-오프 시 이미지 변환
function preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.p) d.p=new Array();
    var i,j=d.p.length,a=preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.p[j]=new Image; d.p[j++].src=a[i];}}
}
function swapImgRestore() { //v3.0
  var i,x,a=document.sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function swapImage() { //v3.0
  var i,j=0,x,a=swapImage.arguments; document.sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=findObj(a[i]))!=null){document.sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function onTopMenu() {
	isOnTopMenu = true;
}

function outTopMenu() {
	isOnTopMenu = false;
	setTimeout("clearing()", 100);
}

function clearing() {
	if (isOnTopMenu == false) {
		swapImgRestore();
		clearSub();
		//selectSub("");
	}
}
	
function clearSub() {
	document.getElementById("menu_1").style.display = "none";
	document.getElementById("menu_2").style.display = "none";
	document.getElementById("menu_3").style.display = "none";
	document.getElementById("menu_4").style.display = "none";
	document.getElementById("menu_5").style.display = "none";
	document.getElementById("menu_6").style.display = "none";
	document.getElementById("menu_7").style.display = "none";
	document.getElementById("menu_8").style.display = "none";
	document.getElementById("menu_9").style.display = "none";
	document.getElementById("menu_10").style.display = "none";
	document.getElementById("menu_11").style.display = "none";
	document.getElementById("menu_12").style.display = "none";
			
}

function selectSub(target)  {
	isOnTopMenu = true;
	clearSub();
	if (target != "") {
		document.getElementById("menu_"+target).style.display = "block";
	}
	else {
		document.getElementById("menu_1").style.display = "block";
	}
}





  function FuncSwapImage(p_obj,p_url){
    p_obj.src = p_url;
  }
  
  function FuncLayer(p_value,p_num){ 
    eval("Layer" + p_num).style.visibility = p_value;
  }
  
  function FuncViewAll(p_name){
    strstyle = eval("p_name").style.visibility;
    if(strstyle == "hidden"){
      eval("p_name").style.visibility = "visible";
    }else{
      eval("p_name").style.visibility = "hidden";
    }
  }

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

//---------------- menu -------------//
function chg_topMenu(menu, target, max, type) {
	var i=0;
	for(i=0; i<max; i++)
	{
		var tmp_num = i+1;
		tmp_str1 = "smr"+menu+"_"+tmp_num;
		tmp_str2 = "d"+menu+"_"+tmp_num;
		if(target == tmp_num)
		{
			if(type==1)
			{
				document.getElementById(tmp_str1).src="/img/gnb/sub"+menu+"_menu"+tmp_num+"_on.gif";
			}
			else
			{
				document.getElementById(tmp_str1).src="/img/gnb/sub"+menu+"_menu"+tmp_num+".gif";
			}
			document.getElementById(tmp_str2).style.display = "block";
		}
		else
		{
			document.getElementById(tmp_str1).src="/img/gnb/sub"+menu+"_menu"+tmp_num+".gif";
			document.getElementById(tmp_str2).style.display = "none";
		}
	}
}

function Move(siteno, STL, Idx, Sub, SuperIdx, SSubIdx)
{
    try{parent.MoaFlashPop('');}catch (e) {}
    if(Sub != 0)
        location.href = "/Package/subMain.aspx?startLocation="+STL+"&MLoc=01&id=LOC"+Idx+"&siteno="+siteno;
    else if (SSubIdx != "")
        location.href = "/Package/List.aspx?startLocation="+STL+"&location=LOC"+Idx+"&location1=LOC"+Idx+"&location2=LOC"+SuperIdx+"&location3=LOC"+SSubIdx+"&theme=&theme1=&cost=&itinerary=&keyword=&MLoc=01&siteno="+siteno;
    else
        location.href = "/Package/List.aspx?startLocation="+STL+"&location=LOC"+Idx+"&location1=LOC"+Idx+"&location2=LOC"+SuperIdx+"&theme=&theme1=&cost=&itinerary=&keyword=&MLoc=01&siteno="+siteno;
}

function MoveTheme(siteno, STL, Idx, Sub, SuperIdx, SSubIdx)
{
    try{parent.MoaFlashPop('');}catch (e) {}
    if(Sub != 0)
        location.href = "/Package/subMain.aspx?startLocation="+STL+"&id=THE"+Idx+"&type="+Sub+"&MLoc=01&siteno="+siteno;
    else
        location.href = "/Package/List.aspx?startLocation="+STL+"&location=LOC"+Idx+"&location1=LOC"+Idx+"&location2=LOC"+SuperIdx+"&theme=THE"+SSubIdx+"&theme1=THE"+Idx+"&type=0&siteno="+siteno;
}

	
/*GNB리뉴얼 추가*/	
//서브 메뉴
$(document).ready(function(){
	$('.lnb_navi .menu_list>li').on('mouseenter', function(){
		$(this).children('.sub_nav_wrap').css('display','block');
		$(this).siblings().children('.sub_nav_wrap').css('display','none');
		//서브메뉴 마우스오버시 하위메뉴 첫번째 영역block
		$(this).find('.menu_list>li').eq(0).addClass('on');
		$(this).find('.sub_sub_wrap:first').css('display','block');		
	}).on('mouseleave', function(){
		$(this).children('.sub_nav_wrap').css('display','none')
	});
	//서브 하위 메뉴	
	$('.sub_menu_list .menu_list>li').on('mouseenter', function(){
		$(this).eq(0).removeClass('on').siblings().removeClass('on');
		$(this).children('.sub_sub_wrap').css('display','block');
		$(this).siblings().children('.sub_sub_wrap').css('display','none');
	}).on('mouseleave', function(){
		$(this).children('.sub_sub_wrap').css('display','none');
	});
	//핫키워드
	$('.hot_key li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
	});
	
	//전체메뉴
	$('.all_menu').click(function(){
		$(this).addClass('is-current');
		$('#container_map.main').css('display','block')
		$("#mainContainer").css('display','none');
	})
	$('.close_btn').click(function(){
		$('.all_menu').removeClass('is-current');
		$('#container_map.main').css('display','none')
		$("#mainContainer").css('display','block');
	})
 	$('.con_area:first, .areaList').show();
	$('.tab-lst').on('click', 'li a', function(){
		var $this = $(this);
		var i = $this.parent().index();
		$this.parent().addClass('on').siblings().removeClass();
		$this.closest('.tit_area, .lnb_area').siblings('.tab-wrap').children('div').hide().eq(i).show();
		return false;
	}).find('li a').eq(0).trigger('click');
});