$(document).ready( function(){

	(function () {
		'use strict';
		

		var contactForm = document.querySelector('[data-hook="customization-contact-form"]');

		if (contactForm) {
			var contactFormAction = contactForm.getAttribute('data-action');
			var contactFormButton = document.querySelector('[data-hook="customization-contact-form__submit"]');

			contactForm.classList.remove('u-hidden');

			/**
			 * Unlock the form if the user is utilizing a touch interface.
			 */
			window.addEventListener('touchstart', function touchedForm() {
				contactForm.setAttribute('action', contactFormAction);
				contactFormButton.removeAttribute('disabled');
				window.removeEventListener('touchstart', touchedForm, false);
			}, false);

			/**
			 * Unlock the form if the user can hover over elements.
			 */
			window.addEventListener('mouseover', function mouseForm() {
				contactForm.setAttribute('action', contactFormAction);
				contactFormButton.removeAttribute('disabled');
				window.removeEventListener('mouseover', mouseForm, false);
			}, false);

			$(contactForm).submit(function(e) {

				e.preventDefault(); // avoid to execute the actual submit of the form.

			    var url = $(contactForm).attr('action');

			    $.ajax({
		            type: "POST",
		            url: url,
		            data:$(contactForm).serialize(), // serializes the form's elements.
		            success: function(data)
		            {
		                $('.x-messages--success').removeClass('u-hidden');
		            },
		            fail: function(data) {
		           		$('.x-messages--error').removeClass('u-hidden');
		            }
			    });

			    
			});

		}

	})();

});