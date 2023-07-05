var oshopUI = oshopUI || {};
oshopUI = {
	// 탭 공통
	tab: function(options) {
		// Default Options
		var defaults = {
			"tabs" : $(".tab_type1 .link_tab"),
			"tabList" : $(".tab_type1 li"),
			"activeClass" : "on",
			"activeContents" : $(".tab_cate")
		};

		var options = $.extend(defaults, options)
			, buttons = options.tabList.find("a");
		buttons.on("click", function(e) {
			var btnHref = $(this).attr("href");
			$(options.tabList).removeClass(options.activeClass);
			$(options.activeContents).hide();
			$(this).parent(options.tabList).addClass(options.activeClass);
			$(btnHref).show();

			e.preventDefault();
		});
	},
	// 팝업 공통
	popUp: function(options) {
		// Default Options
		var defaults = {
			"clickBtn" : null,
			"popupLayer" : null,
			"Contents" : $(".cont_prod"),
			"callback" : null,
			"onClose": null
		};
		var options = $.extend(defaults, options)
			, thisLayer = options.popupLayer
			, buttons = options.clickBtn;

		buttons.on("click", function(e) {
			thisLayer.css("display","block");
			$(options.Contents).css("display","none");
			$(".footer").css("display","none"); // 2017-04-13 추가
			$(".contents+ .link_top").hide();
			if(typeof(options.callback) == "function") {
				options.callback();
			}
			e.preventDefault();
		});

		thisLayer.find(".btn_close").on("click",function(e) {
			thisLayer.css("display","none");
			$(options.Contents).css("display","block");
			$(".footer").css("display","block"); // 2017-04-13 추가
			$(".contents+ .link_top").show();
			buttons.focus();  // 2018-10-31 추가
			// 2020-01-31 추가[s]
			if(typeof(options.onClose) == "function") {
				options.onClose();
			}
			// 2020-01-31 추가[e]
			e.preventDefault();
		})
	},
	// 카테고리 리스트
	SlideToggle: function(options) {
		// Default Options
		var defaults = {
		"tabs" : $(".list_depth1 .link_depth1"),
		"tabList" : $(".list_depth1 li"),
		"activeClass" : "on",
		"activeContents" : $(".list_depth2")
		};
		var options = $.extend(defaults, options);
		$(options.tabs).on("click", function(e) {
			$(options.tabList).removeClass(options.activeClass);
			$(options.activeContents).hide();
			$(this).parent(options.tabList).addClass(options.activeClass);
			$(this).next(options.activeContents).show();
			e.preventDefault();
		});
	},
	// 파일박스 UI  파일첨부 추가 2017-09-15
	fileBoxThumbnail: function(options) {
		var file = document.querySelector('#getfile');
		file.onchange = function () {
	    var fileList = file.files ;
	    // 읽기
	    var reader = new FileReader();
	    reader.readAsDataURL(fileList [0]);
	    //로드 한 후
	    reader.onload = function  () {
       //썸네일 이미지 생성
        var tempImage = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
        tempImage.src = reader.result; //data-uri를 이미지 객체에 주입
        tempImage.onload = function() {
          //리사이즈를 위해 캔버스 객체 생성
          var canvas = document.createElement('canvas');
          var canvasContext = canvas.getContext("2d");
          //캔버스 크기 설정
          canvas.width = 60; //가로 60px
          canvas.height = 60; //세로 60px
          //이미지를 캔버스에 그리기
          canvasContext.drawImage(this, 0, 0, 60, 60);
          //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
          var dataURI = canvas.toDataURL("image/jpeg");
					var imgTag = "<img src='"+dataURI+"' alt ='' id='thumbnail'/> <a href='#none' class='btn_del ico_oshop ico_del'>삭제</a> ";
		 			$("#imgThumbnail").append(imgTag);

					$(".btn_del").click(function() {
						$(this).hide();
						$(this).siblings("#thumbnail").hide();
					})
	       };
		   };
		};
	},
	// 파일박스 UI
	fileBoxDesign: function(options) {
		// Default Options
		var defaults = {
			"target": null,
			"maxLength": "5",
			"deleteFunc": null,
			"callback": null
		};
		var options = $.extend(defaults, options)
			, $body = $("body")
			, fileBox = options.target
			, maxLength = options.maxLength
			, fileIdx = 1
			, currentFileNums = []
			, deleteBtn = options.target.find(".btn_delete");
		var len = fileBox.find(".aaa").length;
		for (var i = 1; i <= maxLength; i++) {
			if (i > len) {
				var html = "";
				html += '<div class="inner">';
				html += '<a href="#file" class="link_file" id="fileLink' + i + '" data-file-count="' + i + '">클릭해서 파일을 등록해주세요</a>';
				html += '<a href="#none" class="btn_delete" data-file-count="' + i + '">삭제</a>';
				html += '</div>';
				fileBox.append(html);
			};
      // 파일업로드 부분이므로 수정불가!!!!!! 업데이트시 확인요망!!!! (실서버 싱크 맞춤)
      // fileBox.append("<input type='file' id='fileList" + i + "' name='file[]' class='screen_out inp_file'>");
      fileBox.append("<input type='file' id='fileList" + i + "' name='upload' class='screen_out inp_file'>");
		};
		fileBox.on("click", ".link_file", function(e) {
			var fileIdx = $(this).attr("data-file-count");
			// input file click 이벤트 발생
			fileBox.find("#fileList" + fileIdx).trigger("click");
			// 기본 event 취소
			e.preventDefault();
		});
		// add file
		fileBox.on("change", ".inp_file", function() {
			var arrFileAddress = $(this).val().split("\\")
				, lastNum = arrFileAddress.length - 1;
			var attrId = $(this).attr("id");
			var idNum = attrId.split("fileList");
			var placeHolder = "클릭해서 파일을 등록해주세요";
			if (arrFileAddress[lastNum] !== "") {
				placeHolder = arrFileAddress[lastNum];
				fileBox.find("#fileLink" + idNum[1]).addClass("upload");
			} else {
				fileBox.find("#fileLink" + idNum[1]).removeClass("upload");
			};
			fileBox.find("#fileLink" + idNum[1]).html(placeHolder);
			// Callback Func
			if (typeof(options.callback) == "function") {
				options.callback();
			};
			// file 개수 증가
			currentFileNums.shift();
		});
		// delete file
		fileBox.on("click", ".btn_delete", function(e) {
			var fileNum = $(this).attr("data-file-count");
			// flle value 삭제
			fileBox.find("#fileLink" + fileNum).html("클릭해서 파일을 등록해주세요").removeClass("upload");
			fileBox.find("#fileList" + fileNum).val("");
			// file 개수 감소
			/*
			fileCount--;
			currentFileNums.unshift(fileNum);
			*/
			// Delete Callback Func
			if (typeof(options.deleteFunc) == "function") {
				options.deleteFunc(dataSeq);
			};
			// 기본 event 취소
			e.preventDefault();
		});
		return this;
	}
};

