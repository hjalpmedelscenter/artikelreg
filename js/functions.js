// Reset and disable #switch-individmarkt
function disableIndividmarkt() {
	console.log('disableIndividmarkt() executed');
	$('#switch-individmarkt').removeAttr('checked').val('').attr('disabled', true);
}

// Reset and disable #switch-inventarie
function disableInventarie() {
	console.log('disableInventarie() executed');
	$('#switch-inventarie').removeAttr('checked').val('').attr('disabled', true);
}

// Reset and disable #radio-avskrivningstid
function disableAvskrivningstid() {
	console.log('disableAvskrivningstid() executed');
	$('#radio-avskrivningstid').val('').attr('disabled', true);
}
