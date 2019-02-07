# Custom Pages
This is a guide for creating custom pages within the Miva Admin. We will be using Categories and Readytheme Items.

 **Please note:** These pages are connected to the CTGY_CSTM alternative display page and pull from the customize.css file found under themes/shadows/ui/css/pages/customize.css. Refer to main doc for instructions on how to add a new line of minified css for any additional alternative display pages.

First, gather the following:
1. Template for page structure.

```html

<div class="o-layout">
	<div class="x-cstm-content__wrapper o-layout__item u-cstm-width-10 u-cstm-width-6--l">
		<h2 class="x-cstm-header u-font-secondary u-nww-color-secondary u-text-left">
			<mvt:item name="readytheme" param="banner( 'cstm_header_embroidery' )" />
		</h2>
		<div class="x-cstm-description">
			<mvt:item name="readytheme" param="contentsection( 'cstm_embroidery_desc' )" />
		</div>
	</div>
	<div class="x-cstm-form__wrapper o-layout__item u-cstm-width-10 u-cstm-width-4--l">
		<mvt:item name="readytheme" param="contentsection( 'cstm_form' )" />
	</div>
</div>
<div class="o-layout">
	<div class="x-cstm-steps__wrapper  o-layout__item">
		<mvt:item name="readytheme" param="contentsection( 'cstm_embroidery_steps' )" />
	</div>
</div>

```

2. Know which special elements you will want on this page. This will help to determine which pre-existing content to pull from.

###Show Toggle (Read More) 
```html

<div class="x-csmt-desc x-show-toggle-content" data-hook="x-show-toggle-content">
	<h3>What You Need to Know About Stock & Custom Embroidery</h3>
	<ul class="x-cstm-embroidery__list">
		<li class="x-cstm-embroidery__list-item">Waterproof garments will no longer be waterproof after the embroidery. We do offer to spray the embroidery with a water repellant spray to help this issue (for an additional fee), but the waterproof spray will have to be reapplied every few months. Ask us about the waterproof spray.</li>
		<li class="x-cstm-embroidery__list-item">For Flame-Resistant apparel, we use flame resistant Nomex thread, bobbin, and backing. Please contact us for current market pricing.</li>
		<li class="x-cstm-embroidery__list-item">Please provide us with your daytime phone # so that we can contact you for any additional information.</li>
		<li class="x-cstm-embroidery__list-item u-text-bold">After the final approval of art work and payment has been received, please allow an additional two weeks for orders with embroidery.</li>
		<li class="x-cstm-embroidery__list-item u-cstm-color-red u-text-bold">All embroidered items are not returnable</li>
		<li class="x-cstm-embroidery__list-item u-text-bold">There is no minimum order!</li>
	</ul>
</div>

<div class="x-show-toggle__wrapper">
	<div class="x-show-toggle u-inline" data-hook="x-show-toggle" data-target="x-show-toggle-content">
		<span class="x-show-toggle__text u-font-secondary u-text-underline">Read </span>
		<span class="x-show-toggle__icon u-nww-icon-arrow-down u-inline-block"></span>
	</div>
</div>

```

