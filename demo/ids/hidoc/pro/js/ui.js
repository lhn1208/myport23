var hidocUI = hidocUI || {};

hidocUI = {
	init: function() {
		this.loadTimeOut = function() {};
		this.fileRegist = 0;
	},
	fileBoxDesign: function(options) {
		var defaults = {
			"target": null,
			"type": "multi",
			"maxLength": 1,
			"filter": [],
			"deleteFunc": function(){}
		};
		var options = extend(defaults, options);

		hidocUI.fileRegist += 1;

		var fileBox = options.target
			, maxLength = options.maxLength
			, fileCount = 1
			, fileIdx = 1
			, currentFileNums = [];


		var linkTarget = document.querySelectorAll(".link_file");


		for (var i = 0; i < linkTarget.length; i++) {
			// 파일첨부 버튼 data-count 추가
			linkTarget[i].setAttribute("data-count", hidocUI.fileRegist);

			//클릭
			linkTarget[i].onclick = function(e){
				console.log( "answerFile : " + answerFile + "/ fileIdx : " + fileIdx + "/ fileCount : " + fileCount);
				var count = this.getAttribute("data-count");
				var inputFile = document.getElementById("fileList" + count + "-" + currentFileNums[0]);
				if (options.type == "multi") { // 멀티 파일 업로드형
					if (fileCount <= maxLength) {
						console.log( "filecount : " + fileCount + "/ maxLength : " + maxLength )
						console.log( "get:" + inputFile );
						inputFile.click();
					} else {
						alert(maxLength + "개 이상 첨부할 수 없습니다.");
					};
				} else if (options.type == "basic") {  // 기본형
					//ie 8을 위하여
					var e = this.nextSibling;
					function nextESibling(){
						while(e && 1 !== e.nodeType)
							e = e.nextSibling;
						return e;
					}
					nextESibling();
					var singleInput = e.querySelectorAll(".inp_file");
					singleInput[0].click();

				};
				event.preventDefault ? event.preventDefault() : event.returnValue = false;

				//fileCount++;
				currentFileNums.shift();

			}
		}


		for(var i = 0; i < fileBox.length; i++) {
			var answerInput = fileBox[i].querySelectorAll('.answer_inp')[0];
			var fileDeleteBtn = fileBox[i].querySelectorAll('.btn_delete');
			var answerFile = fileBox[i].querySelectorAll('ul li').length; // ul length??

			for (var i = 1; i <= maxLength; i++) {
				answerInput.innerHTML += "<input type='file' id='fileList" + hidocUI.fileRegist + "-" + i + "' name='file[]' class='inp_file'>";
			};
			if (answerFile > 0 ) {
				fileCount = fileIdx = answerFile + 1;
			};
			while (fileIdx <= maxLength) {
				currentFileNums.push(fileIdx);
				fileIdx++;
			};


			for(var i = 0; i < fileDeleteBtn.length; i++){
				fileDeleteBtn[i].onclick = function(){
					console.log("삭제누름");
					var fileNum = this.getAttribute("data-file-count");
					var count = this.parentNode.parentNode.parentNode.querySelectorAll(".link_file")[0].getAttribute("data-count");

					for (var i = 0; i < answerInput.childNodes.length; i++){
						var fileList =  answerInput.childNodes[fileNum - 1];
						fileList.value = "";

						// 첨부된 파일리스트 삭제
						this.parentNode.remove();

						// file 개수 감소
						//fileCount--;
						currentFileNums.unshift(fileNum);

						// Delete Callback Func
						if (typeof(options.deleteFunc) == "function") {
							options.deleteFunc(fileNum);
						};
						// 기본 event 취소
						event.preventDefault ? event.preventDefault() : event.returnValue = false;
					}
				}
			}
		}

		var allFiles = document.querySelectorAll('.inp_file');
		for (var i = 0; i <= allFiles.length; i++){
			allFiles[i].onchange = function(){
				var arrFileAddress = this.value.split("\\")
					, lastNum = arrFileAddress.length - 1;
				if( this.value != "" ){
					var ext = this.value.split('.').pop().toLowerCase();

					// filter 가 있을 때
					if( options.filter.length > 0 ){						
						while (!options.filter.includes(ext)) {
							alert( options.filter.join(",") + ' 파일만 업로드 할수 있습니다.');
							return false;
							fileCount++;
						};
					}

					if (options.type == "multi") { // 멀티 파일 업로드형
						//ie 8을 위하여
						var e = this.parentNode.nextSibling;
						function nextEaSibling(){
							while(e && 1 !== e.nodeType)
								e = e.nextSibling;
							return e;
						}
						nextEaSibling();
						e.classList.add("get");
						var li = document.createElement("li");
						li.innerHTML = "<span class='txt_file_name' title='" + arrFileAddress[lastNum] + "'>" + arrFileAddress[lastNum] + "</span><a href='#none' data-file-count='" + fileCount + "' class='btn_comm btn_delete' title='첨부파일 삭제'>첨부파일 삭제</a></li>";
						fileCount++;
						e.appendChild(li);

					} else if (options.type == "basic") {  // 기본형
						var e = this.parentNode.parentNode.querySelectorAll('.inner .txt_file_name')[0];
						e.innerHTML = arrFileAddress[lastNum];
					};
				}

			}
		}

		return this;
	},
	modalLayer : function(options){
		var defaults = {
			"popId": null,
			"openBtn": null,
			"closeBtn": null,
			"callback": null
		};
		var options = extend(defaults, options);

		// 콜백 호출
		if ( typeof(options.callback) == "function" ) {
			options.callback.call( this );
		};

		function openModal() {
			/* 팝업 클릭 버튼 */			
			var modalWindow = document.getElementById(options.popId);		
			modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
		}

		function closeModal(){ 
			/* 팝업 닫기버튼 */
			var baseModalWindow = document.getElementById(options.popId);
			var closeButton = baseModalWindow.querySelectorAll('.pop_modal .btn_close');
			var closeButton2 = baseModalWindow.querySelectorAll( options.closeBtn );
			var closeOverlay = baseModalWindow.querySelectorAll('.overlay');
		
			/* 닫기버튼 onClick 이벤트 핸들러 설정 */
			for(var i = 0; i < closeButton.length; i++) {
				closeButton[i].addEventListener('click',function(){
					//var modalWindow = this.parentNode.parentNode.parentNode;
					var modalWindow = document.getElementById(options.popId);
					modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				});
			}
			/* 확인버튼 onClick 이벤트 핸들러 설정 */
			for(var i = 0; i < closeButton2.length; i++) {
				closeButton2[i].addEventListener('click',function(){
					var modalWindow = document.getElementById(options.popId);
					console.log(options.popId)
					modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				});
			}
			/* overlay onClick 이벤트 핸들러 설정 */
			for(var i = 0; i < closeOverlay.length; i++) {
				closeOverlay[i].addEventListener('click',function(){
					var modalWindow = document.getElementById(options.popId);		
					modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				});
			}
		
		}
		/* 핸들링 domready 이벤트 IE9+ */
		function ready(fn) {
			if (document.readyState != 'loading'){
				fn();
			} else {
				document.addEventListener('DOMContentLoaded', fn);
			}
		}
		
		/* Triggering modal window function after dom ready */
		ready(openModal);
		ready(closeModal);
	},
	// placeholder
	placeholder : function(){
		var inp  = document.querySelectorAll(".inp_g");
		for (var i =0; i<inp.length; i++) {
			inp[i].addEventListener("focus", function () {
				this.previousElementSibling.style.display = "none";
			});
			inp[i].addEventListener("blur", function () {
				if (this.value.length === 0 ) {
					this.previousElementSibling.style.display = "block";
				}
			});
		}
	},
	
	tab: function() {
		var tabWrap = document.querySelectorAll(".tab_wrap");
		// 에러처리
		if(tabWrap.length == 0){
			console.log("tab 요소 없음. error!!");
			return false;
		}

		// 탭 이벤트 함수
		this.openTab = function(event){
			var tabButtonName = this.getAttribute("data-target"); //클릭한 button 태그의 data-target 속성값 가져옴
			var tabContName = this.getAttribute("data-direct");
			var _childElement = this.parentNode.parentNode.children;

			// 리셋
			for(var i=0; i<_childElement.length; i++){
				_childElement[i].className = "";
				document.querySelectorAll("."+tabContName+">div")[i].style.display = "none";
			}
			// 선택된 탭버튼, 콘텐스 활성화
			document.getElementById(tabButtonName).style.display = "block";
			this.parentNode.className += " on";
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		}

		for(var j=0; j<tabWrap.length; j++){
			var childElement = tabWrap[j].querySelectorAll(".tab_button>li>a"); // 탭버튼
			var tabCont = tabWrap[j].querySelector(".tab_cont"); //탭 콘텐츠
			tabCont.className += " tabCont"+j;

			// 탭버튼에 이벤트 추가
			for(var i=0; i<childElement.length; i++){
				childElement[i].setAttribute("data-direct","tabCont"+j);
				childElement[i].addEventListener('click', this.openTab, false);

			}
		}
		return this;
	},
	// FAQ 형태
	slideToggleGroup : function(){
		// Default Options
		var toggleItem = document.querySelectorAll(".toggle_list>.item");
		var duration = 20;
		var interval, counter = 0;

		// 첫번째 요소 오픈
		var firstItem = document.querySelectorAll(".toggle_list>.item:first-child");
		for(var i=0; i<firstItem.length; i++){
			firstItem[i].className += " item_on";
		}

		// 슬라이드 이벤트 함수
		this.openToggle = function(event){
			var _parent = this.parentNode;
			var sliderOuter = this.querySelector(".item_cont");			//item_cont
			var sliderH = sliderOuter.children[0].offsetHeight;				//answer = height
			var adder = sliderH/10;

			if (this.className != 'item'){
				//close
				this.className = "item";
				counter = sliderH;
				interval = setInterval(function () {
					counter -= adder;
					if (counter > 0) {
						sliderOuter.style.height = counter + "px";
					} else {
						sliderOuter.style.height = 0;
						clearInterval(interval);
					}
				}, duration);
			}else {
				//open
				var openedSlider = _parent.querySelector(".item_on");
				if(openedSlider != null){
					var openedSlider_child = openedSlider.querySelector(".item_cont");
					openedSlider.className = "item";
				}
				this.className += " item_on";
				counter = 0;
				interval = setInterval(function () {
					counter += adder;
					if (counter < sliderH) {
						sliderOuter.style.height = counter + "px";
						if(openedSlider != null) {
							openedSlider_child.style.height = (openedSlider_child.offsetHeight - adder) + "px";
						}
					} else {
						sliderOuter.style.height = sliderH + "px";
						if(openedSlider != null) {
							openedSlider_child.style.height = 0;
						}
						clearInterval(interval);
					}
				}, duration);
			}
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		};

		for(var j=0; j<toggleItem.length; j++) {
			toggleItem[j].addEventListener('click', this.openToggle, false);
		}
	}
};
hidocUI.init();

var extend = function ( defaults, options ) {
	var extended = {};
	var prop;
	for (prop in defaults) {
		if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
			extended[prop] = defaults[prop];
		}
	}
	for (prop in options) {
		if (Object.prototype.hasOwnProperty.call(options, prop)) {
			extended[prop] = options[prop];
		}
	}
	return extended;
};
