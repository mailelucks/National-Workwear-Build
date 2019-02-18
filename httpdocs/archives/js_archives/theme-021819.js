/**
 * Use this file to all in scripts and functions you would like to have globally or on specific
 * pages. You will use this to extend your theme instead of adding code to the core framework files.
 */

var themeFunctionality = {
	init: function () {
		/**
		 * Load and initialize the Fasten Header extension
		 */
		$.loadScript(theme_path + 'extensions/fasten-header/fasten-header.js');

		/**
		 * Toggle the `is-open` state of the global account box.
		 */
		(function () {
			var trigger = document.querySelector('[data-hook="show-related"]');

			if (trigger) {
				var relatedTarget = document.querySelector('[data-hook="' + trigger.getAttribute('data-target') + '"]');

				trigger.addEventListener('click', function (event) {
					event.preventDefault();
					relatedTarget.classList.toggle('is-open');
				}, false);

				document.addEventListener('mousedown', function (event) {
					if (relatedTarget.classList.contains('is-open')) {
						if (!relatedTarget.contains(event.target) && event.target !== trigger) {
							relatedTarget.classList.toggle('is-open');
						event.preventDefault();
						}
					}
				}, false);

				window.addEventListener('keydown', function (event) {
					if (event.defaultPrevented) {
						return;
					}

					switch (event.key) {
						case 'Escape':
							if (relatedTarget.classList.contains('is-open')) {
								relatedTarget.classList.toggle('is-open');
							}
							break;
						default:
							return;
					}

					event.preventDefault();
				}, true);
			}
		})();


		/**
		 * Load and initialize the Mini-Basket extension
		 */
		$.loadScript(theme_path + 'extensions/mini-basket/mini-basket.js', function () {
			miniBasket.init();
		});


		/**
		 * Load and initialize the Drop-Down Navigation extension
		 */
		$.loadScript(theme_path + 'extensions/navigation/transfigure-navigation.js', function () {
			$.hook('has-drop-down').transfigureNavigation();
		});


		/**
		 * Load and initialize the Collapsing Breadcrumbs extension
		 */
		$.loadScript(theme_path + 'extensions/breadcrumbs/collapsing-breadcrumbs.js');

		/**
		 * Dropdown drawer for mobile and tablet search
		 */

		$.hook('mobile-search').on('click', function (e) {
			e.preventDefault(); 
			var searchForm = document.getElementById('mobile-search-form');
			var html = document.querySelector('html');
			this.classList.toggle('u-icon-cross');
			this.classList.toggle('u-nww-icon-search');
			searchForm.classList.toggle('is-open');
			html.classList.toggle('has-open-main-menu');
		});

		(function( mivaJS ) {

			/**
			 * Add the following variables into the `theme-settings` JavaScript Resource inline script. ( Or any other global template )
			 * Some variables listed my already exist. If so, remove.
			 */
			
			mivaJS.Category_Code = '&mvtj:global:Category_Code;';
			mivaJS.Screen = '&mvtj:global:Screen;';
			mivaJS.Miva_AJAX_URL = '&mvtj:urls:AJAX:auto;';
			mivaJS.SS_Site_ID = '&mvtj:global:SS_Site_ID;';
			mivaJS.Module_Root = '&mvtj:global:Module_Root;';
			mivaJS.Store_Code = '&mvtj:global:Store_Code;';

		})( window.mivaJS || (window.mivaJS = {}) );

	},
	jsSFNT: function() {
	},
	jsSHOP: function() {
		/**
		 * Load and initialize lazyloader
		 */
		new LazyLoad({
			elements_selector: ".x-img-lazy"
		});
	},
	jsCTGY: function() {
		/**
		 * Load and initialize lazyloader
		 */
		new LazyLoad({
			elements_selector: ".x-img-lazy"
		});
	},
	jsPROD: function() {
		/**
		 * Load and initialize the Quantify extension
		 */
		$.loadScript(theme_path + 'extensions/quantify/quantify.js');

		//don't run the rest of this function if body class is 'alt_prod_PROD_NG'
		if($('body').hasClass('alt_prod_PROD_NG')){ return; }

		/**
		 * Load and initialize the AJAX Add to Cart extension
		 */
		$.loadScript(theme_path + 'extensions/product-layout/ajax-add-to-cart.js');	
		
		/**
		 * Sliders Engage ##
		 */
		 var sliderSettings = {
		 	mobileFirst: true,
		 	rows: 1,
		 	slidesPerRow: 2,
		 	prevArrow:'<button class="x-carousel__button c-nww-button x-carousel__button-left u-nww-icon-arrow-left"></button>',
		 	nextArrow:'<button class="x-carousel__button c-nww-button x-carousel__button-right u-nww-icon-arrow-right"></button>',
		 	lazyload: 'ondemand'
		 };
		 // Copy Global into Featured Brands Settings
		 var sliderSettingsGrid = Object.assign( {},  sliderSettings);
		 	sliderSettingsGrid.responsive = [
		 	    {
		 	      breakpoint: 768,
		 	      settings: {
		 	      	rows: 2
		 	      }
		 	    }
		 	];

		// Copy Global into Featured Brands Settings
		var sliderSettingsThumbs = {
		 	mobileFirst: true,
		 	vertical: true,
		 	verticalSwiping: true,
		 	slidesToShow: 2,
		 	prevArrow:'<button class="x-carousel__button c-nww-button x-carousel__button-left u-nww-icon-arrow-left"></button>',
		 	nextArrow:'<button class="x-carousel__button c-nww-button x-carousel__button-right u-nww-icon-arrow-right"></button>',
		 	lazyload: 'ondemand',
		 	responsive: [
		 		{
		 			breakpoint: 768,
		 			settings: {
		 				slidesToShow: 4
		 			}
		 		}
		 	]
		 };


		 function slidersInit() {
		 	$('#x-related-products-carousel').not('.slick-initialized').slick(sliderSettingsGrid);
		 	$('#x-customers-also-bought-carousel').not('.slick-initialized').slick(sliderSettings);
		 	$('#x-recently-viewed-carousel').not('.slick-initialized').slick(sliderSettings);
		 	$('#thumbnails').not('.slick-initialized').slick(sliderSettingsThumbs);
		 }

		function stickyImage() {
			if (window.innerWidth <= 960) {
				return;
			} else {
			$.loadScript(theme_path + 'extensions/stickykit/stickykit.js', function(){
				$(".x-product-layout-images").stick_in_parent({
					offset_top: 115
				});
			});
				$(document.body).trigger("sticky_kit:recalc");
			}
		}

		function clearThumbs() {
			var thumbnails = document.getElementById('thumbnails'),
				main_img = document.getElementById('main_image');

			if (!thumbnails.innerHTML) {
				thumbnails.classList.add('u-hidden');
			}

			if (main_img.src.includes('.gif')) {
				var container = document.getElementById('x-product-layout-images__container');
				container.style.pointerEvents = 'none';
			}

		}

		/**
		 * Load and initialize Maginific 
		 */

		// ---- Tell A Friend Control ---- //
		$.loadScript(theme_path + 'extensions/tell-a-friend/isValidEmail.js');
		function tellAFriend () {
		    var $tafWrap = $('#js-tell-a-friend-wrap'),
		        $tafForm = $('#js-tell-a-friend'),
		        $tafName = $('#js-tafName'),
		        $tafEmail = $('#js-tafEmail'),
		        $tafFriendEmail = $('#js-tafFriendEmail'),
		        $tafComment = $('#l-tafComment'),
		        $validationErrors = $('#tell-a-friend-validation-errors'),
		        $processing = $('#tell-a-friend-processing'),
		        $success = $('#tell-a-friend-success'),
		        $error = $('#js-error');

		    // ---- Open Tell-A-Friend Form ---- //
		    $('.t-page-prod').on('click', '#js-open-tell-a-friend', function (e) {

		    	e.preventDefault();

		        // ---- Additional Server Security To Help Against Spambots ---- //
		        $.get(theme_path + '/extensions/tell-a-friend/token.php', function (tkn) {
		            $('#js-tell-a-friend').append('<input type="hidden" name="mms" value="' + tkn + '" />');
		        });

		        $.magnificPopup.open({
		        	items: {
		        		src: $tafWrap
		        	},
		            type: 'inline',
		            focus: $tafName,
		            callbacks: {
		            	afterClose: function() {
		            		$('.cancel-btn').trigger('click');
    		                $tafForm.find('fieldset').show();
    		                $($validationErrors, $processing, $success, $error).hide();
		            	}
		            }
		        });

		    });

		    $tafForm.on('click', 'a, input[type="reset"]', function (e) {
		        $tafForm.trigger('close');
		    });

		    // ---- AJAX Tell A Friend Form ---- //
		    $(document).on('submit', '#js-tell-a-friend', function (e) {
		        // Validate form fields
		        var tafName = $('#js-tafName').val(),
		            tafEmail = $('#js-tafEmail').val(),
		            tafFriendEmail = $('#js-tafFriendEmail').val(),
		            tafMessage = $('#l-tafComment').val(),
		            errorMessagesWrap = $('#tell-a-friend-validation-errors'),
		            errorMessages = errorMessagesWrap.find('ul');

		            console.log(tafName);
		            console.log(tafEmail);



		        if (tafName.length === 0) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Please enter your name!');
		            e.preventDefault();
		        }
		        else if (!isValidEmailAddress(tafEmail)) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Your email address is invalid!');
		            e.preventDefault();
		        }
		        else if (!isValidEmailAddress(tafFriendEmail)) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Your friend\'s email address is invalid!');
		            e.preventDefault();
		        }
		        else if (tafMessage.length === 0) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Please write a message to your friend!');
		            e.preventDefault();
		        }
		        else {
		            // Check the form is not currently submitting
		            if ($(this).data('formstatus') !== 'submitting') {
		                // Set up variables
		                var form = $(this),
		                    formData = form.serialize(),
		                    formUrl = form.attr('action'),
		                    formMethod = form.attr('method');

		                // Add status data to form
		                form.data('formstatus', 'submitting');

		                // Show processing message
		                $(this).find('fieldset').hide();
		                $('#tell-a-friend-processing').show();

		                // Send data to server for validation
		                $.ajax({
		                    url: formUrl,
		                    type: formMethod,
		                    data: formData,
		                    success: function(data, textStatus, jqXHR) {
		                        // Hide processing message, show success message and reset formstatus
		                        $('#tell-a-friend-processing').hide();
		                        if (data.search(/error/i) != -1) {
		                            $('#tell-a-friend-validation-errors').text(data).show();
		                        }
		                        else {
		                        	$($tafName, $tafEmail, $tafFriendEmail, $tafComment).empty();
		                        	$('#tell-a-friend-validation-errors').hide();
		                        	$($success).show();
		                        	setTimeout( function(){
		                        		$tafForm.find('fieldset').show();
		                        		$.magnificPopup.close();
		                        		$validationErrors.hide();
		                        		$processing.hide();
		                        		$success.hide();
		                        		$error.hide();
		                        	}, 3000);

		                        }
		                        form.data('formstatus', 'idle');
		                    },
		                    error: function (jqXHR, textStatus, errorThrown) {
		                        // Hide processing message, show error message and reset formstatus
		                        //console.log(errorThrown);
		                        form.data('formstatus', 'idle');
		                    }
		                });
		            }
		        }

		        // Prevent form from submitting
		        e.preventDefault();
		    });

		    if( window.location.hash === '#tell-a-friend' ){
		        $('#js-open-tell-a-friend').trigger('click');
		    }

		}
				

		if (document.readyState == 'complete') {

		 	// productGallery($('#x-product-layout-images__container'));

		 	AOS.init({
		 		disable: 'mobile',
		 		startEvent: 'DOMContentLoaded'
		 	});
		 	
		 	var img_container = document.getElementById('x-product-layout-images__container'),
		 		img = document.getElementById('main_img'),
		 		resizeTimer;

		 	stickyImage();
		 	slidersInit();
		 	clearThumbs();
		 	tellAFriend();

		 	/**
		 	 * Load and initialize lazyloader
		 	 */
		 	new LazyLoad({
		 		elements_selector: ".x-img-lazy"
		 	});

		 	$(window).on('resize', function(){
		 		clearTimeout(resizeTimer);
		 		img_container.style.height = 'auto';
		 		stickyImage();
		 	});
		 	
		}
		 
	},
	jsPLST: function() {

		$('.x-product-list__image').each( function(){
			var slide = $(this);
				data = slide.data('lazy');
				$(slide).attr('src', data);
		})

	},
	jsSRCH: function() {

		/**
		 * Load and initialize lazyloader
		 */
		new LazyLoad({
			elements_selector: ".x-img-lazy"
		});
		
	},
	jsBASK: function() {
		/**
		 * Load and initialize the Quantify extension
		 */
		$.loadScript(theme_path + 'extensions/quantify/quantify.js');
	},
	jsORDL: function() {
	},
	jsOCST: function() {
	},
	jsOSEL: function() {
	},
	jsOPAY: function() {
	},
	jsINVC: function() {
	}
};
