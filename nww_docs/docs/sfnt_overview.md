# Storefront

The storefront makes heavy use of Readytheme items. Due to this, it has been bootstrapped together using two core Readytheme Content Sections (listed below). This has been done to dissect the data from the items vs dropping them in and to make use of transients. 

### Storefront: Data

```html

<mvt:item name="readytheme" param="contentsection( 'sfnt_data' )" />

```

### Storefront: Main Template

```html

<mvt:item name="readytheme" param="contentsection( 'sfnt_template' )" />

```

## Resources

- CSS: ui/css/pages/sfnt.css
- JS: ui/js/pages/sfnt.js

## Components of the Storefront

- [Hero/ B&W Services](#hero-bw-services)
- [Customization Tabs and Videos](#customization-tabs)
- [Featured Categories](#featured-categories)
- [Featured Products](#featured-products)
- [Featured Brands](#featured-brands)
- [Instagram Feed](#instagram-feed)


### Hero/ B&W Services

These sections feature full screen background images that have black and white semi transparent overlays that are added in with CSS. This means we can upload colored images and we should only focus on correct image dimensions and optimization.

##### Suggested Dimensions:

- Mobile: 767x500px
- Tablet: 1200x830px
- Desktop: 1800x850px

###### ***Heights can be variable, but shouldnt be less than 760px***

**Desktop Image is the "controller" for the entire section.** 

- "Image Alt" will also populate the header text.
- "Link" will populate the button text and link. "Shop LINK NAME"

##### Associated JS Functions

- responsiveBgs(): reads the source of the <picture> element and assigns it as the background image.
- Custom lazyload is attached to ***.x-hero--bg-lazy*** on all hero/service sections.
- Custom smooth lazyload for Hero ONLY, attachs ***is-loaded*** after page load.

### Customization Tabs and Videos

We are using videos locally by uploading them to the server under graphics/00000001/video-assets. Placeholder and Video file names **must** be the same. The filename will be the message of the Banner Readytheme item. 

-To use a placeholder only, mark the Banner as 'Inactive'. This will remove the playhead but keep the placeholder image.
-To use a Youtube embed video, copy and paste the url src rom the Youtube Embed link.

```html

<iframe width="560" height="315" src="https://www.youtube.com/embed/vnMbZPYz2AY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```

We can also drop in Youtube video embeds. They are lazy loaded in, example:

```html

<iframe width="100%" height="600" class="x-iframe-video-lazy" data-src="&mvt:global:customization:video_url:message;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```

##### Associated JS Functions

- customVideoInit(): attaches custom video player.
- Custom lazyload is attached to ***.x-img-lazy*** on .mp4 videos and ***.x-iframe-video-lazy*** on Youtube videos

##### Extensions

- [Flex Tabs](https://docs.miva.com/readytheme-shadows/extensions.html#flex-tabs)

##### Associated JS Functions

- customVideoInit(video): Custom Video Player

### Featured Categories

The background expanding images have a white overlay loaded in with CSS, colored images should be used.

##### Associated JS Functions

- slickJS on Mobile and Tablet. Lazyloaded.
- AOS on Desktop.

##### Suggested Dimensions:

- Background Expanding Image: 161x240px
- Product Overlay Image: 217x250px

### Featured Products

These products pull from the 'featured_prods' category and outputs the first 5. The last product will be in the center of the grid and is the only location for an "outfit" display type.

To pull in an "Outfit" Image (Tall center product), upload the photo to the desired product and assign it to the "Product: Outfit" image type. Set this product to be the 5th in display order for the "featured_prods" category.

##### Suggested Dimensions:

- Outfit Image: 208x683px

##### Associated JS Functions

- slickJS on Mobile and Tablet. Lazyloaded.
- AOS on Desktop, see Readytheme Product Listing for data assignments.

### Featured Brands

##### Associated JS Functions

- slickJS on Mobile and Tablet. Lazyloaded.
- brand.addEventListener('click', brandsAjax): Loads in new category listing with AJAX and reinits slickJS
- AOS on Desktop, see Readytheme Product Listing for data assignments.

### Instagram Feed

[Instagram Feed](http://blog.merchant.local/?p=4853) integration.

##### Associated JS Functions

- slickJS. Lazyloaded.

