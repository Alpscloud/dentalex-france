$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);
	});


	// Popup
	$('.js-open-popup-form-btn').on('click',function(e) {
		e.preventDefault();
		if ($(this).attr('data-title')) {
			var theme = "Принять участие. Пакет: " + $(this).attr('data-title');

			$('.js-popup-form input[name=form_subject]').val(theme);
		}

		$('.js-popup-form').fadeIn(300);
		$('html').addClass('is-fixed');
	});


	$('.js-close-popup-btn').on('click',function(e) {
		e.preventDefault();
		$(this).parents('.js-popup').fadeOut(300);
		$('html').removeClass('is-fixed');
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});


	// Smooth scrolling
	var headerHeight = $('.header').innerHeight();





	$('.js-smooth-scroll-link').on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
		top = $(id).offset().top - headerHeight;

		if($('.js-open-mobile-menu-btn').hasClass('is-active')) {
			$('.js-open-mobile-menu-btn').removeClass('is-active');
			$('.js-nav').stop().slideUp(150);

		}

		$('html, body').animate({scrollTop: top}, 'slow');
	});	


	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$('.js-nav').addClass('is-opened');
		$('html').addClass('is-fixed');
	});


	$('.js-close-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$('.js-nav').removeClass('is-opened');
		$('html').removeClass('is-fixed');
	});



	if (html < 1100) {



		$(window).on('scroll', function(e) {
			if ($(this).scrollTop() > 0) {
				$('.header').addClass('is-fixed');
			} else {
				$('.header').removeClass('is-fixed');
			}
		});


	}


	$(window).on('scroll', function(e) {

		var scroll = $(this).scrollTop();

		var speed = 0.1;

		$('.ola').css({
			'transform': 'translate3d(0, ' + -(scroll*speed)+'px' + ', 0)',
			'-moz-transform': 'translate3d(0, ' + -(scroll*speed)+'px' + ', 0)',
			'-ms-transform': 'translate3d(0, ' + -(scroll*speed)+'px' + ', 0)',
			'-o-transform': 'translate3d(0, ' + -(scroll*speed)+'px' + ', 0)',
			'-webkit-transform': 'translate3d(0, ' + -(scroll*speed)+'px' + ', 0)'
			
		});

	});


	var speakerSliderInit = $('.js-speaker-slider');

	if (speakerSliderInit.length > 0) {

		speakerSliderInit.each(function() {

			

			var speakerSlider = new Swiper(this, {
				slidesPerView: 'auto',
				spaceBetween: 20,
				loop: true,
				speed: 600,
				navigation: {
					nextEl: this.parentNode.querySelector('.js-speaker-slider-btn-next'),
					prevEl: this.parentNode.querySelector('.js-speaker-slider-btn-prev'),
				},

				breakpoints: {
					440: {
						slidesPerView: 'auto',
						spaceBetween: 30,
					},
					1100: {
						slidesPerView: 'auto',
						spaceBetween: 65,
					},
					1921: {
						slidesPerView: 3,
						spaceBetween: 65
					},
					
				}
			});

		});

	}


	

	var congressGallerySliderInit = $('.js-congress-gallery-slider');

	if (congressGallerySliderInit.length > 0) {

		congressGallerySliderInit.each(function() {
			var self = $(this);

			var congressGallerylider = new Swiper(this, {
				slidesPerView: 'auto',
				centeredSlides: false,
				spaceBetween: 20,
				loop: true,
				speed: 600,
				navigation: {
					nextEl: this.parentNode.querySelector('.js-congress-gallery-slider-btn-next'),
					prevEl: this.parentNode.querySelector('.js-congress-gallery-slider-btn-prev'),
				},
				
				breakpoints: {
					620: {
						slidesPerView: 'auto',
						centeredSlides: true,
						spaceBetween: 50,
					}
				}
			});

		});

	}
	


	


	$('[data-fancybox]').fancybox({
		loop: true,
		buttons: ['close']
	});

	$('.js-required-input').on('focus',function() {
		if($(this).parents('.form-label').hasClass('is-error')) {
			$(this).parents('.form-label').removeClass('is-error');
		}
	});

	$('form').submit(function(e) {
		e.preventDefault();

		var that = $(this);
			inputs = that.find('.js-required-input'),
			flag = true;

		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).parents('.form-label').addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: that.serialize()
		}).done(function() {
			$('html').addClass('is-fixed');
			$('.js-popup-form').fadeOut(300);
			$('.js-popup-thanks').fadeIn(300);
			that.trigger("reset");
			
		});

	});



	$("input[type=tel]").inputmask({"mask": "+38 (999) 999-9999","clearIncomplete": false});


	setTimeout(function(){
		$('body').addClass('is-loaded');
	}, 1200);


});
