$(document).ready(function() {
	$('#nav').onePageNav({
    scrollOffset: 70,
		scrollSpeed: 750,
	});

	$(".carousel").swiperight(function() {
    $(this).carousel('prev');
	});
	$(".carousel").swipeleft(function() {
	    $(this).carousel('next');
	});

});

map();
contactForm();

function map() {

    var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
    map = new GMaps({
        el: '#map-contact',
        lat: 46.993844,
        lng: 8.606245,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false,
        scrollwheel: false,
        draggable: false,
        styles: styles
    });

    var image = 'images/ii_marker.png';

    map.addMarker({
      lat: 46.993844,
      lng: 8.606245,
      icon: image,
      title: 'Inderbitzin Informatik GmbH'
    });
}

function contactForm() {
		// Get the form.
		var form = $('#ajax-contact');

		// Get the messages div.
		var formMessages = $('#form-messages');

		// Set up an event listener for the contact form.
		$(form).submit(function(e) {
				// Stop the browser from submitting the form.
				e.preventDefault();

				// Serialize the form data.
				var formData = $(form).serialize();

				// Submit the form using AJAX.
				$.ajax({
						type: 'POST',
						url: $(form).attr('action'),
						data: formData
				})
				.done(function(response) {
						// Make sure that the formMessages div has the 'success' class.
						$(formMessages).removeClass('error');
						$(formMessages).addClass('success');

						// Set the message text.
						$(formMessages).text(response);

						// Clear the form.
						$('#name').val('');
						$('#email').val('');
						$('#message').val('');
				})
				.fail(function(data) {
						// Make sure that the formMessages div has the 'error' class.
						$(formMessages).removeClass('success');
						$(formMessages).addClass('error');

						// Set the message text.
						if (data.responseText !== '') {
								$(formMessages).text(data.responseText);
						} else {
								$(formMessages).text('Hoppla! Es gab einen Fehler und Ihre Nachricht wurde nicht gesendet.');
						}
				});
		});
}
