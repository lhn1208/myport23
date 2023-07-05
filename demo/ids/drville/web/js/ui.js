var socialUI = socialUI || {};
socialUI = {
	// 레이어 위치 값 (css 로 width, height 필요)
	layerPos: function(obj){
		var nowTop = 0;
		var jObj = $(obj);
		var objW = jObj.width();
		var objH = jObj.height();
		var jObjTop = $(window).scrollTop();
		jObj.css({
			'top': jObjTop + parseFloat(($(window).height()-objH)/2),
			'margin-left': -parseFloat(objW/2)
		}).show();
		$(window).scroll(function() {
			jObj.css({
				'top': $(window).scrollTop() + parseFloat(($(window).height()-objH)/2)
			});
		});
	},
	// dimmed 레이어 열기
	openLayer: function(options){
		var defaults = {
			"lyName": null,
			"dimm": '#dimm'
		};
		var options = $.extend(defaults, options);
		socialUI.layerPos(options.lyName);
		$(options.dimm).fadeIn();
	},
	// dimmed 레이어 닫기
	closeLayer: function(options){
		var defaults = {
			"lyName": '#modalType1',
			"dimm": '#dimm'
		};
		var options = $.extend(defaults, options);
		$(options.dimm).fadeOut();
		$(options.lyName).fadeOut();
	},
	// 탭
	tab: function(options) {
		// Default Options
		var defaults = {
			"tabs": null,
			"activeClass": "on",
			"firstLoadTab": null,
			"callback": null
		};
		var options = $.extend(defaults, options);
		options.tabs.on("click.eventCustom", function(event) {
			var target = $(this).attr("href");
			$.each(options.tabs, function(i) {
				var targets = options.tabs.eq(i).attr("href");
				options.tabs.eq(i).parents().removeClass(options.activeClass);
				$(targets).hide();
			});
			$(target).show();
			$(this).parent().addClass(options.activeClass);
			// 기본 event 취소
			event.preventDefault() ? event.preventDefault() : event.returnValue = false;
			// 콜백 호출
			if ( typeof(options.callback) == "function" ) {
				options.callback.call( $(this) );
			};
		});
		// 기본 활성화 탭
		if (options.firstLoadTab !== null) {
			$(options.firstLoadTab).trigger("click.eventCustom");
		};
		return this;
	},
	//펼치기, 접기*/
	/* toggleBox: function(options) {
		// Default Options
		var defaults = {
			"cookie": "",
			"target": null,
			"button": null
		};
		var options = $.extend(defaults, options);
		var button = $(options.button);
		var $body = $("body");
		var showHide = $.cookie(options.cookie) || "show";

		var toggleButton = function(state) {
			if (state == "show") {
				button.text("접기")
					.removeClass("btn_show").addClass("btn_hide");
			} else {
				button.text("펼쳐보기")
					.removeClass("btn_hide").addClass("btn_show");
			};
		};

		$body.on("click", options.button, function() {
			if ( button.hasClass("btn_hide") ) {
				options.target.width(options.target.parent().width()).slideUp();
				$.cookie(options.cookie, 'hide');
				toggleButton("hide");
			} else {
				options.target.width(options.target.parent().width()).slideDown();
				$.cookie(options.cookie, 'show');
				toggleButton("show");
			};
		});

		if (showHide == "show") {
			options.target.show();
			toggleButton("show");
		} else {
			options.target.hide();
			toggleButton("hide");
		};

		return this;
	},
	// 스크롤링
	/*scroll: function(options) {
		var $doc = $(document)
			, $htmlBody = $("html, body");

		// Default Options
		var defaults = {
			"which": $htmlBody,
			"targetOrNumberY": null,
			"speed": 500
		};
				var options = $.extend(defaults, options);

		if ( typeof(options.targetOrNumberY) == "number") {
			options.which.stop();
			options.which.animate({
				"scrollTop": options.targetOrNumberY
			}, options.speed);
		} else {
			options.which.animate({
				"scrollTop": options.targetOrNumberY.offset().top - 100
			}, options.speed);
		};

		return this;
	},*/
	// 포토뷰어
	/*photoViewer: function(target) {
		target.find("ul li a").on("click", function() {
			var href = $(this).attr("href")
				, bigImg = target.find(".thumb_img img");

			bigImg.hide()
				.attr("src", href)
				.fadeIn();

			target.find("ul li").removeClass("on");
			$(this).parent().addClass("on");

			// 기본 event 취소
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		});

		hidocUI.slider( target.find(".wmu_slide"), {
			animation: 'slide',
			slideshow: false,
			slideToStart: 0,
			navigationControl: true,
			paginationControl: false,
			previousText: 'Previous',
			nextText: 'Next',
			slide: '.wmuSliderWrapper .slide_area'
		});
	},*/
	// 모달레이어
	modalLayer: function(target, options, option2) {
		var defaults = {
			"callback": null,
			"btnClass": [".btn_confirm",".btn_cancel"]
		};
		var option2 = $.extend(defaults, option2);
		var bPopup = target.bPopup(options, option2.callback);

		if(option2.btnClass !== null) {
			$.each(option2.btnClass, function(i){
					$(option2.btnClass[i]).on("click",function(){
					bPopup.close();
				})
			})
		}
		// 기본 event 취소
		event.preventDefault ? event.preventDefault() : event.returnValue = false;

		return bPopup;
	},
	// 모달레이어 공통
	modalLayerComm: function(options, callback) {
		var target = null;
		var bPopup = null;
		var $body = $("body");
		$body.on('keydown', function(e) {
			if (e.keyCode == 13 && $(".b-modal").size() !== 0) {
				target.find('.btn_confirm').trigger('click');
				return false;
			}
		});
		// 취소버튼
		$body.on("click." + options.eventCustom, '.btn_cancel', function(e) {
			// 콜백 함수 실행
			if (options.cancelFunc) {
				options.cancelFunc();
				// 팝업 닫기
				if (options.afterCancel == true) {
					bPopup.close();
					// 이벤트 해제
					$body.off("click." + options.eventCustom, ".btn_cancel");
				};
			} else {
				bPopup.close();
				// 이벤트 해제
				$body.off("click." + options.eventCustom, ".btn_cancel");
			};
		});

		if (options.type == "1") {
			target = $("#modalType1");
		} else if (options.type == "2") {
			target = $("#modalType2");
		} else if (options.type == "3") {
			target = $("#modalType3");
		} else if (options.type == "4") {
			target = $("#modalType4");
		} else if (options.type == "5") {
			target = $("#modalType5");
		}

		target.find(".tit_popup").html(options.title);
		target.find(".desc_inner").html(options.description);
		target.find(".submit").html(options.btn);
		target.find(".btn_confirm").html(options.confirmbtn);  // 2018-10-25 버튼명 수정 옵션 추가

		bPopup = target.bPopup({
			closeClass: "btn_close",
			onClose: function() {
				// 이벤트 해제
				$body.off("click." + options.eventCustom, ".btn_confirm");
			}
		}, callback);
		// 확인버튼
		$body.on("click." + options.eventCustom, '.btn_confirm', function(e) {
			// 팝업 닫기
			if (options.afterConfirm == true) {
				bPopup.close();
			};
			// 콜백 함수 실행
			if (options.confirmFunc) {
				options.confirmFunc();
			};
			/*	// 이벤트 해제
			$body.off("click." + options.eventCustom, ".btn_confirm");*/
			bPopup.close();
		});
		// 기본 event 취소
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		return bPopup;
	},
	// wmuSlider
	slider: function(target, options) {
		var wmuSlider = {};
		wmuSlider = target.wmuSlider(options);
		return wmuSlider;
	},
	// text count  레이어 닫기 2018-01-31 추가
	textCount: function(options){
		var defaults = {
			"textbox": null
		};
		var options = $.extend(defaults, options);
		var textbox = options.textbox;
		textbox.keyup(function (e){
			var content = $(this).val();
			var contentH = content.split('\n').length * 24;
			var textboxH = $(this).height();
			$(this).siblings().children('strong').html(content.length);
			if (textboxH < contentH ) {
				$(this).height(contentH);
			}
		});
	},
	// 파일박스 UI
	fileBoxDesign: function(options) {
		// Default Options
		var defaults = {
			"target": null,
			"type": "multi",
			"inpFileId": 1,  // 2018-09-05 추가
			"maxLength": 1,
			"filter": [],
			"maxSize": 100 * 1024 * 1024, //100M
			"inpFileName": "file[]",
			"deleteFunc": function () {
			},
		};
		var options = $.extend(defaults, options);
		// 변수
		var $body = $("body")
			, fileBox = options.target
			, maxLength = options.maxLength
			, inpFileId = options.inpFileId // 2018-09-05 추가
			, fileCount = 1
			, fileIdx = 1
			, currentFileNums = []
			, inpFileName = options.inpFileName
			, deleteBtn = options.target.find(".btn_delete");
 		// 2018-09-05 수정 및 주가
		if(options.type == "multi") {
			for (var i = 1; i <= maxLength; i++) {
				fileBox.append("<input type='file' id='fileList" + i + "' name='"+inpFileName+"'	class='inp_file'>");
			};
		}else	if(options.type == "basic") {
				fileBox.append("<input type='file' id='fileList" + inpFileId + "' name='"+inpFileName+"'	class='inp_file'>");
		}
		// 2020-06-11 추가
		else  if(options.type == "multi2") {
			for (var i = 1; i <= maxLength; i++) {
				fileBox.append("<input type='file' id='fileList" + i + "' name='"+inpFileName+"'	class='inp_file'>");
			};
		}

		 // 2018-09-05 수정 및 주가
		if (fileBox.find("ul li").length > 0 ) {
			fileCount = fileIdx = fileBox.find("ul li").length + 1;
		};
		while (fileIdx <= maxLength) {
			currentFileNums.push(fileIdx);
			fileIdx++;
		};
		// click
		fileBox.on("click", ".link_file", function(event) {
			if (options.type == "multi") { // 멀티 파일 업로드형
				if (fileCount <= maxLength) {
					fileBox.find("#fileList" + currentFileNums[0]).trigger("click");
				} else {
					alert(maxLength + "개 이상 첨부할 수 없습니다.");
				};
			} else if (options.type == "basic") { // 기본형
				fileBox.find(".inp_file").trigger("click");
			} else if (options.type == "multi2") { // 2020-06-11 추가
				if (fileCount <= maxLength) {
					fileBox.find("#fileList" + currentFileNums[0]).trigger("click");
				} else {
					alert(maxLength + "개 이상 첨부할 수 없습니다.");
				};
			} else {
				if (fileCount <= maxLength) {
					fileBox.find("#fileList" + currentFileNums[0]).trigger("click");
				} else {
					alert(maxLength + "개 이상 첨부할 수 없습니다.");

				};
			};
			// 기본 event 취소
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		});
		// 파일 사이즈 체크
		function getSize(target){
			if(!target.files){				//ie9일경우 activex 사용
				/*var myFSO = new ActiveXObject("Scripting.FileSystemObject");
				var filepath = target.value;
				var thefile = myFSO.getFile(filepath);
				var size = thefile.size;*/
				//var size = 1024;
				console.log("ie9" + size);
			}else{							// 다른브라우저일경우
				var size = target.files[0].size;
				console.log(size);
			}
			return size;					//파일 사이즈 반환
		}
		// add file
		fileBox.find(".inp_file").change(function() {
			var arrFileAddress = $(this).val().split("\\")
				, lastNum = arrFileAddress.length - 1;
			if( $(this).val() != "" ){
				var ext = $(this).val().split('.').pop().toLowerCase();
				// filter 가 있을 때
				if (options.filter.length > 0) {
					if ($.inArray(ext, options.filter) == -1) {
						alert( options.filter.join(",") + ' 파일만 업로드 할수 있습니다.');
						//$(this).replaceWith( $(this).clone(true) );
						$(this).val("");
						return false;
					};
				};

				// 파일 사이즈 2019-03-12
				var fileSize = getSize(this);
				//var fileSize = $(this)[0].files[0].size
				var transSize = "100MB";
				// file size 체크
				if (options.maxSize /1024/1024 > 1) {
					if (((options.maxSize / 1024/1024) / 1024) > 1) {
						transSize = (Math.round(((options.maxSize / 1024/1024) / 1024) * 100) / 100) + "GB";
					}else{
						transSize = (Math.round((options.maxSize / 1024/1024) * 100) / 100) + "MB"
					};
				} else {
					transSize = (Math.round(options.maxSize /1024 * 100) / 100) + "KB"
				};
				// max size가 있을때
				if (fileSize > options.maxSize){
					alert(transSize+ '를 초과하였습니다.' );
					//$(this).replaceWith($(this).clone(true));
					$(this).val("");
					return false;
				};
				if (options.type == "multi") { // 멀티 파일 업로드형
					fileBox.find("ul").append("<li><span class='txt_file_name' title='" + arrFileAddress[lastNum] + "'>" + arrFileAddress[lastNum] + "</span><a href='#none' data-file-count='" + fileCount + "' class='btn_comm btn_delete' title='첨부파일 삭제'>첨부파일 삭제</a></li>");
				} else if (options.type == "basic") { // 기본형
					fileBox.find(".txt_file_name").text(arrFileAddress[lastNum]);
				} else if (options.type == "multi2") { // 2020-06-11 추가
					fileBox.find(".txt_file_name").text(arrFileAddress[lastNum]);
					fileBox.find("ul").append("<li><span class='txt_file_name2' title='" + arrFileAddress[lastNum] + "'>" + arrFileAddress[lastNum] + "</span><a href='#none' data-file-count='" + fileCount + "' class='btn_comm btn_delete' title='첨부파일 삭제'>첨부파일 삭제</a></li>");
				};
				// file 개수 증가
				fileCount++;
				currentFileNums.shift();
				
				// add Callback Func  2019-09-27 추가
				if (typeof(options.addFunc) == "function") {
					options.addFunc();
				};
			};
		});
		// delete file
		// fileBox.on("click", ".btn_delete", function() {
		// 	var fileNum = $(this).attr("data-file-count");
		// 	var fileList = fileBox.find("#fileList" + fileNum);
		// 	// flle value 삭제
		// 	//fileBox.find("#file" + fileNum).val("");
		// 	//fileBox.find("#fileList" + fileNum).val("");
		// 	fileList.replaceWith( fileList.clone(true) );
		// 	// 첨부된 파일리스트 삭제
		// 	$(this).parent().remove();
		// 	// file 개수 감소
		// 	fileCount--;
		// 	currentFileNums.unshift(fileNum);
		// 	// Delete Callback Func
		// 	if (typeof(options.deleteFunc) == "function") {
		// 		options.deleteFunc(fileNum);
		// 	};
		// 	// 기본 event 취소
		// 	event.preventDefault ? event.preventDefault() : event.returnValue = false;
		// });
		// delete file
		fileBox.on("click", ".btn_delete, .btn_del_file", function() {

			var $this = $(this)
			, fileNum = $this.attr("data-file-count")
			, fileList = fileBox.find("#fileList" + fileNum)
			// 첨부된 파일리스트 삭제
			if($this.hasClass("btn_delete") == true) {

				$this.parent().remove();
			}else {
				$this.siblings(".link_file").find(".txt_file_name").html("");
			}
			// flle value 삭제
			fileList.val("");
			fileList.replaceWith(fileList.clone(true));
			// file 개수 감소
			fileCount--;
			currentFileNums.unshift(fileNum);
			// Delete Callback Func
			if (typeof(options.deleteFunc) == "function") {
				options.deleteFunc(fileNum);
			};
			// 기본 event 취소
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		});
		return this;
	},
	// 셀렉트박스 UI
	selectBoxDesign: function(options) {
		// Default Options
		var defaults = {
			"selectRoot": 'div.select_type1',
			"selectValue": 'div.select_type1 .sel_value',
			"selectInput": 'div.select_type1 > ul > li > input[type=radio]',
			"selectLabel": 'div.select_type1 > ul > li > label'
		};
				var options = $.extend(defaults, options);
				var $body = $("body");
		// Radio Default Value
		$(options.selectValue).each(function(){
			var default_value = "";
			$(this).next('ul').find("input:radio").each(function(i) {
				if ( $(this).is(":checked") ) {
					default_value = $(this).next('label').text();
				};
			});
			$(this).html(default_value);
		});
		// Line
		$body.on('focusin', options.selectInput, function(){
			$(this).parents(options.selectRoot).children(options.selectValue).addClass('outline');
		});
		$body.on('focusout', options.selectInput, function(){
			$(this).parents(options.selectRoot).children(options.selectValue).removeClass('outline');
		});
		// Show
		function show_option(){
			$(this).parents(options.selectRoot).first().toggleClass('open');
		}
		// Hover
		function i_hover(){
			$(this).parents('ul').first().children('li').removeClass('hover');
			$(this).parents('li').first().toggleClass('hover');
		}
		// Hide
		function hide_option(){
			var t = $(this);
			setTimeout(function(){
				t.parents(options.selectRoot).first().removeClass('open');
			}, 1);
		}
		// Set Input
		function set_label(){
			var v = $(this).next('label').text();
			$(this).parents('ul').first().prev(options.selectValue).text('').append(v);
			$(this).parents('ul').first().prev(options.selectValue).addClass('selected');
		}
		$body.on("click", options.selectValue, show_option);
		$(options.selectRoot).removeClass('open');
		$body.on("mouseleave", options.selectRoot, function(){
			$(this).removeClass('open');
		});
		$body.on("change", options.selectInput, set_label).on("focus", options.selectInput, set_label);
		$body.on("mouseenter", options.selectLabel, i_hover).on("click", options.selectLabel, hide_option);
		return this;
	},
	// 폰트 사이즈 조절
	/*fontSizeControl :function(options){
		// Default Options
		var defaults = {
			"buttons": null,
			"controlArea": null,
			"sizeCount": 3,
			"minSize": 1,
			"maxSize": 5
		};
		var options = $.extend(defaults, options);

		// 변수
		var buttons = options.buttons
			, controlArea = options.controlArea
			, sizeCount = options.sizeCount;
		controlArea.addClass("size" + options.sizeCount);
		buttons.on("click", function() {
			if($(this).hasClass("btn_plus")){
				if(options.sizeCount < options.maxSize){
					controlArea.removeClass("size" + options.sizeCount);
					options.sizeCount += 1;
				} else {
					alert("가장 큰 사이즈입니다.");
				}
			} else {
				if(options.sizeCount > options.minSize){
					controlArea.removeClass("size" + options.sizeCount);
					options.sizeCount -= 1;
				} else {
					alert("가장 작은 사이즈입니다.");
				}
			}
			controlArea.addClass("size" + options.sizeCount);

				// 기본 event 취소
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		})
	},*/
	// 툴팁
	/*toolTip : function(target, options){
		target.tooltip(options);
	},*/
	// FAQ 형태
	/*slideToggleGroup : function(options){
		// Default Options
		var defaults = {
			"itemList": null,
			"activeClass": "item_on",
			"firstLoadItem": null,
			"content": ".answer",
			"container": ".item"
		};
		var options = $.extend(defaults, options)
			, buttons = options.itemList.find("a");

		buttons.on("click", function(e) {
			if ( $(this).parents(options.container).hasClass(options.activeClass) ) {
				$(this).parents(options.container).removeClass(options.activeClass);
				$(this).parents(options.container).find(options.content).stop(true, true).slideUp();
			} else {
				$(options.container).removeClass(options.activeClass);
				$(this).parents(options.container).addClass(options.activeClass);
				options.itemList.find(options.content).stop(true, true).slideUp();
				$(this).parents(options.container).find(options.content).stop(true, true).slideDown();
			};

			// 기본 event 취소
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		});

		// 리스트 초기화
		if (options.firstLoadItem) {
			options.firstLoadItem.trigger("click");
		};
	},*/
	/*countNumber: function(options) {
		var defaults = {
			"start": 0,
			"end": null,
			"target": null,
			"easing": "easeOutQuad",
			"duration": 1000
		};
		var options = $.extend(defaults, options);
		var count = 0;

		$({countNum: options.start}).animate({countNum: options.end}, {
			duration: 1000,
			easing:'linear',
			step: function() {
				count = hidocUI.numberWithCommas( Math.floor(this.countNum) )
				options.target.text(count);
			},
			complete: function() {
				count = hidocUI.numberWithCommas(this.countNum)
				options.target.text(count);
			}
		});
	},*/
	// 배열에 저장된 date 삭제 기능
	/*deleteArrayValue: function (array, value) {
		$.each(array, function(i) {
			if (array[i] == value) {
				delete array[i];
				return false;
			};
		});
	},*/
	// comma, format
	/*numberWithCommas: function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},*/
	/*imgAlignCenter: function(options) {
		var defaults = {
			"start": 0,
			"end": null,
			"target": null,
			"easing": "easeOutQuad",
			"duration": 1000
		};
		var options = $.extend(defaults, options);
		var cropHeight = options.cropHeight;

		$.each($(options.target), function(i) {
			if ($(this).height() > cropHeight) {
				var mgTop = ($(this).height() - cropHeight) / 2;

				$(this).css("margin-top", "-" + mgTop + "px");
			};
		});
	}*/
	backgroundResize: function() {
		var windowH = $(window).height();
		$(".background").each(function(i){
			var path = $(this);
			// variables
			var contW = path.width();
			var contH = path.height();
			var imgW = path.attr("data-img-width");
			var imgH = path.attr("data-img-height");
			var ratio = imgW / imgH;
			// overflowing difference
			var diff = parseFloat(path.attr("data-diff"));
			diff = diff ? diff : 0;
			// remaining height to have fullscreen image only on parallax
			var remainingH = 0;
			if(path.hasClass("parallax")){
				var maxH = contH > windowH ? contH : windowH;
				remainingH = windowH - contH;
			}
			// set img values depending on cont
			imgH = contH + remainingH + diff;
			imgW = imgH * ratio;
			// fix when too large
			if(contW > imgW){
				imgW = contW;
				imgH = imgW / ratio;
			}
			//
			path.data("resized-imgW", imgW);
			path.data("resized-imgH", imgH);
			path.css("background-size", imgW + "px " + imgH + "px");
		});
	},
	// 롤링배너
	rollingBanner: function(options) {
		// Default Options
		var defaults = {
			"container": null,
			"containerInner": null,
			"items": null,
			"childrenHeight": 77,
			"cycle": 3000
		};
		var options = $.extend(defaults, options);

		// 노드 복제
		$(options.containerInner).append( $(options.items).first().clone() );

		var children = $(options.containerInner).children()
			, childrenLen = children.length
			, count = 0
			, calcHeight = 0
			, arrHeight = [];

		function move() {
			if (count < childrenLen - 1) {
				count++;

				setTimeout(move, options.cycle);

				$(options.containerInner).animate({
					"top": "-" + arrHeight[count] + "px"
				});
			} else {
				count = 0;

				setTimeout(move, 1);

				$(options.containerInner).css({
					"top": "0"
				});
			};
		};

		$.each(children, function(i) {
			arrHeight.push(calcHeight);
			calcHeight += options.childrenHeight;
		});

		setTimeout(move, options.cycle);
	},
	magazineInit : function(t){
		$('li', t).each(function(){
			var that = $(this);
			$(this).hover(function() {
				//in
				$('.mask', this).stop().animate({
						'backgroundPositionY':'-248px'
					},
					750, function() {
				});
				$('.mask .line', this).stop().animate({
					'left':0,
					'bottom':0,
					},
					300, function() {
				});
				$('.wrap_info', that).delay(150).stop().animate({
					'top':150,
					},
					300, function() {
					$('.etc_box', that).fadeIn('slow');
				});
			}, function() {
				$('.etc_box', that).fadeOut(100);
				$('.wrap_info', this).stop().animate({
					'top':178,
					},
					300, function() {
				});
				$('.mask .line', this).stop().animate({
					'left':-5,
					'bottom':-30,
					},
					300, function() {
				});
				$('.mask', this).stop().animate({
						'backgroundPositionY':'0'
					},
					750, function() {
						$('.etc_box', that).hide();
				});
			});
		});
	}
};