###Form
```html
	
	This has already been coded, you should not need to change this unless adjusting the form template itself. If you do this, make sure to double check the form action which is found under page code CSFM. The CSS and JS can be found under theme/shadows/extensions/customization

	To include, use this tag. Optimized for the Customization layout.

	<mvt:item name="readytheme" param="contentsection( 'cstm_form' )" />

```
###Tables
```html
	
	Each table has been slightly modified for the page it is on. Update yours as needed with CSS.

	<div class="x-cstm-table__wrapper o-layout o-layout--justify-between o-layout--align-top">
		<div class="x-cstm-table__column o-layout__item">
			<h3 class="x-cstm-header u-font-secondary u-nww-color-secondary">Fees for Embroidery</h3>
			<div class="x-cstm-table u-flex o-layout--column">
				<div class="x-cstm-table-row u-flex">
					<div class="x-cstm-table__label x-cstm-table-column">
						<span class="u-text-bold u-text-uppercase">First line of text</span>
					</div>
					<div class="x-cstm-table__value x-cstm-table-column u-text-center">
						<span class="u-text-bold u-cstm-color-red">
							+$6.50
						</span>
					</div>
				</div>
				<div class="x-cstm-table-row u-flex">
					<div class="x-cstm-table__label x-cstm-table-column">
						<span class="u-text-bold u-text-uppercase">Each additional line</span>
					</div>
					<div class="x-cstm-table__value x-cstm-table-column u-text-center">
						<span class="u-text-bold u-cstm-color-red">
							+$3.00
						</span>
					</div>
				</div>
				<div class="x-cstm-table-row u-flex">
					<div class="x-cstm-table__label x-cstm-table-column">
						<span class="u-text-bold u-text-uppercase">Each Stock Logo Design</span>
					</div>
					<div class="x-cstm-table__value x-cstm-table-column u-text-center">
						<span class="u-text-bold u-cstm-color-red">
							+$8.00
						</span>
					</div>
				</div>
				<div class="x-cstm-table-row u-flex">
					<div class="x-cstm-table__label x-cstm-table-column">
						<span class="u-text-bold u-text-uppercase">Waterproof Spray</span>
					</div>
					<div class="x-cstm-table__value x-cstm-table-column u-text-center">
						<span class="u-text-bold u-cstm-color-red">
							+$10.00
						</span>
					</div>
				</div> 
			</div>
		</div>
		<div class="x-cstm-table__column o-layout__item">
			<h3 class="x-cstm-header u-font-secondary u-nww-color-secondary">Call for Pricing</h3>
			<div class="x-cstm-table u-flex o-layout--column">
				<div class="x-cstm-table-row u-flex">
					<div class="x-cstm-table-column o-layout--column">
						<span class="u-text-bold u-text-uppercase">Back Embroidery</span>
						<span>Based on size and stitch count</span>
					</div>
				</div>
				<div class="x-cstm-table-row u-flex">
					<div class="x-cstm-table-column">
						<span class="u-text-bold u-text-uppercase">Flame Resistant Nomex Thread</span>
					</div>
				</div>
				<div class="x-cstm-table-row u-flex">
					<div class="x-cstm-table-column x-cstm-skinny-column x-cstm-table__label o-layout--column">
						<span class="x-cstm-flag u-nww-bg-secondary u-color-white u-text-bold u-text-uppercase u-inline-block">Optional</span>
						<span class="u-block">To bag individual employee uniforms by name</span>
					</div>
					<div class="x-cstm-table-column x-cstm-skinny-column u-text-center x-cstm-table__value">
						<span class="u-force-center u-text-bold u-cstm-color-red">+$0.52</span>
					</div>
				</div>
			</div>
		</div>
	</div>

```

###Steps

```html
	
	<div class="x-cstm-steps o-layout o-layout-column o-layout--justify-between">
		<div class="x-cstm-step x-cstm-step-row u-flex o-layout--align-center o-layout--wrap">
			<div class="x-cstm-step-instructions x-cstm-step-col">
				<div class="x-cstm-step-header">
					<div class="x-cstm-step-number u-font-secondary">01</div>
					<div class="x-cstm-step-subheader x-cstm-subheader u-font-secondary">Choose a Placement on a Shirt or Jacket</div>
				</div>
				<div class="x-cstm-step-details">
					<ul>
						<li>Front chest embroider size is approximately 2" tall x 4" wide</li>
						<li>On garments with a pocket, all embroidery will be placed above the pocket.</li>
						<li>Brand logo will dictate placement of embroidery</li>
						<li>Please call for back embroidery options.</li>
					</ul>
				</div>
			</div>
			<div class="x-cstm-step-infographic x-cstm-step-col">
				<figure class="x-cstm-step-img__wrapper u-text-right--m">
					<img src="&mvt:global:domain:image_root;graphics/00000001/customization/jacket_placement.png" alt="Embroidery Placement" class="x-cstm-step-img u-inline-block">
				</figure>
			</div>
		</div>

		Copy x-cstm-step container until all steps are included.

	</div>

```

