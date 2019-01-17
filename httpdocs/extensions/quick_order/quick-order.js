'use strict';

var app = angular.module('quickOrder', [], function($httpProvider){
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
});

app.filter('update_products_data', function(){

// TODO: DUPES HAPPENING HERE?
	var add_selection_id = function(product){

		product.selection_id = product.code;

		if( product.attributes ){
			product.selection_id = product.attributes.reduce(function(selection, attribute){
				selection += ':' + attribute.code;

				if (attribute.selected) {
					attribute.selected_option = attribute.selected;
					attribute.selected = '';
				}

				if( attribute.selected_option ){
					var option_value = attribute.selected_option && attribute.selected_option.code ? attribute.selected_option.code : attribute.selected_option;
					selection += '=' + option_value;
				}

				return selection;
			}, product.selection_id);
		}

		if( product.subscription && product.subscription.selected_term )
		{
			product.selection_id += ':subscription=' + product.subscription.selected_term.id;
		}

		return product;

	};

	var add_total_pricing = function(product){
		product.total_price_each = Number(product.price);

		if( product.attributes ){
			product.attributes.forEach(function(attribute){
				
				if( attribute.selected ) {
					attribute.selected_option = attribute.selected;
					attribute.selected = '';
				}

				if( attribute.selected_option ){
					if( attribute.selected_option.price ){
						product.total_price_each += Number(attribute.selected_option.price);
					} else if (attribute.price) {
						product.total_price_each += Number(attribute.price);
					}
				} 

			});
		}

		product.total_price_selected = Number(product.quantity_selected * product.total_price_each);

		return product;
	};


	return function(products){

		products = products || [];

		return products.map(function(product){

			product = add_selection_id(product);

			product = add_total_pricing(product);			

			return product;

		});
	};
});

