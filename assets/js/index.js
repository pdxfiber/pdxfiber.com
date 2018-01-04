---
---
(function() {
  var calendarIconColumn = $('<div class="column is-narrow">'),
    calendarIconContainer = $('<span class="icon"></span>').appendTo(calendarIconColumn),
    calendarIcon = $($('#asset-icon-calendar').text()).appendTo(calendarIconContainer);

  var placeIconColumn = $('<div class="column is-narrow">'),
    placeIconContainer = $('<span class="icon"></span>').appendTo(placeIconColumn),
    placeIcon = $($('#asset-icon-place').text()).appendTo(placeIconContainer);

  var months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  function formatTime(dt) {
    var hours = dt.getHours();
    var ampm = 'AM';

    if (hours >= 12) {
      hours -= 12;
      ampm = 'PM';
    }

    if (hours === 0) {
      hours = 12;
    }

    return hours + ':' + ('0' + dt.getMinutes()).substr(-2) + ampm;
  }

  $.ajax({
    url: '{{ site.meetup_api_url }}',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      'photo-host': 'secure',
      'page': '3',
      'status': 'upcoming',
      'sig_id': '{{ site.meetup_api_sig_id }}',
      'sig': '{{ site.meetup_api_sig }}',
    },
    success: function(response) {
      if (!$.isArray(response.data)) {
        return;
      }

      $(function() {
        $.each(response.data, function(i, event) {
          // Outer container.
          var container = $('<div class="columns pf-event"></div>');

          // Create title and description.
          var left = $('<div class="column is-three-fifths-desktop"></div>')
            .appendTo(container);

          var title = $('<p class="pf-event-title"></p>')
            .appendTo(left);
          $('<a></a>')
            .attr('href', event.link)
            .text(event.name)
            .appendTo(title);

          $('<p class="content"></p>')
            .html(event.description)
            .appendTo(left);

          // Create date and location.
          var right = $('<div class="column">')
            .appendTo(container);

          var calendarContainer = $('<div class="columns is-mobile pf-event-datetime">')
            .appendTo(right);

          calendarIconColumn
            .clone()
            .appendTo(calendarContainer);

          var calendarDataColumn = $('<div class="column"></div>')
            .appendTo(calendarContainer);

          var start = new Date(event.time);
          var end = new Date(event.time + event.duration);

          $('<div class="pf-event-date"></div>')
            .text(months[start.getMonth()] + ' ' + start.getDate() + ', ' + start.getFullYear())
            .appendTo(calendarDataColumn);

          $('<div class="pf-event-time"></div>')
            .text(formatTime(start) + '–' + formatTime(end))
            .appendTo(calendarDataColumn);

          if (event.venue) {
            var qc = [];

            var qca = $.grep([
              event.venue.address_1,
              event.venue.address_2,
              event.venue.address_3,
            ], function(a) { return !!a });

            var qcc = $.grep([
              event.venue.state.toUpperCase(),
              event.venue.zip,
            ], function(a) { return !!a });

            qc.push(qca.join(' '));
            qc.push(event.venue.city);
            qc.push(qcc.join(' '));
            qc.push(event.venue.country);

            qc = $.grep(qc, function(a) { return !!a });

            var query = encodeURIComponent(qc.join(', ')),
              url = 'https://www.google.com/maps/search/?api=1&query=' + query;

            var placeContainer = $('<div class="columns is-mobile pf-event-place"></div>')
              .appendTo(right);

            placeIconColumn
              .clone()
              .appendTo(placeContainer);

            var placeDataColumn = $('<div class="column"></div>')
              .appendTo(placeContainer);

            var placeName = $('<div class="pf-event-place-name"></div>')
              .appendTo(placeDataColumn);

            $('<a></a>')
              .attr('href', url)
              .text(event.venue.name)
              .appendTo(placeName);

            $('<div class="pf-event-place-address"></div>')
              .append(document.createTextNode(qca.join(' ')))
              .append($('<br>'))
              .append([event.venue.city, qcc.join(' ')].join(', '))
              .appendTo(placeDataColumn);
          }

          // Add event to DOM.
          $('#pf-events-ref').before(container);
        });
      });
    }
  });
})();
