function gchar(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 * 
 * @param {process.hrtime()} start 
 */
function elapsed_time (start, note) {
	let e = null
	const precision = 3
	const elapsed = process.hrtime(start)[1]/1000000
	e = process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note
	start = process.hrtime()
	return e
}

module.exports = {
	elapsed_time,
  	gchar
}
