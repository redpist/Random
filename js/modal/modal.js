(function($){
  activeRmodal = new Array();
  startingRmodalZindex = 4242;
  relativeRmodalZindex = 0;
  $.fn.extend({ 
    Rmodal: function(options) {
      var defaults = {
        // success: function() {
        //  if ($(this).attr('method') == 'post') {
        //    //post
        //    $.post($(this).serialize(), $(this).attr('action'), )
        //  } else {
        //    //get
        //  }
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
      options = $.extend(defaults, options);

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

            console.log('register modal : ' + modalSelector);
            console.log('z-index : ' +  startingRmodalZindex);
            $(overlay).css({
              'display': 'block',
              'z-index': startingRmodalZindex + relativeRmodalZindex
            });
            $(modalSelector).css({
              'margin-top': 0,
              'margin-left': -($(modalSelector).outerWidth() / 2),
              'display': 'block',
              'z-index': startingRmodalZindex + relativeRmodalZindex + 1
            });

            function closeModal(modalSelector) {
              closeCallback(modalSelector);
              $(overlay).css('display', 'none');
              $(document).unbind("keyup", activeRmodal[activeRmodal.length - 1]);
              activeRmodal.pop();
              if (activeRmodal.length != 0)
                $(document).keyup(activeRmodal[activeRmodal.length - 1]);
              relativeRmodalZindex -= 2;
            };

            $(overlay).click(function () {
              closeModal(modalSelector);
            });

            if (activeRmodal.length != 0)
              $(document).unbind("keyup", activeRmodal[activeRmodal.length - 1]);
              activeRmodal.push(function(event) {
              if (event.which == 27) {
                closeModal(modalSelector);
                return false;
              }
            });
            $(document).keyup(activeRmodal[activeRmodal.length - 1]);
            relativeRmodalZindex += 2;
          };

          if (modal[0] === '#') {
            openModal(modalSelector, function(modalSelector) {
              $(modalSelector).css('display', 'none');
            });
          } else {
            modalSelector = $('<div class="rmodal-modal"></div>');
            $("body").append(modalSelector);
            $.get(modalUrl, function(data) {
              $(modalSelector).html(data);
            }, 'html');
            openModal(modalSelector, function(modalSelector) {
              $(modalSelector).remove();
            });
          }
          return false;
        });
      });
    }
  });  
})(jQuery);
