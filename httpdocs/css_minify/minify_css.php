<?php

/**
 * Built Using https://github.com/matthiasmullie/minify
 */

require('composer/vendor/autoload.php');

// $path = 'composer/vendor/matthiasmullie/';
// require_once $path . '/minify/src/Minify.php';
// require_once $path . '/minify/src/CSS.php';
// require_once $path . '/minify/src/JS.php';
// require_once $path . '/minify/src/Exception.php';
// require_once $path . '/minify/src/Exceptions/BasicException.php';
// require_once $path . '/minify/src/Exceptions/FileImportException.php';
// require_once $path . '/minify/src/Exceptions/IOException.php';
// require_once $path . '/path-converter/src/ConverterInterface.php';
// require_once $path . '/path-converter/src/Converter.php';

use MatthiasMullie\Minify;


$page = $_GET['pageType'];
$page = 'storefront';

// Core CSS Files
$file_paths = array(
	'../core/css/base/normalize.css',
	'../core/css/base/resets.css',
	'../core/css/elements/forms.css',
	'../core/css/elements/links.css',
	'../core/css/elements/media.css',
	'../core/css/elements/page.css',
	'../core/css/elements/tables.css',
	'../core/css/elements/typography.css',
	'../core/css/objects/layout.css',
	'../core/css/objects/lists.css',
	'../core/css/objects/tables.css',
	'../core/css/objects/wrapper.css',
	'../core/css/components/buttons.css',
	'../core/css/components/control-groups.css',
	'../core/css/components/divider.css',
	'../core/css/components/forms.css',
	'../core/css/components/keyline.css',
	'../core/css/components/menu.css',
	'../core/css/components/mini-modal.css',
	'../core/css/components/navigation.css',
	'../core/css/components/tables.css',
	'../core/css/components/typography.css',
	'../core/css/utilities/borders.css',
	'../core/css/utilities/clear-fix.css',
	'../core/css/utilities/colors.css',
	'../core/css/utilities/display.css',
	'../core/css/utilities/grids.css',
	'../core/css/utilities/icons.css',
	'../core/css/utilities/print.css',
	'../core/css/utilities/typography.css',
	'../core/css/utilities/vertical-align.css',
	'../core/css/utilities/widths.css',
	'../core/css/utilities/z-index.css',
	'../extensions/breadcrumbs/collapsing-breadcrumbs.css',
	'../extensions/category-tree/category-tree.css',
	'../extensions/display-list-filtering/display-list-filtering.css',
	'../extensions/hero/hero.css',
	'../extensions/messages/messages.css',
	'../extensions/pagination/pagination.css',
	//'../extensions/product-layout/product-layout.css',
	//'../extensions/product-lists/product-lists.css',
	'../extensions/search-preview/search-preview.css',
	'../extensions/subscriptions/subscriptions.css',
	'../extensions/mini-basket/mini-basket.css',
	'../extensions/quantify/quantify.css',
	'../extensions/tabs/flex-tabs.css',
	'../extensions/navigation/transfigure-navigation.css',
	//'../extensions/carousel/roundabout.css',
	//'../extensions/facets/facets.css',
	'../extensions/fasten-header/fasten-header.css',
	'../extensions/responsive-tabs/responsive-tabs.css',
	'../extensions/responsive-tabs/responsive-style.css',
	'../extensions/tabs/flex-tabs-custom.css',
	//'../extensions/slick-theme/slick-theme.css',
	//'../extensions/slick/slick.css',
	//'../extensions/aos/aos.css'
);

// Page Specific CSS
switch($page) {
	case 'storefront': 
		array_push($file_paths, 
			'site-styles.css',
			'../ui/css/pages/sfnt.css'
		);
		$minifiedPath = 'all_storefront.min.css';

		break;
	case 'listing':
		array_push($file_paths,
			'../extensions/product-lists/product-lists.css',
			'../extensions/facets/facets.css',
			'../shadows/site-styles.css'
		);
		$minifiedPath = 'all_listing.min.css';
		break;
	case 'product':
		array_push($file_paths,
			'../extensions/product-layout/product-layout.css',
			'../extensions/product-lists/product-lists.css',
			'../shadows/site-styles.css'
		);
		$minifiedPath = 'all_product.min.css';
		break;
	case 'checkout':
		array_push($file_paths, 
			'../shadows/site-styles.css'
		);
		$minifiedPath = 'all_checkout.min.css';
		break;
	case 'page':
		array_push($file_paths,
			'../shadows/site-styles.css'
		);
		$minifiedPath = 'all_pages.min.css';
		break;
	default:
		break;
}

//array_push( $file_paths, '../ui/css/nww-overrides.css' );

// Minify
if ($minifiedPath) {
	$minifier = new Minify\CSS($file_paths);
	//$minifier->minify($minifiedPath);
	$minified_css = $minifier->minify();

	if ( file_put_contents($minifiedPath, $minified_css) ) {
		echo 'Success';
	}
}
