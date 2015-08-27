$(document).ready(function() {

	// Preloader
	$(window).load(function(){
		$('.preloader').fadeOut();
		$("#vy_iframe").hide();
	});

	// Datepicker Options
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

	var checkin = $('#check_in').datepicker({
	  onRender: function(date) {
		return date.valueOf() < (now.valueOf()+259200000) ? 'disabled' : '';
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

	$('select#select_guests').change(function(){

		var sel_value = $('option:selected').val();
		if(sel_value==0)
		{
			//Resetting Form
			//$("#form_submit").empty();
			$("#selected_guests_other").css({'display':'none'});
			$("#input_group_guests").css({'border':'none'});
			$("#select_guests").css({'border':'1px solid #ccc'});
			$("#input_group_addon_guests").css({'border':'1px solid #ccc'});
			$("#input_group_addon_guests").css({'border-right':'none'});
		}
		else{
			//Resetting Form
			//$("#form_submit").empty();
			$("div#selected_guests_other").slideDown('slow');
			$("#input_group_guests").css({'border':'1px solid #FFF','border-radius':'3px'});
			$("#select_guests").css({'border':'none'});
			$("#input_group_addon_guests").css({'border':'none'});
			}
	});

	$('select#select_children').change(function(){

		var sel_value = $('#select_children option:selected').val();
		if(sel_value==0)
		{
			//Resetting Form
			$("#children").empty();
			$("#wrap_children").css({'display':'none'});
		}
		else{
			//Resetting Form
			$("#children").empty();
			$("div#wrap_children").slideDown('fast');
			//
			create(sel_value);
			}
	});

function create(sel_value){
	for(var i=1;i<=sel_value;i++){
	    $("div#children").append(' <select class="" name="child' + i + '" id="child' + i + '"><option value="0" selected="selected">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option></select> ')
    }
}
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
	$(window).on("resize load", function () {
		if ($(document).width() < 768) {
				$('.navbar').removeClass('vy-newnav');
			} else {
				$('.navbar').addClass('vy-newnav');
			}
	});
	$(window).scroll(function() {
	    if ($(window).scrollTop() > 300) {
			$('.navbar').addClass('fixednav').removeClass('vy-newnav');
	    } else {
			if ($(document).width() > 768) {
				$('.navbar').removeClass('fixednav').addClass('vy-newnav fixednav');
			}
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
		if (  ($('#email').val().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/)) && ($('#price_max').val() != '') && ($('#check_in').val() != '') && ($('#check_out').val() != '') && ($('#price_max').val() >= 0) ) {

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
			
			$("#slogan").hide();
			$("#features").hide();
			$("#newsletter").hide();
			$("#services").hide();
			$("#services-works").hide();
			$("#reviews").hide();
			$("#vy_iframe").show();			

			$("#iframe_container").html("<iframe src=\"https://engine.woutel.com/trip-created.aspx?checking=" + $('#check_in').val() + "&checkout=" + $('#check_out').val() + "&amount=" + $('#price_max').val() + "&email=" + $('#email').val() + "&comment=" + $('#comment').val() + "&rooms=" + n_rooms + "&adults=" + n_huespedes + "\" height=\"820\" width=\"100%\" allowfullscreen=\"\" frameborder=\"0\" scrolling=\"auto\"></iframe>");
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			/* PARSE Integration */
			/*var Request = Parse.Object.extend("Request");
			var request = new Request();
			request.save({
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
				  //window.location.href = "http://quimium.com/woutel/enviado.html";
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
