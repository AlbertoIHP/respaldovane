
$(document).ready(function(){
	var home, comuna, address, depto, typo_pago, first_name, last_name, email, phone, password, password_confirmation, initDate, diaContrato, plazoContrato, montoMensual, multa;
	var first_nameArrendatario, last_nameArrendatario, emailArrendatario, phoneArrendatario, rutArrendatario, first_nameContact, last_nameContact, emailContact, phoneContact;
	var contrato;
	var plan= "";
	var arriendoVal = '';
	var rentaVal = '';
	
	// $("#sinCcontrato").on("click", function(e){
	// 	e.preventDefault()
	// 	var value = $(this).find('input[name*="contrato"]').val();
	// 	console.log(value);
	// 	contrato = contrato;
	// 	var parent = $(this).closest(".slide-cont");
	// 	parent.hide(500)
	// 	parent.removeClass("active-cont")
	// 	var bro = parent.next()
	// 	bro.addClass("active-cont")
	// 	bro.show(500)
	// 	$("#formContract").find("div.hidden").removeClass("hidden");
	// })
	// $("#conContrato").on("click", function (e) {
	// 	e.preventDefault()
	// 	var value = $(this).find('input[name*="contrato"]').val();
	// 	console.log(value);
	// 	contrato = contrato;
	// 	var parent = $(this).closest(".slide-cont");
	// 	parent.hide(500)
	// 	parent.removeClass("active-cont")
	// 	var bro = parent.next()
	// 	bro.addClass("active-cont")
	// 	bro.show(500)
	// })
	
	$(".direccion-container input[name*='home'] ").on("change", function(){
		home = $(this).val()
		console.log(home)
	})

	$("#formAddress").on("submit", function (e) {
		e.preventDefault();
		comuna, address, depto;
		var parent = $(this)
		comuna = $('input[name*="comuna"]').val();
		address = $('input[name*="address"]').val();
		depto = $('input[name*="depto"]').val();
		console.log(home, comuna, address, depto)
		var valido = true;
		var error = '';
		if (comuna.length === 0) {
			valido = false;
			error += 'Ingrese Comuna.\n';
		}
		if (address.length === 0) {
			valido = false;
			error += 'Ingrese dirección.\n';
		}
		if (depto.length === 0) {
			valido = false;
			error += 'Ingrese departamento.\n';
		}
		if (!valido) {
			alert(error);
			$(this).find(".validate-btn").addClass("disabled");
			return;
		} else {
            comuna = comuna;
			address = address;
			depto = depto;
			var parent = $(this).closest(".slide-cont");
			parent.hide(500)
			parent.removeClass("active-cont")
			var bro = parent.next()
			bro.addClass("active-cont")
			bro.show(500)
		}
	})

	$(".tipo-pago input[name*='tipo-pago'] ").on("change", function () {
		tipo_pago = $(this).val()
		console.log(tipo_pago)
	})

	// $("#formRenta").on("submit", function (e) {
	// 	e.preventDefault();
	// 	var parent = $(this)
	// 	var arriendoVal = $("input[name*='arriendo_mensual']").val();
	// 	var rentaVal = $('input[name*="renta_mensual"]').val()
	// 	console.log(arriendoVal, rentaVal);
	// 	var valido = true;
	// 	var error = '';
	// 	if (arriendoVal.length === 0) {
	// 		valido = false;
	// 		error += 'Ingrese Arriendo Mensual.\n';
	// 	}
	// 	if (rentaVal.length === 0) {
	// 		valido = false;
	// 		error += 'Ingrese Renta Mensual.\n';
	// 	}
	// 	if (!valido) {
	// 		alert(error);
	// 		$(this).find(".validate-btn").addClass("disabled");
	// 		return;
	// 	} else {
	// 		rentaVal = parseInt(rentaVal)
	// 		arriendoVal = parseInt(arriendoVal)

	// 		factor = rentaVal / arriendoVal;
	// 		console.log(factor);

	// 		if (factor >= 3) {
	// 			$(".planes-container").addClass("active-cont")
	// 			var parent = $(this).closest(".slide-cont");
	// 			parent.hide(500)
	// 		} else {
	// 			$(".evaluacion-negativa").addClass("active-cont")
	// 			var parent = $(this).closest(".slide-cont");
	// 			parent.hide(500)
	// 		}
	// 		rentaVal = rentaVal;
	// 		arriendoVal = arriendoVal; 
	// 	}
	// });

// 	$("#formUser").on("submit", function (e) {
// 		e.preventDefault();
// 		var parent = $(this)
// 		first_name = parent.find('input[name*="first_name"]').val();
// 		last_name = parent.find('input[name*="last_name"]').val();
// 		email = parent.find('input[name*="email"]').val();
// 		phone = parent.find('input[name*="phone"]').val();
// 		password = $('input[name*="password"]').val();
// 		password_confirmation = parent.find('input[name*="password_confirmation"]').val();

// 		console.log(first_name, last_name, email, password, password_confirmation)
// 		var valido = true;
// 		var error = '';
// 		if (first_name.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Nombre.\n';
// 		}
// 		if (last_name.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Apellido.\n';
// 		}
// 		if (email.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Email.\n';
// 		} else {
// 			var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 			if (!regExpEmail.test(email)) {
// 				valido = false;
// 				error += 'El Email debe contener el formato correcto.\n';
// 			}
// 		}
// 		if (phone.length !== 9) {
// 			valid = false;
// 			error += '    • El número de teléfono debe contener 9 dígitos.\n';
// 		}
// 		if (password.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese password.\n';
// 		}
// 		if (password_confirmation.length === 0) {
// 			valido = false;
// 			error += '    • Confirme password.\n';
// 		}
// 		if (!valido) {
// 			alert(error);
// 			$(this).find(".validate-btn").addClass("disabled");
// 			return;
// 		} else {
//             first_name = first_name;
// 			last_name = last_name;
// 			email = email;
// 			password = password;
// 			phone = phone;
// 			password_confirmation = password_confirmation;
// 			var parent = $(this).closest(".slide-cont");
// 			parent.hide(500)
// 			parent.removeClass("active-cont")
// 			var bro = parent.next()
// 			bro.addClass("active-cont")
// 			bro.show(500)
// 		}
// 	})

// 	$("#formContacto").on("submit", function (e) {
// 		e.preventDefault();
// 		var parent = $(this)
// 		first_nameContact = $('input[name*="first_nameContact"]').val();
// 		last_nameContact = $('input[name*="last_nameContact"]').val();
// 		emailContact = $('input[name*="emailContact"]').val();
// 		phoneContact = $('input[name*="phoneContact"]').val();

// 		console.log(first_nameContact, last_nameContact, emailContact, phoneContact )
// 		var valido = true;
// 		var error = '';
// 		if (first_nameContact.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Nombre.\n';
// 		}
// 		if (last_nameContact.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Apellido.\n';
// 		}
// 		if (emailContact.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Email.\n';
// 		} else {
// 			var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 			if (!regExpEmail.test(emailContact)) {
// 				valido = false;
// 				error += 'El Email debe contener el formato correcto.\n';
// 			}
// 		}
// 		if (phoneContact.length !== 9) {
// 			valid = false;
// 			error += '    • El número de teléfono debe contener 9 dígitos.\n';
// 		}
// 		if (!valido) {
// 			alert(error);
// 			$(this).find(".validate-btn").addClass("disabled");
// 			return;
// 		} else {
//             first_nameContact = first_nameContact;
// 			last_nameContact = last_nameContact;
// 			emailContact = emailContact;
// 			phoneContact = phoneContact;
// 			$(".last-container").addClass("active-cont")
// 			var parent = $(this).closest(".slide-cont");
// 			parent.hide(500)
// 		}
// 	})


// 	$("#formAval").on("submit", function (e) {
// 		e.preventDefault();
// 		var parent = $(this)
// 		first_nameAval = $('input[name*="first_nameAval"]').val();
// 		last_nameAval = $('input[name*="last_nameAval"]').val();
// 		emailAval = $('input[name*="emailAval"]').val();
// 		phoneAval = $('input[name*="phoneAval"]').val();
// 		rutAval = $('input[name*="rutAval"]').val();

// 		console.log(first_nameAval, last_nameAval, emailAval, phoneAval, rutAval)
// 		var valido = true;
// 		var error = '';
// 		if (first_nameAval.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Nombre.\n';
// 		}
// 		if (last_nameAval.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Apellido.\n';
// 		}
// 		if (emailAval.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese Email.\n';
// 		} else {
// 			var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 			if (!regExpEmail.test(emailAval)) {
// 				valido = false;
// 				error += 'El Email debe contener el formato correcto.\n';
// 			}
// 		}
// 		if (phoneAval.length !== 9) {
// 			valid = false;
// 			error += '    • El número de teléfono debe contener 9 dígitos.\n';
// 		}
// 		if (rutAval.length === 0) {
// 			valido = false;
// 			error += '    • Ingrese rut.\n';
// 		}
// 		if (!valido) {
// 			alert(error);
// 			$(this).find(".validate-btn").addClass("disabled");
// 			return;
// 		} else {
//             first_nameAval= first_nameAval;
// 			last_nameAval= last_nameAval;
// 			email = emailAval;
// 			rutAval= rutAval;
// 			phoneAval= phoneAval;
// 			var parent = $(this).closest(".slide-cont");
// 			parent.hide(500)
// 			parent.removeClass("active-cont")
// 			var bro = parent.next()
// 			bro.addClass("active-cont")
// 			bro.show(500)
// 		}
// 	})

	$("#formArrendatario").on("submit", function (e) {
		e.preventDefault();
		var parent = $(this)
		first_nameArrendatario = $('input[name*="first_nameArrendatario"]').val();
		last_nameArrendatario = $('input[name*="last_nameArrendatario"]').val();
		emailArrendatario = $('input[name*="emailArrendatario"]').val();
		phoneArrendatario = $('input[name*="phoneArrendatario"]').val();
		rutArrendatario = $('input[name*="rutArrendatario"]').val();

		console.log(first_nameArrendatario, last_nameArrendatario, emailArrendatario, phoneArrendatario, rutArrendatario)
		var valido = true;
		var error = '';
		if (first_nameArrendatario.length === 0) {
			valido = false;
			error += '    • Ingrese Nombre.\n';
		}
		if (last_nameArrendatario.length === 0) {
			valido = false;
			error += '    • Ingrese Apellido.\n';
		}
		if (emailArrendatario.length === 0) {
			valido = false;
			error += '    • Ingrese Email.\n';
		} else {
			var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!regExpEmail.test(emailArrendatario)) {
				valido = false;
				error += 'El Email debe contener el formato correcto.\n';
			}
		}
		if (phoneArrendatario.length !== 9) {
			valid = false;
			error += '    • El número de teléfono debe contener 9 dígitos.\n';
		}
		if (rutArrendatario.length === 0) {
			valido = false;
			error += '    • Ingrese rut.\n';
		}
		if (!valido) {
			alert(error);
			$(this).find(".validate-btn").addClass("disabled");
			return;
		} else {
            first_nameArrendatario = first_nameArrendatario;
			last_nameArrendatario = last_nameArrendatario;
			email = emailArrendatario;
			rutArrendatario = rutArrendatario;
			phoneArrendatario = phoneArrendatario;
			var parent = $(this).closest(".slide-cont");
			parent.hide(500)
			parent.removeClass("active-cont")
			var bro = parent.next()
			bro.addClass("active-cont")
			bro.show(500)
		}
	})

	$("#formContract").on("submit", function (e) {
		e.preventDefault();
		initDate = $('input[name*="initDate"]').val();
		diaContrato = $('input[name*="diaContrato"]').val();
		plazoContrato = $('input[name*="plazoContrato"]').val();
		montoMensual = $('input[name*="montoMensual"]').val();
		multa = $('input[name*="multa"]').val();

		console.log(initDate, diaContrato, plazoContrato, montoMensual, multa)
		var valido = true;
		var error = '';
		if (initDate.length === 0) {
			valido = false;
			error += '    • Ingrese Fecha de inicio de contrato.\n';
		}
		if (diaContrato.length === 0) {
			valido = false;
			error += '    • Ingrese dia de pago.\n';
		}
		if (plazoContrato.length === 0) {
			valido = false;
			error += '    • Ingrese plazo del contrato.\n';
		}
		if (montoMensual.length === 0) {
			valido = false;
			error += '    • Ingrese monto mensual arriendo.\n';
		}
		if (multa.length === 0) {
			valido = false;
			error += '    • Ingrese multa por atraso arriendo.\n';
		}
		if (!valido) {
			alert(error);
			$(this).find(".validate-btn").addClass("disabled");
			return;
		} else {
			initDate = initDate;
			diaContrato = diaContrato;
			plazoContrato =  plazoContrato;
			montoMensual = montoMensual;
			multa = multa;
			var parent = $(this).closest(".slide-cont");
			parent.hide(500)
			parent.removeClass("active-cont")
			var bro = parent.next()
			bro.addClass("active-cont")
			bro.show(500)
		}
	})


	
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
	$(".prev-button").on('click', function (e) {
		e.preventDefault()
		var parent = $(this).closest(".slide-cont");
		parent.hide(500)
		var bro = parent.prev()
		bro.addClass("active-cont")
		parent.removeClass("active-cont")
		bro.show(500)
	})
	$(".next-button").on('click', function(e){
		e.preventDefault()
		var parent = $(this).closest(".slide-cont");
		parent.hide(500)
		parent.removeClass("active-cont")
		var bro = parent.next()
		bro.addClass("active-cont")
		bro.show(500)
	})

	$("input").on("change", function(){
		$(".validate-btn").removeClass("disabled");
	})
	
	$(".inputs-radio label").on('click', function(){
		var parent = $(this).closest(".inputs-radio");
		parent.removeClass("active-cont")
		parent.find(".active").removeClass("active");
		$(this).toggleClass("active")
	})
	$('#datetimepicker1').datetimepicker({
		locale: 'es'
	});
	$("#button").click(function (e) {
		e.preventDefault()
		$('html, body').animate({
			scrollTop: $("#myDiv").offset().top
		}, 600);
	});

	$(".planes").on('click', function () {
		var parent = $(this).parent().parent();
		var checked = parent.find("input[type='radio']:checked");
		parent.find(".active").removeClass("active")
		$(this).addClass("active");
	})

	// $("#plan-button").on("click", function(e){
	// 	e.preventDefault()
	// 	var parent = $(this).closest(".slide-cont");
	// 	var radio = parent.find("input[type='radio']");
	// 	console.log(radio)
	// 	if(plan==''){
	// 		alert("Debes elegir un plan");
	// 	}else{
	// 		parent.hide(500)
	// 		parent.removeClass("active-cont")
	// 		$(".aprobada-evaluacion").addClass("active-cont")
	// 		$(".aprobada-evaluacion").show(500)
	// 	}
	// })
	

});