app.controller('QuickOrderController', function($scope, $http) {

	$scope.selected_products = [];

	$scope.search = {};
	// $scope.search.query = 'filter';
	$scope.search.query = 'miva';
	$scope.search.offset = 0;
	$scope.search.results = {};
	$scope.search.sort_by = 'disp_order'
	$scope.search.sort_by_options = [
		{ value: 'disp_order',  prompt: 'Default' },
		{ value: 'bestsellers', prompt: 'Best Selling' },
		{ value: 'price_asc',   prompt: 'Lowest Price' },
		{ value: 'price_desc',  prompt: 'Highest Price' },
		{ value: 'newest',      prompt: 'Newest' }
	];


	$scope.$watch('search.query', function() {
		$scope.search.offset = 0;
		$scope.fetch();
	});

	$scope.updated_sort_by = function(){
		$scope.search.offset = 0;
		$scope.fetch();
	};

	$scope.set_offset = function(offset){
		$scope.search.offset = offset;
		$scope.fetch();
	};

	var handle_search_response = function(response) {

		if( !response.data.search_results )
		{
			$scope.search.results = {};
		}

		$scope.search.results = response.data.search_results;

		if( $scope.search.results.products )
		{
			$scope.search.results.products.map(function(product){

				product.src = product.imagetypes && product.imagetypes.main ? product.imagetypes.main : null;
				product.quantity_selected = 0;
				product.quantity_add = 1;
				product.display_code = product.code;
				product.no_img = miva_data.domain.base_surl + 'themes/shadows/core/images/img_no_thumb.jpg';
				return product;
			});
		}

		if( $scope.search.results.page_links )
		{
			var offset_regex = /&Offset=(\d+)/;

			$scope.search.results.page_links.is_first_page = $scope.search.results.page_links.current_page === 1;
			$scope.search.results.page_links.prev_disabled = $scope.search.results.page_links.is_first_page;

			$scope.search.results.page_links.is_last_page = $scope.search.results.page_links.current_page == $scope.search.results.page_links.last_page;
			$scope.search.results.page_links.next_disabled = $scope.search.results.page_links.is_last_page;

			$scope.search.results.page_links.first_offset = offset_regex.test($scope.search.results.page_links.first_link) ? $scope.search.results.page_links.first_link.match(offset_regex)[1] : 0;
			$scope.search.results.page_links.last_offset = offset_regex.test($scope.search.results.page_links.last_link) ? $scope.search.results.page_links.last_link.match(offset_regex)[1] : null;
			$scope.search.results.page_links.next_offset = offset_regex.test($scope.search.results.page_links.next_link) ? $scope.search.results.page_links.next_link.match(offset_regex)[1] : null;
			$scope.search.results.page_links.prev_offset = offset_regex.test($scope.search.results.page_links.prev_link) ? $scope.search.results.page_links.prev_link.match(offset_regex)[1] : 0;

			$scope.search.results.page_links.pages = $scope.search.results.page_links.pages.map(function(page){

				page.offset = offset_regex.test(page.link) ? page.link.match(offset_regex)[1] : 0;

				return page;
			});
		}
	};

	$scope.selectToggle = function(select){
		$scope.search.selectOpened = '';
		$scope.search.selectOpened = (select == $scope.search.selectOpened) ? '' : select;
	};
	/*
	* updates selection for radio + select
	*/
	$scope.updateSelection = function(attr,opt,fromDirective){
		if(attr.validationerror == 1 && opt != ''){
			attr.validationerror = 0;
		}
		attr.selected = opt;
		if(attr.code.search(/size/i) != -1){ $scope.search.selectOpened = '';}
		$scope.search.selectOpened = '';	

		if(fromDirective == true){
			if(attr.line != 'linegroup_none' && attr.is_parent == 1){
				$scope.search.mmAttributes.mmCustomize.map(function(o,i){
					if( o.line == attr.line && o.is_parent == 0){
						o.customclass = 'font_'+opt.code;
						o.shown = (opt != '') ? 1 : 0;
						o.required = o.shown;
					}
				});	
			}
		}
	};

	$scope.fetch = function() {
		if( !$scope.search.query ) return;

		var url = miva_data.urls.QODR.auto_sep + "Search=" + $scope.search.query + '&SearchOffset=' + $scope.search.offset + '&Sort_By=' + $scope.search.sort_by + '&discontinued=No';

		$http.get(url).then(handle_search_response);
	};

	$scope.select_product = function(product, is_valid){

		// Attribute Validation
		if( !is_valid ){
			product.show_invalid = true;
			return false;
		}
		product.show_invalid = false;

		// Add to Selected Products
		var new_product = angular.copy(product);

		var is_already_selected = false;

		$scope.selected_products = $scope.selected_products.map(function(selected_product){
			console.log(selected_product);
			var selections_match = selected_product.selection_id === new_product.selection_id;
			if( selections_match ){
				is_already_selected = true;
				selected_product.quantity_selected += new_product.quantity_add;
			}
			return selected_product;
		});

		if( !is_already_selected ){
			new_product.quantity_selected = new_product.quantity_add;
			$scope.selected_products.push(new_product);
		}
	
		product.quantity_add = 1;
	};

	$scope.remove_product = function(product){
		$scope.selected_products = $scope.selected_products.reduce(function(new_products, selected_product){
			if( selected_product.selection_id !== product.selection_id ){
				new_products.push(selected_product);
			}
			return new_products;
		}, []);
	};

	var add_adpr_attribute_data = function(post_data, product){

		if( !product.attributes ) return post_data;

		product.attributes.forEach(function(attribute, i){

			var attribute_index = i + 1;
			
			post_data['Product_Attributes[' + attribute_index + ']:code'] = attribute.code;
			if( attribute.template_code ){
				post_data['Product_Attributes[' + attribute_index + ']:template_code'] = attribute.template_code;
			}
			post_data['Product_Attributes[' + attribute_index + ']:value'] = attribute.selected_option && attribute.selected_option.code ? attribute.selected_option.code : attribute.selected_option;

		});

		post_data.Product_Attribute_Count = product.attributes.length;

		return post_data;

	};

	$scope.update_and_show_mini_basket = function(html){
		var $miniBasketData = $(html).find('[data-hook="mini-basket"]'),
		itemCount = $miniBasketData[0].dataset.itemCount,
		subtotal = $miniBasketData[0].dataset.subtotal;

		$.hook('mini-basket-count').text(itemCount); // Update mini-basket quantity (display only)
		$('[data-hook="mini-basket"]').html($miniBasketData.html());
		// miniBasket.init();
		setTimeout(function () {
			$.hook('open-mini-basket').data({
				'item-count': itemCount,
				'subtotal': subtotal
			});
			$.hook('open-mini-basket')[0].click();
		}, 100);
	};

	$scope.set_product_message = function(product, message){
		$scope.selected_products = $scope.selected_products.map(function(selected_product){
			if( selected_product.selection_id !== product.selection_id ){
				selected_product.message = message;
			}
			return selected_product;
		});
	};

	$scope.clear_product_message = function(product){
		$scope.selected_products = $scope.selected_products.map(function(selected_product){
			if( selected_product.selection_id !== product.selection_id ){
				selected_product.error_message = null;
			}
			return selected_product;
		});
	};

	$scope.adpr = function(){

		if( $scope.adpr_is_in_process ) {
			return;
		}

		$scope.adpr_is_in_process = true;
		$scope.remaining_adpr_count = $scope.selected_products.length;

		$scope.selected_products.forEach(function(product){

			var post_data = {
				Action: 'ADPR',
				Product_Code: product.code,
				Quantity: product.quantity_selected
			};

			if( product.subscription && product.subscription.selected_term ){
				post_data.Product_Subscription_Term_ID = product.subscription.selected_term.id;
			}

			post_data = add_adpr_attribute_data(post_data, product);


			$http.post(
				miva_data.urls.BASK.auto,
				$.param(post_data)
			)
			.then(function(response){

				$scope.remaining_adpr_count--;				
				
				if( !$scope.remaining_adpr_count ){
					$scope.adpr_is_in_process = false;
				}

				// Handle ADPR Result Page & Error Messages
				var product_message;
				if (response.data.search(/id="js-BASK"/i) != -1) {
					product_message = 'Added to cart.';
					$scope.remove_product(product);
				}
				else if(response.data.search(/id="js-PATR"/i) != -1) {
					product_message = 'Please double-check that you have selected/entered all of the required product options, and try again.';
				}
				else if(response.data.search(/id="js-PLMT"/i) != -1) {
					product_message = 'We do not have enough of the Size/Color you have selected. Please adjust your quantity.';
				}
				else if(response.data.search(/id="js-POUT"/i) != -1) {
					product_message = 'The Size/Color you have selected is out of stock. Please review your options or check back later.';
				}
				else {
					product_message = 'Please review options, and try again.';
				}

				if( product_message ){
					$scope.set_product_message(product, product_message);
				} else {
					$scope.clear_product_message(product);
				}

				// Update Mini-Basket
				if( !$scope.remaining_adpr_count && !$scope.selected_products.length ){
					$scope.update_and_show_mini_basket(response.data);
					$scope.fetch(); // fetch() is to update $scope.search.results.products `product.quantity` in-cart
				}

			});
		});
	};

	$scope.total_price_selected = function(){
		if( !$scope.selected_products ) return 0;

		return $scope.selected_products.reduce(function(total, product){
			return total += product.total_price_selected;
		}, 0);
	};

});