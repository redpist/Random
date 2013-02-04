
(function($){

    $.fn.extend({ 
         Rmodal: function(options) {
         	var defaults = {
         		// success: function() {
         		// 	if ($(this).attr('method') == 'post') {
         		// 		//post
         		// 		$.post($(this).serialize(), $(this).attr('action'), )
         		// 	} else {
         		// 		//get
         		// 	}
         		// },
         		// close: true,
         		// // animation,
         		// width: false,
         		// height: false,
         		// top: 100,
         		// background
         		// closeTrigger: '.close',
         		// successTrigger: 'form',
         	};

         	options =  $.extend(defaults, options);


         	var overlay = $('<div class="rmodal-overlay"></div>');
            
            $("body").append(overlay);

            return this.each(function() {
            	var modal = $(this).attr('href');

            	if (modal[0] === '#') {
            		$(modal).addClass('rmodal-modal');
            	} else {
            		var modalUrl = modal;
    				var modal = $('<div class="rmodal-modal"></div>');
    				$("body").append(modal);
            		console.log(modalUrl + ' and ' + modal);
            	}

            	$(this).click(function(event) {
            		var openModal = function(modal, closeCallback) {
            			$(overlay).css('display', 'block');
            			$(modal).css({
            				'margin-top': 0,
            				'margin-left': -($(modal).outerWidth() / 2),
            				'display': 'block'});
            			var closeModal = function() {
            				closeCallback();
            				$(overlay).css('display', 'none');
            			};            			
	            		$(overlay).click(closeModal);
    	        		$(document).keyup(function(event) {
        	    			if (event.which == 27) {
            					closeModal();
            				}
            			});
            		};
            		if (modal[0] === '#') {
            			openModal(modal, function() {
            				$(modal).css('display', 'none');
            			});
	        		} else {
            			$.get(modalUrl, function(data) {
            				alert(data);
            			}, 'html');
            		}


            		return false;
            	});
            });
         }
    });
     
})(jQuery);