###Navigation

```html
	
	Two types of navigation are available:
		- Native Subcategories for linking within the shared section of the website to make use of breadcrumbs.
		- Readytheme Navigation Sets for call to action linking to specific categories, products, or anything that is not part of the shared section.

	We are using two should you decide you want both types of linking on a single page.

```

Content Template:
```html

<div class="o-layout">
	<div class="x-cstm-content__wrapper o-layout__item u-cstm-width-10 u-cstm-width-6--l">
		<h2 class="x-cstm-header u-font-secondary u-nww-color-secondary u-text-left">
			<mvt:item name="readytheme" param="banner( 'cstm_header_heatpress' )" />
		</h2>
		<div class="x-cstm-description">
			<mvt:item name="readytheme" param="contentsection( 'cstm_heatpress_desc' )" />
		</div>
	</div>
	<div class="x-cstm-form__wrapper o-layout__item u-cstm-width-10 u-cstm-width-4--l">
		<mvt:item name="readytheme" param="contentsection( 'cstm_form' )" />
	</div>
</div>
<div class="o-layout">
	<div class="x-cstm-steps__wrapper  o-layout__item">
		<mvt:item name="readytheme" param="contentsection( 'cstm_heatpress_tables' )" />
		<mvt:item name="readytheme" param="contentsection( 'cstm_screenprinting_heatpress_steps' )" />
	</div>
</div>

```

It is important to note that what you will be pasting is merely for structure. Structure can change based on the layout. You can create the Readytheme items at anytime. We prefer to create them after the structure is in place for ease of editing. It is easier to see what you are working on when the structure is in place, as opposed to separate pieces. 

## Page Setup
1. Navigate to User Catalog > Add Category
2. Click "+" to create a new category and add a code and category title. We recommend using a common delimiter to group together custom page types (ex: CSTM_).
3. Assign the alternative display page "CTGY_CSTM".
4. Paste template code for content into the category header.
	- We will be replacing the Readytheme items from top down.
5. If the structure of the page will be changing(3 column layout? 1? More rows?), do this first.
5. Go to Readytheme > Banner > Create new banner, this will be the header of your page.
	- Keep track of the new codes for the items. We find it best to work out of two tabs and copy and paste over updated items as they are created.
		- The full item mvt tag can be found under the Readytheme Item code. This is what you will want to paste into your template.
6. Create new Readytheme elements based on the needs of the page.
	- It is recommended to get all extentions/elements from pre existing templates and then pinpointing what needs to change about the data, this way you are not writing code from scratch.
7. The following extentions require that you go into User Interface > CSS Resources and add their css to the page.
	- Show Toggle
8. Check your work. Load the category in your browser and double check that everything is there and working correctly. (View On Live Store)
9. We will assume you are adding on to the Customization template. Assign CSTM_MAIN are the Parent Category.
10. Go to CTGY_CSTM > Content

```html
	
	Miva will not allow for SVG icon uploads through the admin. We recommend SVG as the preferred icon format, but you can use a PNG. Do not use any other format. Upload the icon to themes/shadows/core/images and assign the icon to its category/page.

	<mvt:if expr="'EMBROIDERY' CIN l.settings:subcategory:code">
		<mvt:assign name="l.settings:subcategory:icon" value="g.theme_path $ '/core/images/cstm_embroidery.svg'" />
	<mvt:elseif expr="'HEATPRESS' CIN l.settings:subcategory:code">
		<mvt:assign name="l.settings:subcategory:icon" value="g.theme_path $ '/core/images/cstm_heatpress.svg'" />
	<mvt:elseif expr="'SCREENPRINT' CIN l.settings:subcategory:code">
		<mvt:assign name="l.settings:subcategory:icon" value="g.theme_path $ '/core/images/cstm_screenprinting.svg'" />
	</mvt:if>

```




