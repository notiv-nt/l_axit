
// gebug
// [].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)});

function updateTabs(currentId) {

	var tabNav = $('.tab-nav'),
			tabsContent = $('.tabs-content'),
			current = currentId || tabNav.find('a:first-child').data('tab-id'),
			dataIdStr = '[data-tab-id="' + current + '"]';

	// hide all
	$('a', tabNav)
		.removeClass('active');

	$('.tab-item', tabsContent)
		.fadeOut(0);

	// show current
	$('.tab-item' + dataIdStr, tabsContent)
		.fadeIn(200);

	$('a' + dataIdStr, tabNav)
		.addClass('active');

}

function navToggle(action) {

	var $button = $('.toggle'),
			$nav = $('.main-nav');

	if ($button.hasClass('on') || action === 'hide') {

		$nav.removeClass('active');
		$button.removeClass('on');

	} else {

		$nav.addClass('active');
		$button.addClass('on');

	}

}


$(function() {

	$(window).scroll(function() {

		var $header = $('.main-header'),
				$banner = $('.banner'),
				$bannerHeight = $banner.outerHeight(),
				scrollTop = $(window).scrollTop();

		if (scrollTop > $bannerHeight) {
			!$header.hasClass('fixed') && $header.addClass('fixed');
		} else {
			$header.hasClass('fixed') && $header.removeClass('fixed');
		}

	})

	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	$('.tab-nav a').click(function(e) {

		e.preventDefault();

		updateTabs( $(this).attr('data-tab-id') );

	});

	$('.toggle').click(function(e) {

		e.preventDefault();

		navToggle();

	});

	$('.main-nav a').click(function() {

		if ($('.toggle').is(':visible'))
			navToggle('hide');

	});

	smoothScroll.init({
		speed: 300,
		updateURL: true,
		callback: function (toggle, anchor) {
			$('.main-nav a').removeClass('active');
			$('.main-nav a[href="' + anchor + '"]').addClass('active');
		}
	});

	updateTabs();

});

