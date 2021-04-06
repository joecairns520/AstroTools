// This function will read in the RA and Dec of a source in the either degrees or sexagesimal format and will convert into the other. Note that the code can
// read in either 00h00m00s +00d00m00s or 00:00:00 +00:00:00 format and convert to degrees, but when converting the from degrees to sexagesimal, the 00:00:00 
// +00:00:00 format will always be used.

function printRADec(){
  // Take RA and Dec from the input fields
  var ra_in = document.getElementById("RA").value;
  var dec_in = document.getElementById("Dec").value;
  
  if (isNaN(ra_in) === false && isNaN(dec_in) === false) { // If both RA and Dec can be parsed as numbers (i.e. not not a number).
    // Convert the input ra and dec into floats
    var ra_float = parseFloat(ra_in);
    var dec_float = parseFloat(dec_in);
    
    // Convert into hh:mm:ss ±dd:mm:ss format
    var ra_hh = Math.floor(ra_float / 15.0);
    var ra_mm = Math.floor(((ra_float / 15.0) - ra_hh) * 60.0);
    var ra_ss = ((((ra_float / 15.0) - ra_hh) * 60.0) - ra_mm) * 60.0;
    
    if (dec_float >= 0) {
      var dec_dd = Math.floor(dec_float);
      var dec_mm = Math.floor((dec_float - dec_dd) * 60.0);
      var dec_ss = (((dec_float - dec_dd) * 60.0) - dec_mm) * 60.0;
    } else {
      var dec_dd = Math.ceil(dec_float);
      var dec_mm = Math.ceil((dec_float - dec_dd) * 60.0);
      var dec_ss = (((dec_float - dec_dd) * 60.0) - dec_mm) * 60.0;
    }
    
    var ra_out = ra_hh.toString() + ":" + ra_mm.toString() + ":" + ra_ss.toFixed(5).toString();
    var dec_out = dec_dd.toString() + ":" + Math.abs(dec_mm).toString() + ":" + Math.abs(dec_ss).toFixed(5).toString();
    
    // Output the result into the display 
    document.getElementById('display').innerHTML = 'RA: ' + ra_out + ', Dec: ' + dec_out;

  
  } else if ((ra_in.indexOf(":") > -1) && (dec_in.indexOf(":") > -1)) { // If there are : symbols present in the strings...
    // Split the string up into subarrays containing the numbers in between the : symbols
    var ra_split = ra_in.split(":");
    var dec_split = dec_in.split(":");
    
    // Convert into degrees
    var ra_out = ((15.0 * parseFloat(ra_split.slice(0, 1))) + (15.0 * (parseFloat(ra_split.slice(0, 2)) / 60.0)) + (15.0 * (parseFloat(ra_split.slice(0, 3)) / 3600.0))).toFixed(5).toString();
    var dec_out = (parseFloat(dec_split.slice(0, 1)) + (parseFloat(dec_split.slice(0, 2)) / 60.0) + (parseFloat(dec_split.slice(0, 3)) / 3600.0)).toFixed(5).toString();
 
    // Output the result into the display 
    // document.getElementById('display').innerHTML = "RA: " + ra_out + ", Dec: " + dec_out;
    document.getElementById('display').innerHTML = ra_split.slice(0, 1) + ', ' + ra_split.slice(0, 2) + ', ' + ra_split.slice(0, 3);
    
  } else {
    
    // Output the result into the display 
    document.getElementById('display').innerHTML = "Sorry I do not recognise that format, please try again!";
    
  }
 
}
