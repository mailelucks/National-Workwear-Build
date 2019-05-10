# Category

We are using SearchSpring full integration.

This store has custom logic invloving Brands. All products should have an associated brand, which is represented through a brand/category assignment. The category for all brands **must** have a code of 'brand_BRANDNAME'. 

- Brands must be given the parent category of "brands". This allows for grouping in the category tree.
- Brands can have a logo uploaded that will be pulled into their assigned products. This will also show on 'Featured Brands'.
- Brands can also have sizecharts for clothing and footwear. 


To connect the brand customfields to products, products have their own customfield 'brand_assignment' which is a select list with all category codes for brand categories. This list is not dynamic and must be updated if a new brand is added.

- Assign the brand to the product
- Assign which sizechart to pull. Products **cannot** display more than one sizechart.