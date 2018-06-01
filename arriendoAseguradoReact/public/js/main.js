
$(document).ready(function(){
	var home, comuna, address, depto, typo_pago, first_name, last_name, email, phone, password, password_confirmation, initDate, diaContrato, plazoContrato, montoMensual, multa;
	var first_nameArrendatario, last_nameArrendatario, emailArrendatario, phoneArrendatario, rutArrendatario, first_nameContact, last_nameContact, emailContact, phoneContact;
	var contrato;
	var plan= "";
	var arriendoVal = '';
	var rentaVal = '';

	$(".direccion-container input[name*='home'] ").on("change", function(){
		home = $(this).val()
		console.log(home)
	});
	$('#main-nav-wrap li a').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 80
		}, 700);
		$('#main-nav-wrap li').removeClass("current");
		$(this).parent().addClass("current")
	});
	
	// on load of the page: switch to the currently selected tab
	
	var hash = window.location.hash;
	console.log(hash)
    $('#myTab li  a[href="' + hash + '"]').tab('show');

	var $body = $('body');
	var $navbar = $('.navbar-default');
	var $offsetY = $navbar.offset().top + 30;
	var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
	var offset = $('.main-slider').height() - $navbar.height();
	// Fixed Nav after scroll
    document.onscroll = scroll;
      
	function scroll() {
		if ($(window).scrollTop() >= $offsetY) {
			$navbar.addClass('menu-fixed')
			// $navbar.css('opacity', "1");
			// $navbar.find(".main-btn").css("width", "250px")
			// $navbar.find(".main-btn").css("opacity", "1")
			
		} else {
			$navbar.removeClass('menu-fixed')
			// $navbar.find(".main-btn").css("width", "0")
			// $navbar.find(".main-btn").css("opacity", "0")
		}
	}
	$(document).on("scroll", function(){
		if ($(window).scrollTop() >= offset) {
			$navbar.find(".main-btn").css("width", "250px")
			$navbar.find(".main-btn").css("opacity", "1")
			$(".navbar-collapse .img-init").css("opacity", "0")
			setTimeout(function(){
				$(".navbar-collapse .img-init").css("display", "none")
			 }, 300);
			$(".navbar-header .navbar-brand").show(300)
			
		} else {
			$navbar.find(".main-btn").css("width", "0")
			$navbar.find(".main-btn").css("opacity", "0")
			$(".navbar-collapse .img-init").css("display", "block")
			setTimeout(function(){
				$(".navbar-collapse .img-init").css("opacity", "1")
			 }, 300);
			$(".navbar-header .navbar-brand").hide(300)
		}
	})
	$("input").on("change", function(){
		$(".validate-btn").removeClass("disabled");
	});
	$('#datetimepicker1').datetimepicker({
		locale: 'es'
	});
});