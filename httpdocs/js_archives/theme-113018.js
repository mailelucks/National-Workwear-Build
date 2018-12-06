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
			this.classList.toggle('u-icon-cross');
			this.classList.toggle('u-nww-icon-search');
			searchForm.classList.toggle('is-open');
		});

	},

	jsSFNT: function() {

		function customVideoInit(video) {
			// Button
		 	var playButton = video.next($('u-nww-play-pause__button'));
		 	var playIcon = playButton.find($('.u-nww-play-pause--icon'));
		 	function videoToggles() {
		 		// Toggle buttons for 'Play' and 'Pause'
			  	playButton.toggleClass('c-video-button--play c-video-button--pause')
			 	// Toggle icons for 'Play' and 'Pause'
			 	playIcon.toggleClass('u-nww-icon-arrow-play u-nww-icon-pause');
		 	}
		 	if (video.get(0).paused == true) {
			  	// Play the video
			  	video.get(0).play();
				videoToggles();			  	

			} else {
			  	// Pause the video
			  	video.get(0).pause();
			  	videoToggles();
			}
		}
		//Create Global Settings for Sliders
		var sliderSettings = {
				mobileFirst: true,
				slidesToShow: 2,
				prevArrow:'<button class="x-carousel__button c-nww-button x-carousel__button-left u-nww-icon-arrow-left"></button>',
				nextArrow:'<button class="x-carousel__button c-nww-button x-carousel__button-right u-nww-icon-arrow-right"></button>',
				lazyload: "ondemand",
				responsive: [
				    {
				      breakpoint: 959,
				      settings: "unslick"
				    }
				]
			};
		// Copy Global into Featured Brands Settings
		var sliderSettingsBrands = Object.assign( {},  sliderSettings);
			sliderSettingsBrands.responsive = [
				    {
				      breakpoint: 768,
				      settings: {
				      	slidesToShow: 3
				      },
				      breakpoint: 960,
				      settings: {
				      	slidesToShow: 4
				      },
				    }
				];
		
		function slideInit(){
			// Initialize all sliders using slickjs
			$('#x-carousel-featured-ctgy').not('.slick-initialized').slick(sliderSettings);
			$('#x-carousel-featured-prods').not('.slick-initialized').slick(sliderSettings);
			$('#x-carousel-featured-brand').not('.slick-initialized').slick(sliderSettingsBrands);
		}
		

		//Featured Brands
		function brandsAjax(e){
			var current = this,
				url = current.getAttribute('data-brand-action'),
				new_label = current.getAttribute('data-brand-name'),
				shop_all_link = document.getElementById('x-featured-brand__cta-link'),
				brandsContainer = document.getElementById('x-carousel-featured-brand'),
				brandsContainerHeight = brandsContainer.offsetHeight + 'px',
				current_active = document.getElementsByClassName('x-brands-active');
				console.log(brandsContainerHeight);


			//disable current slider
			current_active[0].classList.remove('x-brands-active');
			$('#x-carousel-featured-brand').slick('unslick');
			current.classList.toggle('x-brands-active');

			brandsContainer.innerHTML = '';
			brandsContainer.style.height = brandsContainerHeight;

			// Set up our HTTP request
			var request = new XMLHttpRequest();

			request.onreadystatechange = function () {

				// Only run if the request is complete
				if (request.readyState !== 4) {
					return;
				}
				// Process our return data
				if (request.status === 200) {
					var response = request.response;
					brandsContainer.innerHTML = response;

					function initCarousel(callback) {
					  	// featured brands carousel reinit and link assignment
						$('#x-carousel-featured-brand').not('.slick-initialized').slick(sliderSettingsBrands);
						shop_all_link.href = url;
					    shop_all_link.text = 'Shop All ' + new_label;
					    callback();
					}

					//reattach modal functionality
					function initModals(){
					  var targets = brandsContainer.querySelectorAll('[data-mini-modal]');
					  for (var i = 0; i < targets.length; i += 1) {
					    var modal = minimodal(targets[i], {
					      // options
					      statusTimeout: 600,
					      removeTimeout: 600,
					      closeTimeout: 600
					    });
					    modal.init();
					  }
					}

					initCarousel(initModals);
					
				}
			}
			//get brands product listing from category page, works similar to quickview. url caps the query at first 12 products
			request.open('GET', url);
			request.send(url);

		};

		$(document).ready( function(){
			//Hook up the videos
			$.hook('nww-video').on('click', function (e) {
				var video = $(this).find('video');
				customVideoInit(video);
			});

			//Call sliders
			$.loadScript(theme_path + 'extensions/slickjs/slick.js', function () {
				slideInit();
			});

			//Assign brand tab functionality
			var brands = document.querySelectorAll('.x-flex-brands-tabs__tab');
			//ajax calls to categories
	    	for (let i = 0; i < brands.length; i++ ){
	    		var brand = brands[i];
	    		brand.addEventListener('click', brandsAjax);
	        }
			
			//Put slider reinit into timer for better resizing
			var resizeTimer;
			$(window).on('resize', function(){
				clearTimeout(resizeTimer);
			  	resizeTimer = setTimeout(function() {
			   		slideInit();
			  	}, 250);

			});
		});


	},
	jsCTGY: function() {
	},
	jsPROD: function() {
		/**
		 * Load and initialize the Quantify extension
		 */
		$.loadScript(theme_path + 'extensions/quantify/quantify.js');

		/**
		 * Load and initialize the AJAX Add to Cart extension
		 */
		$.loadScript(theme_path + 'extensions/product-layout/ajax-add-to-cart.js');

		/**
		 * Load and initialize the Roundabout extension
		 */
		$.loadScript(theme_path + 'extensions/carousel/roundabout.js', function () {
			$.hook('product-carousel').roundabout({
				group: true,
				groupTiny: 1,
				groupSmall: 1
			});
		});
	},
	jsPLST: function() {
	},
	jsSRCH: function() {
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