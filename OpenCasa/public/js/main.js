
$(document).ready(function(){
	
	
	var $body = $('body');
	var $navbar = $('.navbar-default');
	var $offsetY = $navbar.offset().top + 10;
	var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');

	// Fixed Nav after scroll
    document.onscroll = scroll;
      
	function scroll() {
		if ($(window).scrollTop() >= $offsetY) {
			$navbar.addClass('menu-fixed').css('background-color', 'rgba(255,254,253,1)');
			
		} else {
			$navbar.removeClass('menu-fixed').css('background-color', 'rgba(255,254,253,1)');
		}
	}
	
	$(".banners").owlCarousel({
		pagination: true,
		slideSpeed: 1000,
		items: 1,
		smartSpeed: 1000,
		dots: true,
		navigation: true,
		nav: true,
		navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
		
	})
	
	$(".owl-prev").html('<i class="fa fa-arrow-left"></i>');
	$(".owl-next").html('<i class="fa fa-arrow-right"></i>');
	$(".banner .owl-theme .owl-dots .owl-dot:first-child ").html("1")
	$(".banner .owl-theme .owl-dots .owl-dot:nth-child(2) ").html("2")
	$(".banner .owl-theme .owl-dots .owl-dot:nth-child(3) ").html("3")

	$(".testimonio").owlCarousel({
		pagination: true,
		slideSpeed: 1000,
		items: 1,
		responsive: {
			1200: {
				items: 1
			},
			1124: {
				items: 1
			},
			600: {
				items: 1
			}
		}
	})
	$(".testimonio .owl-dots .owl-dot:first-child ").html('<div class="cont-img">' + '<img src="public/images/profile.png" alt="">' + '</div>' + '<h5>' + 'Camila' + '</h5>')
	$(".testimonio .owl-dots .owl-dot:nth-child(2) ").html('<div class="cont-img">' + '<img src="public/images/esteban.png" alt="">' + '</div>' + '<h5>' + 'Esteban' + '</h5>')
	$(".testimonio .owl-dots .owl-dot:nth-child(3) ").html('<div class="cont-img">' + '<img src="public/images/person.png" alt="">' + '</div>' + '<h5>' + 'Jorge' + '</h5>')
    
});