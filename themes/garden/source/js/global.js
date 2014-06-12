$('[data-track]').on('click', function(e) {

   e.preventDefault();

   var $el = $(e.currentTarget),
      target = $el.attr('href'),
      options = {
         url: window.location.pathname,
         target: target
      };

   mixpanel.track($el.data('track'), options, function() {
      window.location.href = target;
   });

});