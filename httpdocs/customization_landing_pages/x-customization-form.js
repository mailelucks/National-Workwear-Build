$(document).ready( function(){

	(function () {
		'use strict';
		

		var contactForm = document.querySelector('[data-hook="cstm-contact-form"]');

		if (contactForm) {
			var contactFormAction = contactForm.getAttribute('data-action');
			var contactFormButton = document.querySelector('[data-hook="cstm-contact-form__submit"]');

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

			function isEmail(email) {
			  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			  return regex.test(email);
			}

			$(contactForm).submit(function(e) {

				e.preventDefault(); // avoid to execute the actual submit of the form.

				$('label').removeClass('x-cstm-error');
				$('.x-messages--error').addClass('u-hidden');
				$('.x-messages--success').addClass('u-hidden');

			    var url = $(contactForm).attr('action'),
			    	verify = $('#verify').val(),
			    	decode = window.atob(verify),
			    	human = $('#contactHuman').val(),
			    	email = $('#contactEmail').val();

			    	email = isEmail(email);

			    $.ajax({
		            type: "POST",
		            url: url,
		            data:$(contactForm).serialize(), // serializes the form's elements.
		            success: function(data)
		            {
		            	if( human != decode) {
		            		$('.x-messages--error').removeClass('u-hidden');
		            		$('label[for="contactHuman"]').addClass('x-cstm-error');
		            	} 

		            	if(!email) {
		            		$('.x-messages--error').removeClass('u-hidden');
		            		$('label[for="contactEmail"]').addClass('x-cstm-error');
		            	}

		            	if( human == decode && email) {
		            		$('.x-messages--success').removeClass('u-hidden');
		            	}
		                
		            }
			    });
			    
			});

		}

	})();

});