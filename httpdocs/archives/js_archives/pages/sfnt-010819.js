function responsiveBgs(container) {
	var img = $(container).find('img'),
		img = img[0],
		parent = $(container).closest('.x-bg-lazy');
		parent = parent[0];

		img.addEventListener('load', function(){
			update(img);
		});

		if (img.complete) {
			update(img);
		}

		function update() {

			if($(img).attr('src') !== 'undefined') {
				var src = $(img).attr('src');
			} 

			if (src) {
				container.style.backgroundImage = 'url("' + src + '")';
				if(parent) {
					parent.classList.add('loaded');
				}
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
		//brandsContainerHeight = brandsContainer.offsetHeight + 'px',
		current_active = document.getElementsByClassName('x-brands-active');


	//change active brand
	current_active[0].classList.remove('x-brands-active');
	current.classList.toggle('x-brands-active');
	shop_all_link.classList.toggle('loading');
	shop_all_link.classList.remove('loading-fadeout');
	shop_all_link.text = ' ';
		
	//set height for smoother transition
	//brandsContainer.style.height = brandsContainerHeight;

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

			function smoothRemove(slider, callback) {

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
								setTimeout( action, 200);
							}

							i++;

					}
				}
				
				if (i < activeLength) {
					action();
				}

				setTimeout( function(){
					callback(initModals);
				}, 1000);
				
			}

			//reinit carousel and set shop all link
			function initCarousel(callback) {
			  	// featured brands carousel reinit and link assignment
			  	$(brandsContainer).slick('unslick');
		  		brandsContainer.innerHTML = '';
		  		brandsContainer.innerHTML = response;
		  		sliderSettingsBrands.infinite = false;
				$(brandsContainer).not('.slick-initialized').slick(sliderSettingsBrands);
				$(brandsContainer).slick('slickSetOption', 'infinite', true);
				$(brandsContainer).slick('refresh');
				new LazyLoad({
					elements_selector: ".x-img-lazy"
				});
				setTimeout( function(){
					shop_all_link.href = url;
					shop_all_link.classList.toggle('loading');
					shop_all_link.classList.add('loading-fadeout');
			    	shop_all_link.text = 'Shop All ' + new_label;
				}, 1500);
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

			smoothRemove(brandsContainer, initCarousel);
			
		}
	}

	//get brands product listing from category page, works similar to quickview. url caps the query at first 12 products
	request.open('GET', url);
	request.send(url);

};

window.onload = function(){

	//Responsive background images
	let elements = document.querySelectorAll('[data-responsive-background-image]');
	for (let i=0; i<elements.length; i++) {
		responsiveBgs(elements[i]);
	}

	// Create all new instances of lazy loaded elements
	(function () {
		new LazyLoad({
			elements_selector: ".x-hero--bg-lazy"
		});
		new LazyLoad({
			elements_selector: ".x-img-lazy"
		});
	}());

	$('.x-sfnt--hero__container').addClass('is-loaded');

	//Hook up the videos
	$.hook('nww-video').on('click', function (e) {
		var video = $(this).find('video');
		customVideoInit(video);
	});


	//Call sliders
	slideInit();

	//Lazy Load them in
	var sliders = document.getElementsByClassName('x-nww-slider');
	for (let i = 0; i < sliders.length; i++ ){
		var slider = sliders[i];
		slider.classList.toggle('x-nww-slider--loaded');
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
	  	}, 250);

	});

	AOS.init({
		disable: 'mobile',
		startEvent: 'DOMContentLoaded'
	});
};