/* ========================================================
 MENU SCRIPT
 ======================================================== */

jQuery(document).ready(function($) {
	$('.sidenavi-btn').on('touchstart touchstart click', function(event) {
		event.stopPropagation();
		$('.sidenavi').toggleClass('sidenavi-open');
		$('.wrap').toggleClass('sidenavi-dark');
	});
	$(window).on('touchend click', function() {
		sidenavi_remove();
	});
	$('.sidenavi-close').on('touchend click', function() {
		sidenavi_remove();
	});
	$('.sidenavi').on('touchend click', function(event) {
		event.stopPropagation();
	});

	$(window).on("resize", function() {
		if ($(window).width() >= 1024) {
			sidenavi_remove(); 
		}
	});

	function sidenavi_remove() {
		$('.sidenavi').removeClass('sidenavi-open');
		$('.wrap').removeClass('sidenavi-dark');
	}

	/* search button */
	$('.search-menu').click(function(){
		$('.search-box').parent().toggleClass('open');
		$('.wrap').toggleClass('dark_bg');
	});
});