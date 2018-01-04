$(function() {
  $('#credits-open, #credits-close, #credits-background').click(function() {
    $('#credits-modal').toggleClass('is-active');
  });

  $('.navbar-burger').click(function() {
    $(this).toggleClass('is-active');
    $(document.getElementById($(this).data('target'))).toggleClass('is-active');
  });
});
