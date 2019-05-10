# Customization: Components

### Show Toggle (Read More) 

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

### Form

```html
    
    This has already been coded, you should not need to change this unless adjusting the form template itself. If you do this, make sure to double check the form action which is found under page code CSFM. The CSS and JS can be found under theme/shadows/extensions/customization

    To include, use this tag. Optimized for the Customization layout.

    <mvt:item name="readytheme" param="contentsection( 'cstm_form' )" />

    The form uses the same logic as the contact us form with the addition of ajax to send the form, for smoother UX.

    extensions/customization/x-cstm-form.js

```
### Tables

```html
    
    Each table has been slightly modified for the page it is on. Update yours as needed with CSS.

    <div class="x-cstm-table__wrapper o-layout o-layout--justify-between o-layout--align-top">
        <div class="x-cstm-table__column o-layout__item">
            <table class="c-table-simple x-cstm-table u-flex o-layout--column">
                <thead>
                    <tr class="c-table-simple__row">
                        <th class="c-table-simple__cell">
                            <h3 class="x-cstm-header u-font-secondary u-nww-color-secondary">Fees for Embroidery</h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="x-cstm-table-row u-flex c-table-simple__row">
                        <td class="x-cstm-table__label x-cstm-table-column c-table-simple__cell">
                            <span class="u-text-bold u-text-uppercase">First line of text</span>
                        </td>
                        <td class="x-cstm-table__value x-cstm-table-column u-text-center c-table-simple__cell">
                            <span class="u-text-bold u-cstm-color-red">
                                +$6.50
                            </span>
                        </td>
                    </tr>
                    <tr class="x-cstm-table-row u-flex c-table-simple__row">
                        <td class="x-cstm-table__label x-cstm-table-column c-table-simple__cell">
                        <span class="u-text-bold u-text-uppercase">Each additional line</span>
                    </td>
                    <td class="x-cstm-table__value x-cstm-table-column u-text-center c-table-simple__cell">
                        <span class="u-text-bold u-cstm-color-red">
                            +$3.00
                        </span>
                    </td>
                    </tr>
                    <tr class="x-cstm-table-row u-flex c-table-simple__row">
                        <td class="x-cstm-table__label x-cstm-table-column c-table-simple__cell">
                            <span class="u-text-bold u-text-uppercase">Each Stock Logo Design</span>
                        </td>
                        <td class="x-cstm-table__value x-cstm-table-column u-text-center c-table-simple__cell">
                            <span class="u-text-bold u-cstm-color-red">
                                +$8.00
                            </span>
                        </td>
                    </tr>
                    <tr class="x-cstm-table-row u-flex c-table-simple__row">
                        <td class="x-cstm-table__label x-cstm-table-column c-table-simple__cell">
                            <span class="u-text-bold u-text-uppercase">Waterproof Spray</span>
                        </td>
                        <td class="x-cstm-table__value x-cstm-table-column u-text-center c-table-simple__cell">
                            <span class="u-text-bold u-cstm-color-red">
                                +$10.00
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="x-cstm-table__column o-layout__item">
            <table class="c-table-simple x-cstm-table u-flex o-layout--column">
                <thead>
                    <tr class="c-table-simple__row">
                        <th class="c-table-simple__cell">
                            <h3 class="x-cstm-header u-font-secondary u-nww-color-secondary">Call for Pricing</h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="x-cstm-table-row u-flex c-table-simple__row">
                        <td class="x-cstm-table__label x-cstm-table-column c-table-simple__cell">
                            <span class="u-text-bold u-text-uppercase">Back Embroidery</span>
                            <span>Based on size and stitch count</span>
                        </td>
                    </tr>
                    <tr class="x-cstm-table-row u-flex c-table-simple__row">
                        <td class="x-cstm-table__label x-cstm-full-column x-cstm-table-column c-table-simple__cell">
                            <span class="u-text-bold u-text-uppercase">Flame Resistant Nomex Thread</span>
                        </td>
                    </tr>
                    <tr class="x-cstm-table-row u-flex c-table-simple__row">
                        <td class="x-cstm-table__label x-cstm-skinny-column x-cstm-table-column c-table-simple__cell">
                            <span class="x-cstm-flag u-nww-bg-secondary u-color-white u-text-bold u-text-uppercase u-inline-block">Optional</span>
                            <span class="u-block">To bag individual employee uniforms by name</span>
                        </td>
                        <td class="x-cstm-table__value x-cstm-skinny-column x-cstm-table-column u-text-center c-table-simple__cell">
                            <span class="u-force-center u-text-bold u-cstm-color-red">+$0.52</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    


```

### Steps

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

### Navigation

```html
    
    Two types of navigation are available:
        - Native Subcategories for linking within the shared section of the website to make use of breadcrumbs.
        - Readytheme Navigation Sets for call to action linking to specific categories, products, or anything that is not part of the shared section.

    We are using two should you decide you want both types of linking on a single page.

```