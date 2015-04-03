$(document).ready(function() {

	// Preloader
	$(window).load(function(){
		$('.preloader').fadeOut();
	});

	// Datepicker Options
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

	var checkin = $('#check_in').datepicker({
	  onRender: function(date) {
		return date.valueOf() < now.valueOf() ? 'disabled' : '';
	  }
	}).on('changeDate', function(ev) {
	  if (ev.date.valueOf() > checkout.date.valueOf()) {
		var newDate = new Date(ev.date)
		newDate.setDate(newDate.getDate() + 1);
		checkout.setValue(newDate);
	  }
	  checkin.hide();
	  $('#check_out')[0].focus();
	}).data('datepicker');
	var checkout = $('#check_out').datepicker({
	  onRender: function(date) {
		return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
	  }
	}).on('changeDate', function(ev) {
	  checkout.hide();
	}).data('datepicker');



	///


	// Initiat WOW.js
	var wow = new WOW(
	  {
	  	mobile: false
	  }
	);
	wow.init();

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

	// Fixed navigation
	$(window).scroll(function() {
	    if ($(window).scrollTop() > 500) {
	        $('.navbar').addClass('fixednav');
	    } else {
	    	$('.navbar').removeClass('fixednav');
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
	// Testemonial carousel
	$(".testemonials").owlCarousel({
		autoPlay: 8000,
		autoHeight : true,
		singleItem: true,
		navigation: false,
		itemsDesktop: [1000, 1],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        itemsMobile: false
	});

	// Bootstrap Tab navigation
	$('.tabs a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	Parse.initialize("f7MCAXWYuNaRlLXkbbciOLGoaQzSXqNInlOJ60JC", "72lJ8dvBy8p6kfyrbhucntRvpKhR7Sh5oALeMATu");

	$('#send_request').click(function () {
		if (  ($('#email').val().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/)) && ($('#price_max').val() != '') && ($('#check_in').val() != '') && ($('#check_out').val() != '') ) {

			var Request = Parse.Object.extend("Request");
			var request = new Request();
			request.save({
			   num_guests: $('#num_guests').val(),
			   price_max: $('#price_max').val(),
			   check_in: $('#check_in').val(),
			   check_out: $('#check_out').val(),
			   comment: $('#comment').val(),
			   email: $('#email').val()
			}, {
				success: function(object) {
					if (typeof ga !== 'undefined') {
						ga('send', 'event', 'Requat', 'submitted');
					}
				  // Change to message
				  $("#contact_form").hide();
				  $("#on_submit_message").show();
				},
				error: function(model, error) {
					console.log(error);
				alert("Error sending data to backend");
				}
			});
		}
		else {alert("Debe introducir correctamente los campos obligatorios.");}
	});
});
