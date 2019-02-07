# Custom Pages
This is a guide for creating custom pages within the Miva Admin.

First, gather the following:
1. Templates for "Details" tab and "Content" tab.
2. Required Items list.
3. Know which special elements you will want on this page. This will help to determine which pre-existing content to pull from.
	- Show Toggle (Read More)
	- Form
	- Tables
	- Steps
	- Navigation

Details Template:
```html
<mvt:item name="html_profile" />
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<base href="&mvt:global:basehref;">
	<mvt:if expr="NOT ISNULL l.settings:page:title">
		<title>&mvt:page:title;</title>
	<mvt:else>
		<title>&mvt:store:name;: &mvt:page:name;</title>
	</mvt:if>
	<mvt:item name="head" param="css_list" />
	<mvt:item name="head" param="head_tag" />

</head>
<body id="js-&mvte:page:code;" class="o-site-wrapper t-page-&mvt:global:pageClass;">
	<mvt:item name="hdft" param="global_header" />

	<div class="o-layout o-layout--flush o-cstm-wrapper u-width-12">
		<section class="t-cstm-header">
			<mvt:item name="hdft" param="header" />
		</section>

		<section class="t-cstm-content u-cstm-width-10">
			<mvt:item name="content" />
		</section>
		
		<section class="t-cstm-footer">
			<mvt:item name="hdft" param="footer" />
		</section>
	</div>

	<mvt:item name="hdft" param="global_footer" />
</body>
</html>
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

It is important to note that what you will be pasting is merely for structure. Structure can change based on the layout and the page-specific Readytheme items should be changed. You can create the Readytheme items at anytime. We prefer to create them after the structure is in place for ease of editing. It is easier to see what you are working on when the structure is in place, as opposed to separate pieces. 

## Page Setup
1. Navigate to User Interface > Pages
2. Click "+" to create a new page and add a code and page title. We recommend using a common delimiter to group together custom page types (ex: CSTM_).
3. Paste template code for details into Details
4. Paste template code for content into Content.
	- We will be replacing the Readytheme items from top down.
5. If the structure of the page will be changing(3 column layout? 1? More rows?), do this first.
5. Go to Readytheme > Banner > Create new banner, this will be the header of your page.
	- Keep track of the new codes for the items. We find it best to work out of two tabs and copy and paste over updated items as they are created.
		- The full item mvt tag can be found under the Readytheme Item code. This is what you will want to paste into your page.
6. Create new Readytheme elements based on the needs of the page.
	- It is recommended to get all extentions/elements from pre existing templates and then pinpointing what needs to change about the data, this way you are not writing code from scratch.
7. The following extentions require that you go into User Interface > Javascript Resources and add their js to the page.
	- Customize Contact Form
	- Show Toggle
8. The following extentions require that you go into User Interface > CSS Resources and add their css to the page.
	- Show Toggle
9. Check your work. Load the page in your browser and double check that everything is there and working correctly.
10. If using navigation (example: CSTM_MAIN links out to CSTM_EMBROIDERY, CSTM_SCREENPRINT and CSTM_HEATPRESS), update the breadcrumbs template to take in the parent link. This is found under User Interface > Smart Breadcrumbs.
	- This is a delicate part of the website! Be careful when updating.

Smartbreadcrumbs code with update for custom pages.
```html
<nav class="x-collapsing-breadcrumbs t-breadcrumbs o-nww-wrapper" data-hook="collapsing-breadcrumbs">
	<ul class="o-list-inline x-collapsing-breadcrumbs__group u-hidden" data-hook="collapsing-breadcrumbs__group"></ul>
	<ul class="o-list-inline x-collapsing-breadcrumbs__list" data-hook="collapsing-breadcrumbs__list" itemscope itemtype="http://schema.org/BreadcrumbList">
		<li class="o-list-inline__item u-hidden" data-hook="collapsing-breadcrumbs__trigger-area">
			<button class="c-button c-button--hollow u-border-none u-color-black u-bg-transparent x-collapsing-breadcrumbs__button" data-hook="collapsing-breadcrumbs__button">&hellip;</button>
		</li>
		<li class="o-list-inline__item" data-hook="collapsing-breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
			<a class="u-color-black" href="&mvt:breadcrumbs:homelink;" title="Home" itemprop="item">
				<span itemprop="name">Home</span>
			</a>
			<meta itemprop="position" content="1" />
		</li>
		<mvt:comment>START CUSTOMIZATION CONTENT UPDATE</mvt:comment>
		<mvt:if expr="'CSTM_' CIN l.settings:page:code AND l.settings:page:code NE 'CSTM_MAIN'">
			<li class="o-list-inline__item" data-hook="collapsing-breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<a class="u-color-black" href="	&mvt:urls:cstm_main:secure;" title="Customization" itemprop="item">
					<span itemprop="name">Customization</span>
				</a>
				<meta itemprop="position" content="2" />
			</li>
			
			<mvt:comment>force position update</mvt:comment>
			<mvt:assign name="l.settings:breadcrumb:position" value="l.settings:breadcrumb:position + 1" />

		</mvt:if>
		<mvt:comment>END CUSTOMIZATION CONTENT UPDATE</mvt:comment>
		<mvt:assign name="l.settings:breadcrumb:position" value="1"/>
		<mvt:foreach iterator="cats" array="breadcrumbs:links">
			<mvt:assign name="l.settings:breadcrumb:position" value="l.settings:breadcrumb:position + 1"/>
			<mvt:if expr="l.settings:cats:name EQ '...'">
				<li class="o-list-inline__item" data-hook="collapsing-breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<a class="u-color-black" href="&mvt:cats:link;" title="&mvt:cats:name;" itemprop="item">
						<span itemprop="name">&mvt:cats:name;</span>
					</a>
					<meta itemprop="position" content="&mvt:breadcrumb:position;" />
				</li>
			<mvt:elseif expr="l.settings:cats:code EQ l.settings:breadcrumbs:current_item:code">
				<li class="o-list-inline__item u-text-bold" data-hook="collapsing-breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<a class="u-color-black" href="&mvt:cats:link;" title="&mvt:cats:name;" itemprop="item">
						<span itemprop="name">&mvt:cats:name;</span>
					</a>
					<meta itemprop="position" content="&mvt:breadcrumb:position;" />
				</li>
			<mvt:else>
				<li class="o-list-inline__item" data-hook="collapsing-breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<a class="u-color-black" href="&mvt:cats:link;" title="&mvt:cats:name;" itemprop="item">
						<span itemprop="name">&mvt:cats:name;</span>
					</a>
					<meta itemprop="position" content="&mvt:breadcrumb:position;" />
				</li>
			</mvt:if>
		</mvt:foreach>
	</ul>
</nav>
<!-- end .x-collapsing-breadcrumbs -->
```
