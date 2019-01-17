 /**
  * Load magnific for carousel on image pop up -- WIP -- pending client chat
  */
function productGallery(trigger) {
 	trigger.on('click', function (e) {
 		var startAt = Number($(this).attr('data-index'));

 		e.preventDefault();
 		if (gallery.length > 0) {
 			$.magnificPopup.open({
 				callbacks: {
 					open: function () {
 						$.magnificPopup.instance.goTo(startAt);
 					}
 				},
 				gallery: {
 					enabled: true
 				},
 				items: gallery,
 				type: 'image'
 			});
 		}
 		else {
 			$.magnificPopup.open({
 				items: {
 					src: $('#js-main-image').attr('data-image')
 				},
 				type: 'image'
 			});
 		}
 	});
}