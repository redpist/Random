
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
        		var modalSelector = modal;
        		var modalUrl = modal;

            	if (modal[0] === '#') {
            		$(modalSelector).addClass('rmodal-modal');
            	} else {
            		var modalUrl = modal;
            	}

            	$(this).click(function(event) {
            		function openModal(modalSelector, closeCallback) {
            			$(overlay).css('display', 'block');
            			$(modalSelector).css({
            				'margin-top': 0,
            				'margin-left': -($(modalSelector).outerWidth() / 2),
            				'display': 'block'});
            			var closeModal = function() {
            				closeCallback();
            				$(overlay).css('display', 'none');
            			};            			
	            		$(overlay).click(closeModal);

    	        		$(document).keyup(function(event) {
        	    			if (event.which == 27) {
        	    				console.log('close : ' + modalSelector);
            					closeModal();
        						return false;
            				}
            			});
            		};
            		if (modal[0] === '#') {
            			openModal(modalSelector, function() {
            				$(modalSelector).css('display', 'none');
            			});
	        		} else {
	    				modalSelector = $('<div class="rmodal-modal"></div>');
    					$("body").append(modalSelector);
            			$.get(modalUrl, function(data) {
            				$(modalSelector).html(data);
            			}, 'html');
            			openModal(modalSelector, function() {
            				$(modalSelector).remove();
            			});
            		}

            		return false;
            	});
            });
         }
    });
     
})(jQuery);
