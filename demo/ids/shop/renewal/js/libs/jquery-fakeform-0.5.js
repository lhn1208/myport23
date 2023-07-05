/*
 * form 요소에 디자인을 입히기 위한 대체 스크립트
 * Alternate script for form elements
 * with jQuery
 * Info -
 * Demo -
 * License - http://creativecommons.org/licenses/by-sa/2.0/kr/
 */

(function($) {
    // 기본 옵션 설정
    var defaultoptions = {
        'select': {
            title: {
                tagname: 'span',
                innerhtml: '<strong></strong>',
                classname: {
                    base: 'select',
                    focus: 'selectbox_title_focus',
                    active: 'selectbox_title_active',
                    disabled: 'selectbox_title_disabled'
                },
                defaultwidth: 100
            },
            option: {
                tagname: 'div',
                classname: {
                    base: 'selectbox_option',
                    show: 'show',
                    upper: 'upper',
                    selected: 'selected',
                    disabled: 'disabled'
                },
                innerhtml: '<div class="scroll"></div>',
                position: -1,
                upperposition: 1,
                autowidth: true,
                zindex: 15,
                maxlength: 10

            },
            effect: {
                show: '',
                hide: ''
            },
            useinmobile: true

        }

    };

    'use strict';

    if (!$ || $.fn.fakeform) {
        return;
    };
    var
        ismobile = document.ontouchstart !== undefined,
        $win = $(window),
        $doc = $(document.documentElement),
        $body = null,
        checkisnumber = /^[0-9]+$/,
        indexdataname = 'data-fakeform-index',
        animator = 'animate', // $.fn._animate ? '_animate' : 'animate',
        boxsizingable = null;
    $.fn.fakeform = function(_option, value) {
        this.filter('select').fakeselect(_option, value);
        this.filter('input[type="radio"], input[type="checkbox"]').fakecheck(_option, value);
        // this.filter('textarea, input').not('[type="radio"], [type="checkbox"]').fakeplaceholder(_option, value);
        return this;
    };
    // select
    (function() {

        var
            $selects = [],
            $titles = [],
            $titleinners = [],
            $options = [],
            $optioninners = [],
            $optionitems = [],

            $focusedtitle = null,

            checkoptionnames = /^(reset|value|show|hide|remove|disable|enable)$/,
            checkeffectnames = /^(fade|slide|fade&slide)$/,

            options = [],
            displayed = [],
            displayedindex = -1,
            currentindex = -1,

            hidedataname = 'data-fakeselect-hide',
            widthdataname = 'data-option-width',
            lengthdataname = 'data-option-length',

            functions,

            anioption = {
                show: {duration: 175},
                hide: {duration: 100, complete: removeme}
            };
        $.fn.fakeselect = function(_option, value) {
            if (!_option || $.isPlainObject(_option)) {
                add(this, _option);
            } else if (typeof(_option) == 'string' && checkoptionnames.test(_option)) {
                this.each(function() {
                    functions[_option].call(this, value);
                    if (_option != 'reset') {
                        functions.reset.call(this);
                    }
                });
            }
            return this;
        }

        functions = {

            reset: function() {
                onselectchange.call(this, true);
            },

            value: function(_value) {
                this.value = _value;
            },

            show: function() {
                var index = getindex(this);
                $(this).show();
                if ($titles[index]) {
                    settitletext(index);
                    $titles[index].show();
                }
            },

            hide: function() {
                var index = getindex(this);
                $(this).hide();
                if ($titles[index]) {
                    $titles[index].hide();
                }
            },

            remove: function() {
                var index = getindex(this);
                if ($titles[index]) {
                    $titles[index].remove();
                    $options[index].remove();
                    $selects[index].removeAttr(indexdataname).css({position: '', left: ''});
                    $selects[index] = $titles[index] = $titleinners[index] = $options[index] = $optioninners[index] = $optionitems[index] = null;
                }
            },

            disable: function() {
                this.disabled = 'disabled';
            },

            enable: function() {
                this.removeAttribute('disabled');
            }

        };

        $doc.bind('keydown', keydownaction);
        $doc.bind('click', closeopenedoption);
        $win.bind('resize', closeopenedoption);


        function add(_$selects, _option) {

            var defaultclass,
                currentoptions,
                i = 0, max = _$selects.length;

            setbody();

            for (; i < max; i++) {

                if (checkisnumber.test(_$selects[i].getAttribute(indexdataname))) {
                    $(_$selects[i]).fakeselect('reset');
                    continue;
                }

                defaultclass = _$selects[i].className;

                currentindex++;

                currentoptions = options[currentindex] = overrideoption('select', _option);

                if (ismobile && !currentoptions.useinmobile) {
                    continue;
                }

                $selects[currentindex] = $(_$selects[i]).attr(indexdataname, currentindex)
                    .css({position: 'absolute', left: '-999em'})
                    .change(onselectchange)
                    .focus(onselectfocus)
                    .blur(onselectblur);

                $titles[currentindex] = $('<'+ currentoptions.title.tagname +' class="'+ currentoptions.title.classname.base + '" '+ indexdataname +'="'+ currentindex +'" />')
                    .html(currentoptions.title.innerhtml)
                    .bind('mouseover mousemove mouseout mousedown mouseup mouseenter mouseleave', selectactiontotitle)
                    .click(ontitleclick)
                    .insertBefore($selects[currentindex]);

                if ($selects[currentindex].css('display') == 'none') {
                    $titles[currentindex].hide();
                }

                currentoptions.title.widthminus = getinfluencewidthvalue($titles[currentindex]);

                $titleinners[currentindex] = getdeepestchild($titles[currentindex]);

                $selects[currentindex].insertBefore($titles[currentindex]);
                $titles[currentindex].before(' ');

                $options[currentindex] = $('<'+ currentoptions.option.tagname +' class="'+ currentoptions.option.classname.base +'" '+ widthdataname +'="'+ ($selects[currentindex].attr(widthdataname) || (currentoptions.option.autowidth ? 'auto' : 0)) +'" '+ lengthdataname +'="'+ ($selects[currentindex].attr(lengthdataname) || currentoptions.option.maxlength) +'" />')
                    .css({position: 'absolute', zIndex: currentoptions.option.zindex})
                    .html(currentoptions.option.innerhtml);
                $optioninners[currentindex] = getdeepestchild($options[currentindex]);

                if (defaultclass) {
                    $titles[currentindex].addClass(defaultclass);
                    $options[currentindex].addClass(defaultclass);
                }

                $selects[currentindex].removeAttr(widthdataname).removeAttr(lengthdataname);

                settitletext(currentindex, true);
                checkdisabled($selects[currentindex][0]);
                checkreadonly($selects[currentindex][0]);

            }

        }

        function onselectchange(fromreset) {
            var index = getindex(this);
            if (checkisnumber.test(index)) {
                checkdisabled(this);
                checkreadonly(this);
                settitletext(index, fromreset === true);
            }
        }

        function setselected(index, selectedindex) {
            $selects[index][0].options[selectedindex].selected = 'selected';
            $selects[index].change();
        }

        function onselectfocus(e) {
            var index = getindex(this);
            if ($titles[index]) {
                $titles[index].addClass(options[index].title.classname.focus);
                $focusedtitle = $titles[index];
            }
        }

        function onselectblur(e) {
            var index = getindex(this);
            if ($titles[index]) {
                $titles[index].removeClass(options[index].title.classname.focus);
            }
            $focusedtitle = null;
        }

        function selectactiontotitle(e) {
            var index = getindex(this);
            $selects[index][e.type]();
        }

        function keydownaction(e) {
            var keycode = e.keyCode,
                index, selectoptions, selectedindex, newindex;
            if (keycode == 32) { // toggle open/close
                if ($focusedtitle) {
                    $focusedtitle.click();
                    return false;
                } else if (displayedindex > -1) {
                    closeopenedoption();
                    return false;
                }
            } else if (keycode == 38 || keycode == 40) {
                index = displayedindex > -1 ? displayedindex : $focusedtitle ? getindex($focusedtitle) : -1;
                if (index > -1 && !$selects[index][0].getAttribute('readonly')) {
                    selectoptions = $selects[index][0].options;
                    selectedindex = newindex = selectoptions.selectedIndex;
                    if (keycode == 38 && selectedindex > 0) {
                        newindex = selectedindex-1;
                        while(newindex > -1 && (amidisabled(selectoptions[newindex]) || selectoptions[newindex].getAttribute(hidedataname))) {
                            newindex--;
                        }
                    } else if (keycode == 40 && selectoptions.length-1 > selectedindex) {
                        newindex = selectedindex+1;
                        while(selectoptions.length > newindex && (amidisabled(selectoptions[newindex]) || selectoptions[newindex].getAttribute(hidedataname))) {
                            newindex++;
                        }
                    }
                    if (newindex != selectedindex && selectoptions[newindex]) {
                        setselected(index, newindex);
                        if (displayedindex > -1) {
                            $optioninners[index].find('span').removeClass(options[index].option.classname.selected)
                            setselectedoptionvisible(index, selectoptions.selectedIndex);
                        }
                    }
                    return false;
                }
            } else if (keycode == 9 || keycode == 13 || keycode == 27) {
                closeopenedoption();
            }
        }

        function ontitleclick(e) {

            var index = getindex(this);

            if ($selects[index][0].disabled || $selects[index][0].getAttribute('readonly')) {
                return false;
            }

            if (displayed[index]) {
                optionclose(index);
                return false;
            }

            if (!$options[index][0].offsetWidth) {
                addoptionlayer(index);
            }

            $selects[index].click();

            optionshow(index);

            return false;

        }

        function optionshow(index) {

            var $currentoption = $options[index],
                effect = options[index].effect.show,
                height = $currentoption[0].clientHeight,
                animateto;

            $currentoption.css('height', '').stop(true);

            if (checkeffectnames.test(effect)) {
                $currentoption.css('visibility', 'visible');
                if (effect == 'fade') {
                    animateto = {opacity: 1};
                    $currentoption.css({height: height, opacity: 0});
                } else if (effect == 'slide') {
                    animateto = {height: height};
                    $currentoption.css({height: 0, opacity: 1});
                } else if (effect == 'fade&slide') {
                    animateto = {height: height, opacity: 1};
                    $currentoption.css({height: 0, opacity: 0});
                }
                if ($currentoption.hasClass(options[index].option.classname.upper) &&
                    (effect == 'slide' || effect == 'fade&slide')) {
                    animateto.top = parseInt($currentoption.css('top'));
                    $currentoption.css('top', animateto.top+height);
                }
                $currentoption[animator](animateto, anioption.show);
            } else {
                $currentoption.css({height: height, visibility: 'visible'});
                if (typeof(effect) == 'function') {
                    effect.call($currentoption);
                }
            }

            displayedindex = index;
            displayed[index] = true;
            $titles[index].addClass(options[index].title.classname.active);

        }

        function optionclose(index) {
            var $currentoption = $options[index].stop(true),
                effect = options[index].effect.hide || options[index].effect.show,
                animateto;
            if (checkeffectnames.test(effect)) {
                if (effect == 'fade') {
                    animateto = {opacity: 0};
                } else if (effect == 'slide') {
                    animateto = {height: 1};
                } else if (effect == 'fade&slide') {
                    animateto = {height: 0, opacity: 0}
                }
                if ($currentoption.hasClass(options[index].option.classname.upper) &&
                    (effect == 'slide' || effect == 'fade&slide')) {
                    animateto.top = $currentoption[0].offsetTop+$currentoption[0].offsetHeight;
                }
                $currentoption[animator](animateto, anioption.hide);
            } else if (typeof(effect) == 'function') {
                effect.call($currentoption);
            } else {
                $currentoption.detach();
            }
            displayedindex = -1;
            displayed[index] = false;
            $titles[index].removeClass(options[index].title.classname.active);
            !ismobile && $selects[index].focus();
        }

        function closeopenedoption() {
            if (displayedindex > -1 && displayed[displayedindex]) {
                optionclose(displayedindex);
            }
        }

        function getinfluencewidthvalue($target) {
            return (boxsizingable && $target.css('boxSizing') == 'border-box')? 0 : (parseInt($target.css('borderLeftWidth')) || 0) + (parseInt($target.css('borderRightWidth')) || 0) + parseInt($target.css('paddingLeft')) + parseInt($target.css('paddingRight'));
        }

        function addoptionlayer(index) {

            var
                $currentoption = $options[index],
                selectedindex = $selects[index][0].options.selectedIndex,
                docwidth = $doc[0].clientWidth,
                docheight = $doc[0].clientHeight,
                scrollleft = $win.scrollLeft(),
                scrolltop = $win.scrollTop(),
                bounding = $titles[index][0].getBoundingClientRect(),
                titlewidth = $titles[index][0].offsetWidth,
                titleheight = $titles[index][0].offsetHeight,
                width = $currentoption.attr(widthdataname),
                height,
                left = bounding.left+scrollleft-$doc[0].clientLeft,
                top = bounding.top+scrolltop-$doc[0].clientTop,
                maxlength = parseInt($currentoption.attr(lengthdataname)),
                optionsizes;


            setoptions(index);
            $currentoption.css({width: '', visibility: 'hidden'}).appendTo($body);

            width = Math.max(titlewidth, width == 'auto' ? $currentoption[0].offsetWidth : parseInt(width));

            if (options[index].option.widthminus === undefined) {
                options[index].option.widthminus = getinfluencewidthvalue($currentoption);
            }

            // $currentoption.css('width', width);
            if (maxlength >= $optionitems[index].length) {
                $currentoption.css({height: '', overflow: 'hidden'});
            } else {
                $currentoption.css('overflow', '').css('height', getoptionheight(index, selectedindex, maxlength));
            }

            height = $currentoption[0].offsetHeight;

            // check upper|lower position
            if (top+titleheight+height > docheight+scrolltop) {
                top = top-height+options[index].option.upperposition;
                $currentoption.addClass(options[index].option.classname.upper);
            } else {
                top = top+titleheight+options[index].option.position;
                $currentoption.removeClass(options[index].option.classname.upper);
            }

            if (width > titlewidth && left+width > docwidth+scrollleft) {
                left -= width-titlewidth;
            }

            $currentoption.css({
                left: Math.max(0, left),
                top: top,
                width: width-options[index].option.widthminus
            });

            setselectedoptionvisible(index, selectedindex);

        }

        function getoptionheight(index, selectedindex, maxlength) {
            var $currentoptionitems = $optionitems[index],
                numoptions = $currentoptionitems.length,
                heights = 0, itemheight, i = 0, max, j = 0;
            for (; i < numoptions; i++) {
                if ($currentoptionitems[i].nodeName.toLowerCase() == 'span') {
                    if (j == selectedindex) {
                        i = Math.max(0, Math.min(i, numoptions-maxlength));
                        max = Math.min(i+maxlength, numoptions);
                        break;
                    }
                    j++;
                }
            }
            for (; i < max; i++) {
                itemheight = $currentoptionitems[i].offsetHeight;
                if (!itemheight) {
                    i--;
                    continue;
                }
                heights += itemheight;
            }
            return heights;
        }

        function setselectedoptionvisible(index, selectedindex) {

            var $currentoption = $options[index],
                $selectedoption = $optioninners[index].find('span').eq(selectedindex);

            $selectedoption.addClass(options[index].option.classname.selected);

            if (0 > $selectedoption[0].offsetTop-$currentoption[0].scrollTop) {
                $currentoption[0].scrollTop = $selectedoption[0].offsetTop;
            } else if ($selectedoption[0].offsetTop+$selectedoption[0].offsetHeight > $currentoption[0].offsetHeight+$currentoption[0].scrollTop) {
                $currentoption[0].scrollTop = $selectedoption[0].offsetTop+$selectedoption[0].offsetHeight-$currentoption[0].offsetHeight;
            }

        }

        function setoptions(index) {

            var selectedindex = $selects[index][0].options.selectedIndex,
                optionsoption = options[index].option,
                html = [];

            if (optionsoption.tagname.toLowerCase() != 'ul') {
                html = ['<ul>'];
            }
            html.push(getoptionhtml($selects[index]));
            if (optionsoption.tagname.toLowerCase() != 'ul') {
                html.push('</ul>');
            }
            $optioninners[index].html(html.join(''));

            $optioninners[index].find('span').each(function(i) {
                this.onclick = (function(index, i) {
                    return function(e) {
                        return onoptionclick(e, index, i);
                    }
                })(index, i);
            });
            $optioninners[index].find('strong').click(stoppropagation);

            $optionitems[index] = $optioninners[index].find('strong, span');

        }

        function getoptionhtml($parent) {
            var $children = $parent.children('option, optgroup'),
                html = [], i = 0, max = $children.length;
            for (; i < max; i++) {
                html.push('<li');
                if ($children[i].disabled) {
                    html.push(' class="disabled"');
                }
                if ($children[i].getAttribute(hidedataname)) {
                    html.push(' style="display:none;"');
                }
                html.push('>');
                if ($children[i].nodeName.toLowerCase() == 'optgroup') {
                    html.push('<strong class="', $children[i].className, '">', $children[i].label, '</strong>');
                    html.push('<ul>');
                    html.push(getoptionhtml($($children[i])));
                    html.push('</ul>');
                } else {
                    html.push('<span class="', $children[i].className, '">', $children[i].innerHTML, '</span>');
                }
                html.push('</li>');
            }
            return html.join('');
        }

        function onoptionclick(e, index, optionindex) {
            if (amidisabled($selects[index][0].options[optionindex])) {
                stoppropagation(e);
                return false;
            }
            setselected(index, optionindex);
            return false;
        }

        function stoppropagation(e) {
            e.stopPropagation();
        }

        function amidisabled(target) {
            while(target.nodeName.toLowerCase() != 'select') {
                if (target.disabled) {
                    return true;
                }
                target = target.parentNode;
            }
            return false;
        }

        function settitletext(index, withwidth) {
            var $select, currentoptions;
            if ($titles[index]) {
                $select = $selects[index];
                currentoptions = $select[0].options;
                $titleinners[index].html((currentoptions.length)? currentoptions[currentoptions.selectedIndex].text.replace(/</g, '&lt;') : '');
                if (withwidth) {
                    $titles[index].css('width', ($select[0].offsetWidth || getcsswidth($select[0]) || options[index].title.defaultwidth) - options[index].title.widthminus);
                }
            }
        }

        function getcsswidth(select) {
            var property = 'width',
                value = (select.currentStyle)? select.currentStyle[property] : document.defaultView.getComputedStyle(select, null)[property];
            return parseInt(value) || 0;
        }

        function checkdisabled(select) {
            var index = getindex(select);
            if ($titles[index]) {
                $titles[index][(select.disabled)? 'addClass' : 'removeClass'](options[index].title.classname.disabled);
            }
        }

        function checkreadonly(select) {
            var index = getindex(select);
            if ($titles[index]) {
                $titles[index][(select.getAttribute('readonly'))? 'addClass' : 'removeClass'](options[index].title.classname.readonly);
            }
        }

        function getdeepestchild($target) {
            while ($target.children().length) {
                $target = $target.children().eq(0);
            }
            return $target;
        }

    })();


    function removeme() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    }

    function getindex(target) {
        return parseInt((target.fakeform ? target[0] : target).getAttribute(indexdataname));
    }

    function overrideoption(flag, _option) {
        var key, inkey, defaultoption = defaultoptions[flag];
        if (!_option) {
            return defaultoption;
        }
        for (key in defaultoption) {
            if (typeof(defaultoption[key]) == 'string') {
                if (_option[key] === undefined) {
                    _option[key] = _option[key] || defaultoption[key];
                }
            } else {
                _option[key] = _option[key] || {};
                for (inkey in defaultoption[key]) {
                    if (_option[key][inkey] === undefined) {
                        _option[key][inkey] = defaultoption[key][inkey];
                    }
                }
            }
        }
        return _option;
    }

    function setbody() {
        if (!$body) {
            $body = $('<div style="width:100px;border:1px solid #fff;box-sizing:border-box;" />').appendTo(document.body);
            boxsizingable = $body[0].offsetWidth == 100;
            $body.remove();
            $body = $(document.body);
        }
    }

})(window.jQuery);