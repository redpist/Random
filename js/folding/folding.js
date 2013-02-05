(function($){
  $.fn.extend({ 
    Rfolding: function(options) {
      var defaults = {
      };
      options = $.extend(defaults, options);

      return this.each(function() {
        $(this).find('.folder').hide();
        $(this).find('.folder').each(function() {

          $(this).parent().css('cursor', 'pointer');
          $(this).css('cursor', 'auto');
          $(this).parent().click(function (folder) {
            return function(event) {
              $(folder).toggle();
              event.preventDefault();
              return false;
            };
          }(this));
        });

        $(this).find('.folder').click(function () {
          return false;
        });

      });
    }
  });
})(jQuery);