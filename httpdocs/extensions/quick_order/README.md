# Quick Order

## Installation

1. Create a new Miva Page:
	* Code: QODR
	* Name: Quick Order
	* Template: `QODR-details.mvt`
2. Assign the page's items:
	* Assign all the items that the current framework has on a standard/simple page (For example, use the items that are assigned to the `ABUS` page).
	* Assign `product_attributes` & `search_results` items.
3. Set the Product Attributes content to `QODR-product-attributes.mvt`
4. Configure the Search Results settings to match `QODR-search-results--settings.png`
5. Set the Content template to `QODR-content.mvt`
6. Upload the `quick-order.css`, `quick-order.js`, & `quick-order.html` to the theme's `/extensions/` folder (ex: `\htdocs\mm5\themes\shadows\extensions\quick-order`)

## Example Sites:

* [Dev Store using the Shadows framework](https://ssoule.mivamerchantdev.com/store/quick-order.html)
* [S&B Filters using the Luxe framework](https://www.sbfilters.com/quick-order)