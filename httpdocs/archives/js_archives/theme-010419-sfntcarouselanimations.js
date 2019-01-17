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

		class ResponsiveBackgroundImage {

			constructor(element) {
				this.element = element;
				this.img = element.querySelector('img');
				this.src = '';

				this.img.addEventListener('load', () => {
					this.update();
				});

				if (this.img.complete) {
					this.update();
				}
			}

			update() {
				let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
				if (this.src !== src) {
					this.src = src;
					this.element.style.backgroundImage = 'url("' + this.src + '")';

				}
			}
		}

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
			lazyload: 'ondemand',
			responsive: [
			    {
			      breakpoint: 959,
			      settings: "unslick"
			    },
			    {
			      breakpoint: 767,
			      settings: {
			      	slidesToShow: 3
			      }
			    }
			]
		};
		// Copy Global into Featured Brands Settings
		window.sliderSettingsBrands = Object.assign( {},  sliderSettings);
		sliderSettingsBrands.responsive = [
		    {
		      breakpoint: 959,
		      settings: {
		      	slidesToShow: 4
		      },
		    },
		    {
		      breakpoint: 767,
		      settings: {
		      	slidesToShow: 3
		      }
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
				callback,
				current_active = document.getElementsByClassName('x-brands-active');
				brandsStatic = brandsContainer.innerHTML;

			//reset active tab
			current_active[0].classList.remove('x-brands-active');
			current.classList.toggle('x-brands-active');

			var removeSlides = function(slider, newSlides, activeLength) {
				
				var length = slider[0].slick.$slides.length;

				for (var i = length - 1; i >= 0; i--) {

					slider.slick( 'slickRemove', i );

				}

				addSlides(slider, newSlides, activeLength);
				
			}

			var smoothRemove = function( slider, callback, response ) {

				var slider = $( slider ),
					thisSlide = slider[0].slick,
					slidesActive = $('.slick-active'),
					activeLength = slidesActive.length,
					i = 0;

				if ( slider && thisSlide.$slides && thisSlide.$slides.length > 0 ) {

					function action() {

						if (i != activeLength) {
							slidesActive[i].classList.add('smooth-overflow');
							var slide = slidesActive[i].getElementsByClassName('x-product-list__contents');
							slide[0].classList.add('smooth-remove');
						}

						if (i < activeLength) {
							setTimeout( action, 300);
						}

						i++;

					}

					if (i < activeLength) {
						action();
					}


					//FOR MASS SMOOTH SLIDING
					// for (var i = slider[0].slick.$slides.length - 1; i >= 0; i--) {
					// 	slider[0].slick.$slides[i].classList.add('smooth-remove-overflow');
					// 	var slide = slider[0].slick.$slides[i].getElementsByClassName('x-product-list__contents');
					// 	slide[0].classList.add('smooth-remove');

					// }

				}

				if ( callback ) {

					setTimeout( function(){

						var $html = $( response );
						var newSlides = [];
						var newSlides = $html.filter('.x-product-list__item');

						callback( slider, newSlides, activeLength );
						
					}, 1200);

				}

			};

			var addSlides = function( slider, newSlides, length ) {

				var slider = $( slider ),
					i = 0;

				if ( slider && newSlides ) {

					// function action() {
					// 	console.log(newSlides[i]);
					// 	slider.slick( 'slickAdd', '<div><div>' + newSlides[i].outerHTML + '</div></div>' );

					// 	if (i < length) {
					// 		setTimeout( action, 300);
					// 	}

					// 	i++;

					// }

					// if (i < length) {
					// 	action();
					// }
					
					
					// newSlides.each( function(index, element){

					// 	slider.slick( 'slickAdd', '<div><div>' + element.outerHTML + '</div></div>' );
					// 	if (index == 6) {
					// 		return false;
					// 	}
					// })

				}


				//FOR MASS ADDING
				slider.slick('unslick');
				if ( slider && newSlides ) {
					
					newSlides.each( function(index, element){
						slider.append(element.outerHTML);
					})

				}
				
				sliderSettingsBrands.infinite = false;
				slider.slick(sliderSettingsBrands);
				slider.slick('slickSetOption', 'infinite', true);
				slider.slick('refresh');

			};

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
					var slider = $( brandsContainer );
						slider.slick('slickSetOption', 'infinite', false);
						slider.slick('refresh');
						console.log(slider[0].slick.options);
					// brandsContainer.innerHTML = response;

					function initCarousel(callback) {
					  	// featured brands carousel reinit and link assignment

						// $('#x-carousel-featured-brand').not('.slick-initialized').slick(sliderSettingsBrands);
						smoothRemove( brandsContainer, removeSlides, response );
						shop_all_link.href = url;
					    shop_all_link.text = 'Shop All ' + new_label;
					    setTimeout( function(){
					    	callback();
					    }, 3000)
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

			/*$.ajax({
				url: url,
				method: 'GET'
			})
			.done(function( response ) {

				console.log( response );
				console.log( $( response ) );

			})*/

		};

		// $('#x-carousel-featured-brand').on('click' , '.x-product-list__quickview' , function(){
		// 	var modal = minimodal(this, {
		//       // options
		//       statusTimeout: 600,
		//       removeTimeout: 600,
		//       closeTimeout: 600
		//     });
		//     modal.init();
		// })

		if (document.readyState == 'complete') {

			//Responsive background images
			let elements = document.querySelectorAll('[data-responsive-background-image]');
			for (let i=0; i<elements.length; i++) {
				new ResponsiveBackgroundImage(elements[i]);
			}

			//Hook up the videos
			$.hook('nww-video').on('click', function (e) {
				var video = $(this).find('video');
				
				customVideoInit(video);
			});

			//Call sliders
			slideInit();

			//Call animations
			AOS.init({
				disable: 'mobile'
			});

			//Lazy Load them in
			var sliders = document.getElementsByClassName('x-nww-slider');
			if (document.readyState == 'complete') {
				for (let i = 0; i < sliders.length; i++ ){
					var slider = sliders[i];
					slider.classList.toggle('x-nww-slider--loaded');
			    }
			}

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
			   	AOS.refreshHard();

			}, 250);

		});

			//Use an oberver?
			// const myObserver = new ResizeObserver(entries => {
			// 	entries.forEach(entry => {
			// 	    console.log('width', entry.contentRect.width);
			// 	    console.log('height', entry.contentRect.height);
			// 	    slideInit();
			// 	 });
			// });
			// const main = document.querySelector('main');
			// myObserver.observe(main);
		};


	},
	jsSFNT_CL: function() {

		class ResponsiveBackgroundImage {

			constructor(element) {
				this.element = element;
				this.img = element.querySelector('img');
				this.src = '';

				this.img.addEventListener('load', () => {
					this.update();
				});

				if (this.img.complete) {
					this.update();
				}
			}

			update() {
				let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
				if (this.src !== src) {
					this.src = src;
					this.element.style.backgroundImage = 'url("' + this.src + '")';

				}
			}
		}

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
			lazyload: 'ondemand',
			responsive: [
			    {
			      breakpoint: 959,
			      settings: "unslick"
			    },
			    {
			      breakpoint: 767,
			      settings: {
			      	slidesToShow: 3
			      }
			    }
			]
		};
		// Copy Global into Featured Brands Settings
		var sliderSettingsBrands = Object.assign( {},  sliderSettings);
			sliderSettingsBrands.responsive = [
		    {
		      breakpoint: 959,
		      settings: {
		      	slidesToShow: 4
		      },
		    },
		    {
		      breakpoint: 767,
		      settings: {
		      	slidesToShow: 3
		      }
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

		if (document.readyState == 'complete') {

			let elements = document.querySelectorAll('[data-responsive-background-image]');
			for (let i=0; i<elements.length; i++) {
				new ResponsiveBackgroundImage(elements[i]);
			}

			//Hook up the videos
			$.hook('nww-video').on('click', function (e) {
				let video = $(this).find('video');
				customVideoInit(video);
			});

			//Call sliders
			//slideInit();

			//Lazy Load them in
			let sliders = document.getElementsByClassName('x-nww-slider');
			if (document.readyState == 'complete') {
				for (let i = 0; i < sliders.length; i++ ){
					let slider = sliders[i];
					slider.classList.toggle('x-nww-slider--loaded');
			    }
			}

			//Assign brand tab functionality
			let brands = document.querySelectorAll('.x-flex-brands-tabs__tab');
			//ajax calls to categories
	    	for (let i = 0; i < brands.length; i++ ){
	    		let brand = brands[i];
	    		brand.addEventListener('click', brandsAjax);
	        }
			
			//Put slider reinit into timer for better resizing
			let resizeTimer;
			$(window).on('resize', function(){
				clearTimeout(resizeTimer);
			  	resizeTimer = setTimeout(function() {
			   		slideInit();
			  	}, 250);
			});

		};


	},
	jsCTGY: function() {
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
		 	      breakpoint: 767,
		 	      settings: {
		 	      	rows: 2
		 	      }
		 	    }
		 	];

		 function slidersInit() {
		 	$('#x-related-products-carousel').not('.slick-initialized').slick(sliderSettingsGrid);
		 	$('#x-customers-also-bought-carousel').not('.slick-initialized').slick(sliderSettings);
		 	$('#x-recently-viewed-carousel').not('.slick-initialized').slick(sliderSettings);
		 }
		 

		function stickyImage() {
			if (window.innerWidth <= 960) {
				return;
			}
			else {
				$.loadScript(theme_path + 'extensions/stickykit/stickykit.js', function(){
					$(".x-product-layout-images").stick_in_parent({offset_top:80});
				});
			}
		}

		if (document.readyState == 'complete') {

		 	// productGallery($('#x-product-layout-images__container'));
		 	
		 	var img_container = document.getElementById('x-product-layout-images__container'),
		 		img = document.getElementById('main_img'),
		 		resizeTimer;

		 	stickyImage();
		 	slidersInit();

		 	$(window).on('resize', function(){
		 		clearTimeout(resizeTimer);
		 		img_container.style.height = 'auto';
		 		stickyImage();
		 	});
		 	
		}
		 
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
