$(document).ready(function() {

	// Preloader
	$(window).load(function(){
		$('.preloader').fadeOut();		
	});

	// .intro-section reduce opacity when scrolling down
	$(window).scroll(function(){
		if($(window).width() > 1260) {
			windowScroll = $(window).scrollTop();
			contentOpacity = 1 - (windowScroll / ($('#intro').offset().top+$('#intro').height()));
			$('.intro-section').css('transform','translateY('+Math.floor(windowScroll*0.16)+'px)');
			$('.intro-section').css('-webkit-transform','translateY('+Math.floor(windowScroll*0.16)+'px)');
			$('.intro-section').css('opacity',contentOpacity.toFixed(2));
		}
	});

	

	// Initiat onepageNav.js
	$('.nav').onePageNav({
		currentClass: 'current',
		'scrollOffset': 500
	});

	// Hide Mobile Nav when clicking item
	$(".nav a, .navbar-header a").click(function(event) {
		$(".navbar-collapse").removeClass("in").addClass("collapse");
	});

	/* Buttons Scroll to Div */
	$('.navbar-brand').click(function () {
		$.scrollTo('.intro', 1000);
	return false;
	});

	$('.btn-custom').click(function () {
		$.scrollTo('.download', 1000);
	return false;
	});

	$('.btn-custom-border, a.mouse').click(function () {
		$.scrollTo('.features', 1000);
	return false;
	});
	

	
	$('#send_request').click(function () {		
		if (  ($('#email').val().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/)) && ($('#price_max').val() != '') && ($('#check_in').val() != '') && ($('#check_out').val() != '') ) {

			if ($('#select_guests').val() == '1'){
				var n_rooms = $('#select_rooms').val();
				var n_guests = parseInt($('#select_people').val());
				n_guests = String(n_guests);
				var children = $('#select_children').val();
				var children_ages = '';
				for(var i=1;i<=children;i++){
					children_ages += '-' + $('#child' + i).val();
				}
				(children != '0') ? children = children_ages.substring(1) : children = '0';
				var n_huespedes = n_guests + "&ages=" + children;
			}else{
				var n_rooms = '1';
				var n_guests = '2';
				var children = '';
				var n_huespedes = n_guests;
			}
			
			window.location.href = "https://engine.woutel.com/trip-created.aspx?checking=" + $('#check_in').val() + "&checkout=" + $('#check_out').val() + "&amount=" + $('#price_max').val() + "&email=" + $('#email').val() + "&comment=" + $('#comment').val() + "&rooms=" + n_rooms + "&adults=" + n_huespedes;		

			//alert(num_rooms + '.' + num_guests + '.' + children);
			//var Request = Parse.Object.extend("Request");
			//var request = new Request();
			/*request.save({
			   num_rooms: n_rooms,
			   num_guests: n_guests,
			   d_children: children,
			   price_max: $('#price_max').val(),
			   check_in: $('#check_in').val(),
			   check_out: $('#check_out').val(),
			   comment: $('#comment').val(),
			   email: $('#email').val()
			}, {
				success: function(object) {
					if (typeof ga !== 'undefined') {
						ga('GAWOUTEL.send', 'event', 'Request', 'submitted');
					}
				  // Change to message
				  //$("#contact_form").hide();
				  //$("#on_submit_message").show();
				  window.location.href = "http://quimium.com/woutel/enviado.html";
				},
				error: function(model, error) {
					console.log(error);
				alert("Error sending data to backend");
				}
			});	*/	
		}
		else {alert("You must correctly enter the required fields.");}
	});
});
