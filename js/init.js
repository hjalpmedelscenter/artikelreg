$(function() {
	console.log('DOM ready');
	console.log('Loading init.js');
	console.log('window.location.protocol: ' + window.location.protocol);


	// Global variables
	var artikeldata;

	/* Set theme class on html element, set icon on theme toggle button */
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		console.log('System prefers dark mode');
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode');
	} else {
		console.log('System prefers light mode');
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode');
	}

	/* Toggle theme */
	$('#button-toggle-theme').click(function() {
		console.log('#button-toggle-theme clicked');
		if ( $('html').hasClass('mdui-theme-light') ) {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode');
		} else {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode');
		}
		// $('#navigation-drawer').removeAttr('open');
	});

	$('#button-open-menu').click(function(){
		console.log('Button #button-open-menu clicked');
		if ( $('#navigation-drawer').attr('open') ) {
			console.log('Closing #navigation-drawer');
			$('#navigation-drawer').removeAttr('open');
		} else {
			console.log('Opening #navigation-drawer');
			$('#navigation-drawer').attr('open', true);
		}
	});

	$('#button-close-menu').click(function(){
		console.log('Button #button-close-menu clicked');
		$('#navigation-drawer').removeAttr('open');
	});

	$('#button-fler-produktnamn').click(function(){
		$('#div-fler-produktnamn').hide();
		// $('#div-produktnamn').removeClass('m6').addClass('m3');
		$('.extra-produkt').removeClass('hidden');
	});

	$('#button-open-dialog').click(function() {
		console.log('Button #button-dialog clicked');

		var nbsp = " ";

		// Populate 'artikeldata' variable

		// Artikelbenämning
		artikeldata  = nbsp + 'Artikelbenämning:' + nbsp + nbsp + $('#text-artikelbenamning').val() + "\n";

		// Produktnamn
		artikeldata += nbsp + 'Huvudproduktnamn:' + nbsp + nbsp + $('#text-produktnamn').val() + "\n";
		if ( $('#text-produktnamn2').val() ) {
		artikeldata += 'Extra produktnamn:' + nbsp + nbsp + $('#text-produktnamn2').val() + "\n";
		}
		if ( $('#text-produktnamn3').val() ) {
		artikeldata += 'Extra produktnamn:' + nbsp + nbsp + $('#text-produktnamn3').val() + "\n";
		}
		if ( $('#text-produktnamn4').val() ) {
		artikeldata += 'Extra produktnamn:'  + nbsp + nbsp + $('#text-produktnamn4').val() + "\n";
		}

		// Upphandlad
		artikeldata += '       Upphandlad:' + nbsp + nbsp + ( $('#checkbox-upphandlad').attr('checked')? 'Ja' : 'Nej' ) + "\n";

		// Hjälpmedelstjänsten
		artikeldata += '       Finns i HT:' + nbsp + nbsp + ( $('#checkbox-ht').attr('checked')? 'Ja' : 'Nej' ) + "\n";

		// Artikelansvar
		artikeldata += '    Artikelansvar:' + nbsp + nbsp + $('#select-artikelansvar').val() + " ";
		switch ($('#select-artikelansvar').val()) {
			case 'L':
				artikeldata += '(Region och kommun)'; break;
			case 'R':
				artikeldata += '(Retursortiment)'; break;
			case 'E':
				artikeldata += '(Egenansvar)'; break;
			case 'S':
				artikeldata += '(Syncentralen)'; break;
		}
		artikeldata += "\n";

		// Artikeltyp
		artikeldata += '       Artikeltyp:' + nbsp + nbsp;
		switch ($('#select-artikeltyp').val()) {
			case 'H':
				artikeldata += 'Huvudhjälpmedel'; break;
			case 'T':
				artikeldata += 'Tillbehör'; break;
			case 'R':
				artikeldata += 'Reservdel'; break;
		}
		artikeldata += "\n";


		console.log('artikeldata = ' + artikeldata );

		$('#textarea-artikeldata').val( artikeldata );

		// $('#data-artikelansvar').text($('#select-artikelansvar').val());
		// $('#data-artikeltyp').text($('#select-artikeltyp').val());
		// $('#data-debitering').text($('#select-debitering').val());
		// $('#data-individ').text($('#select-individ').val());
		// $('#data-inventarie').text($('#select-inventarie').val());
		// $('#data-avskriv').text($('#select-avskriv').val());


		$('#dialog').attr('open', true);
	});

	$('#button-help-outlook').click(function() {
		console.log('#button-help-outlook clicked');
		$('#navigation-drawer').removeAttr('open');
		$('#dialog-outlook').attr('open', true);
	})

	$('#button-help-plockomraden').click(function() {
		console.log('#button-help-plockomraden clicked');
		$('#dialog-plockomraden').attr('open', true);
	})

	$('#button-help-liggplats').click(function() {
		console.log('#button-help-liggplats clicked');
		$('#dialog-liggplats').attr('open', true);
	})

	$('#button-send-email').click(function() {
		console.log('#button-send-email clicked');

		var encodedArtikeldata = encodeURIComponent(artikeldata);
		// var encodedArtikeldata = encodeURIComponent('<table style="font-family: monospace;"><tr><td>Data 1</td><td>Värde 1</td></tr><tr><td>Data 2</td><td>Värde 2</td></tr><tr><td>Data 3</td><td>Värde 3</td></tr><tr><td>Data 4</td><td>Värde 4</td></tr><tr><td>Data 5</td><td>Värde 5</td></tr></table>');

		console.log('encodedArtikeldata = ' + encodedArtikeldata );

		var mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
		var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent('Upplägg av ny artikel i Sesam') + '&body=' + encodedArtikeldata;

		// Update href mailto link
		$('#button-send-email').attr('href', hrefcontent);

	});


	$('#list-item-help').click(function() {
		console.log('#list-item-help clicked');
		$('#navigation-drawer').removeAttr('open');
		$('#dialog2').attr('open', true);
	});

	$('.button-close-dialog').click(function(){
		console.log('Button #close-dialog clicked');
		// $('#dialog').removeAttr('open');
		$('mdui-dialog').removeAttr('open');
	});

	$('#button-copy-artikeldata').click(function() {
		console.log('#button-copy-artikeldata clicked');
		$('#textarea-artikeldata').select();
		document.execCommand('copy');
		mdui.snackbar({ message: 'Artikeldata har kopierats och kan klistras in med CTRL+V' });
	});

	$('#button-print').click(function() {
		window.print();
	});


	let var_artikelansvar = '0';
	let var_artikeltyp = '0';
	let var_debiteringsform = '0';
	let var_avd = '';

	$('#select-artikelansvar').on('change', function() {
	var_artikelansvar = this.value;
	console.log('Artikelansvar: ' + var_artikelansvar );
		$('#select-artikeltyp').removeAttr('selected').val('').attr('disabled', false);
		$('#select-debiteringsform').removeAttr('selected').val('').attr('disabled', true);
		// $('#select-individ').val('0').attr('disabled', true).formSelect();
		// $('#select-inventarie').val('0').attr('disabled', true).formSelect();
		// $('#select-avskriv').val('0').attr('disabled', true).formSelect();
	});







	$('#select-artikeltyp').on('change', function() {
		var_artikeltyp = this.value;
		console.log('Artikeltyp: ' + var_artikeltyp );
	});


	$('#switch-individmarkt').on('change', function() {
		console.log('#switch-individmarkt changed to: ' + this.checked);
		var var_individmarkt = (this.checked === true) ? 'Ja' :'Nej';
		console.log('Individmärkt: ' + var_individmarkt );
	});

	$('#switch-inventarie').on('change', function() {
		console.log('#switch-inventarie changed to: ' + this.checked);
		var var_inventarie = (this.checked === true) ? 'Ja' :'Nej';
		console.log('Inventarie: ' + var_inventarie );
	});

	$('#radio-avskrivningstid').on('change', function() {
		console.log('#radio-avskrivningstid changed to: ' + this.value);
		var var_avskrivningstid = this.value;
		console.log('Avskrivningstid: ' + var_avskrivningstid );
	});


	$('.divider').replaceWith('<div class="divider-waves"><svg width="100%" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><pattern id="a" width="91" height="8" patternUnits="userSpaceOnUse"><g clip-path="url(#clip0_2426_11367)"><path d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0" stroke="#E1E3E1" stroke-linecap="square"></path></g></pattern><rect width="100%" height="100%" fill="url(#a)"></rect></svg></div>');

});
