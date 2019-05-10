# CSS Minify

We are minifying the css on this store to increase page speed. Page types that have high customization (SFNT, PROD, CTGY, etc) have their own css file. These files can be found in themes/shadows/ui/css/pages.

HEAD Template Logic:

```html

<mvt:comment> PER PAGE STYLES | GROUPED STYLES -- START </mvt:comment>

<mvt:if expr="'SFNT' CIN l.settings:page:code">
	<mvt:assign name="l.settings:css_path" value="'sfnt'" />
<mvt:elseif expr="'PROD' CIN l.settings:page:code">
	<mvt:assign name="l.settings:css_path" value="'prod'" />
<mvt:elseif expr="'CTGY' CIN l.settings:page:code OR 'SRCH' CIN l.settings:page:code OR 'PLST' CIN l.settings:page:code OR 'shop' CIN l.settings:page:code">
	<mvt:if expr="'CSTM' CIN l.settings:category:code">
		<mvt:assign name="l.settings:css_path" value="'customization'" />
	<mvt:else>
		<mvt:assign name="l.settings:css_path" value="'ctgy_srch_plst'" />
	</mvt:if>
<mvt:elseif expr="l.settings:page:code EQ 'BASK' OR l.settings:page:code EQ 'BSKE' OR l.settings:page:code EQ 'ORDL' OR l.settings:page:code EQ 'OCST' OR l.settings:page:code EQ 'OPAY' OR l.settings:page:code EQ 'OUS1' OR l.settings:page:code EQ 'OUSM' OR l.settings:page:code EQ 'UATM' OR l.settings:page:code EQ 'UATR' OR l.settings:page:code EQ 'OSEL' OR l.settings:page:code EQ 'OPAY'">
	<mvt:assign name="l.settings:css_path" value="'bask'" />
<mvt:else>
	<mvt:assign name="l.settings:css_path" value="'pages'" />
</mvt:if>

<mvt:comment>
	Path Assignment
</mvt:comment>
<mvt:assign name="l.settings:custom_css:path" value="g.theme_path $'/ui/css/pages/'$ l.settings:css_path $ '.css'" />
<mvt:assign name="l.settings:custom_css:path_mini" value="g.theme_path $'/ui/css/mini/'$ l.settings:css_path $ '.min.css'" />

<mvt:comment>
	Does this exist?
</mvt:comment>
<mvt:assign name="l.settings:custom_css:exists_mini" value="sexists( '/mm5/' $ l.settings:custom_css:path_mini )" />

<mvt:if expr="l.settings:custom_css:exists_mini">
	
	<mvt:comment>
		Has this page css been updated recently?
	</mvt:comment>

	<mvt:assign name="l.settings:custom_css:time" value="stime( '/mm5/' $ l.settings:custom_css:path )" />
	<mvt:assign name="l.settings:custom_css:time_mini" value="stime( '/mm5/' $ l.settings:custom_css:path_mini )" />

	<mvt:if expr="l.settings:custom_css:time GT l.settings:custom_css:time_mini">

		<mvt:comment>
			trigger task to create mini
		</mvt:comment>
		<mvt:call action="'https://' $ g.domain:name $ '/mini.html?Feed_AccessKey=nwwCSS'" method="'GET'"></mvt:call>
		<link rel="stylesheet" href="<mvt:eval expr="l.settings:custom_css:path_mini" />?v=<mvt:eval expr="l.settings:custom_css:time_mini" />">

	<mvt:else>

		<link rel="stylesheet" href="<mvt:eval expr="l.settings:custom_css:path_mini" />?v=<mvt:eval expr="l.settings:custom_css:time_mini" />">
	</mvt:if>

<mvt:else>

	<mvt:item name="readytheme" param="contentsection( 'readytheme_styles' )" />

</mvt:if>

<mvt:comment> PER PAGE STYLES | GROUPED STYLES -- END </mvt:comment>

```

## Associated Items

##### Marketing Feed

code | details
--- | ---
minify_css | URI Access key is needed to access feed. Attached to scheduled task that runs daily. [Click here](https://nationalworkwear.mivamerchant.net/mini.html?Feed_AccessKey=nwwCSS) if changes to site-styles.css need to be seen right away.

##### Scheduled Task

name | details
--- | ---
Minify CSS | Runs daily.


##### Server

file name | details
--- | ---
minify_css.php | Built Using [https://github.com/matthiasmullie/minify](https://github.com/matthiasmullie/minify). Fiy
