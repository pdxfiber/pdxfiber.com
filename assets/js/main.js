$(function() {
  $('#credits-open, #credits-close, #credits-background').click(function() {
    var modal = $('#credits-modal');
    var hidden = modal.attr('aria-hidden') === 'true';

    modal.attr('aria-hidden', !hidden);
    modal.toggleClass('is-active', hidden);
  });

  $('.navbar-burger').click(function() {
    $(this).toggleClass('is-active');
    $(document.getElementById($(this).data('target'))).toggleClass('is-active');
  });

  $('a.pf-gallery-link[href]').click(function() {
    var target = $(this).attr('href');

    var modal = $('<div class="modal pf-gallery-modal is-active"></div>');

    function close() {
      modal.attr('is-active', false).remove();
    }

    $('<div class="modal-background"></div>')
      .click(close)
      .appendTo(modal);

    var content = $('<div class="modal-content"></div>')
      .appendTo(modal);

    var imageContainer = $('<p class="image"></p>')
      .appendTo(content);

    var image = $('<img></img>')
      .attr('src', target)
      .appendTo(imageContainer);

    $('<button class="modal-close is-large" aria-label="close"></button>')
      .click(close)
      .appendTo(modal);

    modal.appendTo($(document.body));

    // Stop further processing of the click event.
    return false;
  });
});