$(window).load(function() {
	/* 탑버튼 */
	$(window).on("scroll",function(){
		var btnTop = $(".btn_top"),
				scrollTop = $(window).scrollTop();
		if($("#footer").length == 1){
				var footPosition =  $("#footer").offset().top,
						maxY = scrollTop + $(window).height();
			if(scrollTop == 0) {
				btnTop.hide();
			}else {
				btnTop.show();
				if (footPosition > maxY) {
					btnTop.css({"bottom":10});
				}else {
				 	btnTop.css({"bottom": maxY - footPosition + 10});
				 }
			}
		}else{
			if(scrollTop == 0) {
				btnTop.hide();
			}else {
				btnTop.show();
			}
		}
	});

	$(".btn_top").on("click", function (e) {
		$("body, html").animate({"scrollTop" : 0},300);
		return false;
	})
	/*컨텐츠 리스트형 앨범형*/
	$('.content_top .list_set .opt').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.recomm_area .renew_cont_list').removeClass('on');	
		var href = $(this).attr('href');
		$($(this).attr("href")).addClass('on');
		return false; 
	})
});

$(window).on("load resize",function(e){
	var bodyH = $('body').outerHeight();
	var headerH = $('#wrap > #header').outerHeight();
	//var footerH = $('#wrap > #footer').outerHeight();
	//	bodyH	= bodyH - headerH - footerH;
		bodyH	= bodyH - headerH; // 2016-04-20 수정
	if( $("#wrap").hasClass("point")){ /* 2016-04-19 수정 */
	//	$("#wrap > #container").css("height", bodyH-50);
		$("#wrap > #container").css("height", bodyH); // 2016-04-20 수정
	}
	if( $("#wrap").hasClass("journal")){ /* 2017-03-29 수정 */
	//	$("#wrap > #container").css("height", bodyH-50);
		$("#wrap > #container").css("height", bodyH-163); // 2017-03-29 수정
	}
	// top 버튼 위치조정
	var	maxX = $(window).width();
	if (maxX < 1000){
		$(".btn_top").css({"left":"inherit","margin-left":0,"right":10});
	}else {
		$(".btn_top").css({"left":"50%","margin-left":500,"right":"inherit"});
	}
});


function layer_popup(el){
	$("body").addClass("body-modal-fix");


	var $el = $(el);
	var isDim = $el.prev().hasClass('dimBg');


	isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight /2,
			marginLeft: -$elWidth/2
		})
	} else {
		$el.css({top: 0, left: 0});
	}

	$el.find('.btn-layerClose').click(function(){
		isDim ? $('.dim-layer').fadeOut() : $el.fadeOut();
		$("body").removeClass('body-modal-fix');

		return false;
	});

	$('.dim-layer .dimBg').click(function(){
		$('.dim-layer').fadeOut();
		$("body").removeClass('body-modal-fix');

		return false;
	});

}