//2018-09-06추가
// 	var lastScrollTop = 0;
// $(document).on('touchstart click', function(e) {
// 	var st = $(this).scrollTop();
// 	if (st <= lastScrollTop){
// 		$("#wrapper").removeClass("scroll_motion");
// //			window.location="appscheme://controlbarOpen";
// 	}else{
// 		$("#wrapper").addClass("scroll_motion");// 스크롤 내릴때
// //			window.location="appscheme://controlbarClose";
// 	}
// 	lastScrollTop = st;
// });
//2018-09-11

var userAgent = window.navigator.userAgent;
if (/ZERO_APP_ANDROID/.test(userAgent) || /ZERO_APP_IOS/.test(userAgent)) {
	$(function () {
		var eventScrollCheck = false;
		var tPos = null;
		var touchPos = null;
		
		$(document).bind('touchstart', function (e) {
			var event = e.originalEvent;
			touchPos = event.touches[0].screenY;
		})
		$(document).bind('touchmove', function (e) {
			var event = e.originalEvent;
			tPos = event.touches[0].screenY
			if(tPos > touchPos){
				$("#wrapper").removeClass("scroll_motion");
				window.location="appscheme://controlbarOpen";
			}else{
				eventScrollCheck = false;
				$("#wrapper").addClass("scroll_motion");
				window.location="appscheme://controlbarClose";
			}
				var topMMM = $(window).scrollTop();
		})
	})
}
$(document).ready(function(){
	$(".link_top").on('click', function(e){
		e.preventDefault();
		$(window).scrollTop(0);
		$("#wrapper").removeClass("scroll_motion");
		window.location="appscheme://controlbarOpen";
	});

	// 2020-11-24 최근/관련 검색어 스크립트 추가
    var timer;
    $("#headNavi input[type='search']").on({
        'focus':function(e){
            if(e.target.value == ''){
                $(".search_keyword .recently").show();
                $(".search_keyword .matching").hide();
				$("#headNavi + .container").removeAttr('style');
				$('#headNavi .btn_reset').hide();
            }else {
                $(".search_keyword .recently").hide();
                $(".search_keyword .matching").show();
				$("#headNavi + .container").css({
					background:'#fff'
				});
				$('#headNavi .btn_reset').show();
            }
        },
        'focus keyup':function(e){
            if (!timer) {
                timer = setTimeout(function() {
                    timer = null;
                    $(".search_keyword").show();
                    
                    if(e.target.value == ''){
                        $(".search_keyword .recently").show();
						$(".search_keyword .matching").hide();
						$("#headNavi + .container").removeAttr('style');
						$('#headNavi .btn_reset').hide();
                    }else {
                        $(".search_keyword .recently").hide();
						$(".search_keyword .matching").show();
						$("#headNavi + .container").css({
							background:'#fff'
						});
						$('#headNavi .btn_reset').show();
                    }
                }, 300);
            }
        }
    });
})
//2018-09-11

// polifill 2021-04-12 추가
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}