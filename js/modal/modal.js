(function($){
  activeRmodal = new Array();
  rmodalZindex = 4242;
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

          function openModal(modalSelector, overlay, closeCallback) {
            $(overlay).css({
              'display': 'block',
              'z-index': rmodalZindex
            });
            $(modalSelector).css({
              'margin-top': 0,
              'margin-left': -($(modalSelector).outerWidth() / 2),
              'display': 'block',
              'z-index': rmodalZindex + 1
            });
            rmodalZindex += 2;

            function closeModal(modalSelector) {
              closeCallback(modalSelector);
              $(activeRmodal[activeRmodal.length - 1][1].overlay).css('display', 'none');
              $(document).unbind('keyup', activeRmodal[activeRmodal.length - 1][0]);
              $(activeRmodal[activeRmodal.length - 1][1].overlay).unbind('click', activeRmodal[activeRmodal.length - 1][1]);
              activeRmodal.pop();
              if (activeRmodal.length > 0) {
                $(document).bind('keyup', activeRmodal[activeRmodal.length - 1][0]);
                $(activeRmodal[activeRmodal.length - 1][1].overlay).bind('click', activeRmodal[activeRmodal.length - 1][1]);
              }
              rmodalZindex -= 2;
            };

            if (activeRmodal.length > 0)
            {
              $(document).unbind('keyup', activeRmodal[activeRmodal.length - 1][0]);
              $(activeRmodal[activeRmodal.length - 1][1].overlay).unbind('click', activeRmodal[activeRmodal.length - 1][1]);
            }

            activeRmodal.push(Array(function(event) {
              if (event.which == 27) {
                closeModal(modalSelector);
                return false;
              }
            }, function() {
              closeModal(modalSelector);
              return false;
            }));

            $(document).bind('keyup', activeRmodal[activeRmodal.length - 1][0]);
            $(overlay).bind('click', activeRmodal[activeRmodal.length - 1][1]);
            activeRmodal[activeRmodal.length - 1][1].overlay = overlay;
          };

          if (modal[0] === '#') {
            openModal(modalSelector, overlay, function(modalSelector) {
              $(modalSelector).css('display', 'none');
            });
          } else {
            modalSelector = $('<div class="rmodal-modal"></div>');
            $("body").append(modalSelector);
            $.get(modalUrl, function(data) {
              $(modalSelector).html(data);
            }, 'html');
            openModal(modalSelector, overlay, function(modalSelector) {
              $(modalSelector).remove();
            });
          }
          return false;
        });
      });
    }
  });  
})(jQuery);
