	// ---- Tell A Friend Control ---- //
		function tellAFriend () {
		    var $tafWrap = $('#js-tell-a-friend-wrap'),
		        $tafForm = $('#js-tell-a-friend'),
		        $tafName = $('#js-tafName'),
		        $tafEmail = $('#js-tafEmail'),
		        $tafFriendEmail = $('#js-tafFriendEmail'),
		        $tafComment = $('#l-tafComment'),
		        $validationErrors = $('#tell-a-friend-validation-errors'),
		        $processing = $('#tell-a-friend-processing'),
		        $success = $('#tell-a-friend-success'),
		        $error = $('#js-error');

		    // ---- Open Tell-A-Friend Form ---- //
		    $('.prod').on('click', '#js-open-tell-a-friend', function (e) {

		    	e.preventDefault();

		        // ---- Additional Server Security To Help Against Spambots ---- //
		        $.get('/mm5/' + theme_path + '/forms/token.php', function (tkn) {
		            $('#js-tell-a-friend').append('<input type="hidden" name="mms" value="' + tkn + '" />');
		        });

		        $.magnificPopup.open({
		        	items: {
		        		src: $tafWrap
		        	},
		            type: 'inline',
		            focus: $tafName,
		            callbacks: {
		            	afterClose: function() {
		            		$('.cancel-btn').trigger('click');
    		                $tafForm.find('fieldset').show();
    		                $($validationErrors, $processing, $success, $error).hide();
		            	}
		            }
		        });

		    });

		    $tafForm.on('click', 'a, input[type="reset"]', function (e) {
		        $tafForm.trigger('close');
		    });

		    // ---- AJAX Tell A Friend Form ---- //
		    $(document).on('submit', '#js-tell-a-friend', function (e) {
		        // Validate form fields
		        var tafName = $('#js-tafName').val(),
		            tafEmail = $('#js-tafEmail').val(),
		            tafFriendEmail = $('#js-tafFriendEmail').val(),
		            tafMessage = $('#l-tafComment').val(),
		            errorMessagesWrap = $('#tell-a-friend-validation-errors'),
		            errorMessages = errorMessagesWrap.find('ul');


		        if (tafName.length === 0) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Please enter your name!');
		            e.preventDefault();
		        }
		        else if (!isValidEmailAddress(tafEmail)) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Your email address is invalid!');
		            e.preventDefault();
		        }
		        else if (!isValidEmailAddress(tafFriendEmail)) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Your friend\'s email address is invalid!');
		            e.preventDefault();
		        }
		        else if (tafMessage.length === 0) {
		            errorMessagesWrap.fadeIn();
		            errorMessagesWrap.text('Please write a message to your friend!');
		            e.preventDefault();
		        }
		        else {
		            // Check the form is not currently submitting
		            if ($(this).data('formstatus') !== 'submitting') {
		                // Set up variables
		                var form = $(this),
		                    formData = form.serialize(),
		                    formUrl = form.attr('action'),
		                    formMethod = form.attr('method');

		                // Add status data to form
		                form.data('formstatus', 'submitting');

		                // Show processing message
		                $(this).find('fieldset').hide();
		                $('#tell-a-friend-processing').show();

		                // Send data to server for validation
		                $.ajax({
		                    url: formUrl,
		                    type: formMethod,
		                    data: formData,
		                    success: function(data, textStatus, jqXHR) {
		                        // Hide processing message, show success message and reset formstatus
		                        $('#tell-a-friend-processing').hide();
		                        if (data.search(/error/i) != -1) {
		                            $('#tell-a-friend-validation-errors').text(data).show();
		                        }
		                        else {
		                        	$($tafName, $tafEmail, $tafFriendEmail, $tafComment).empty();
		                        	$('#tell-a-friend-validation-errors').hide();
		                        	$($success).show();
		                        	setTimeout( function(){
		                        		$tafForm.find('fieldset').show();
		                        		$.magnificPopup.close();
		                        		$validationErrors.hide();
		                        		$processing.hide();
		                        		$success.hide();
		                        		$error.hide();
		                        	}, 3000);

		                        }
		                        form.data('formstatus', 'idle');
		                    },
		                    error: function (jqXHR, textStatus, errorThrown) {
		                        // Hide processing message, show error message and reset formstatus
		                        //console.log(errorThrown);
		                        form.data('formstatus', 'idle');
		                    }
		                });
		            }
		        }

		        // Prevent form from submitting
		        e.preventDefault();
		    });

		    if( window.location.hash === '#tell-a-friend' ){
		        $('#js-open-tell-a-friend').trigger('click');
		    }
		}
		tellAFriend();