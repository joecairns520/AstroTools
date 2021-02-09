// This file contains a number of useful functions for my AstroTools webpage. 

// This first function will convert RA from hms to decimal degrees. For this function, the RA must be in an array with three elements (e.g. [hh, mm, ss])
function RA_hmsToDegrees(ra) {
  return (((360.0 / 24.0) * parseFloat(ra.slice(0, 1))) + ((360.0 / 24.0) * (parseFloat(ra.slice(0, 2)) / 60.0)) + ((360.0 / 24.0) * (parseFloat(ra.slice(0, 3)) / 3600.0))).toFixed(5).toString();
}

// The next converts RA from degrees to hms
function RA_degreesTohms(ra) {
  var ra_float = parseFloat(ra);
  
  var ra_hh = Math.floor(ra_float / 15.0);
  var ra_mm = Math.floor(((ra_float / 15.0) - ra_hh) * 60.0);
  var ra_ss = ((((ra_float / 15.0) - ra_hh) * 60.0) - ra_mm) * 60.0;

  return ra_hh.toString() + ":" + ra_mm.toString() + ":" + ra_ss.toFixed(5).toString();
}

// The next converts DEC from ±dms to degrees - similarly the Dec must be in the form [dd, mm, ss]
function Dec_dmsToDegrees(dec) {
  return (parseFloat(dec.slice(0, 1)) + (parseFloat(dec.slice(0, 2)) / 60.0) + (parseFloat(dec.slice(0, 3)) / 3600.0)).toFixed(5).toString();
}

// Finally, we have a function that converts Dec from decimal degrees to dms
function Dec_degreesTodms(dec) {
  var dec_float = parseFloat(dec);
  
  var dec_dd = Math.floor(dec_float);
  var dec_mm = Math.floor((dec_float - dec_dd) * 60.0);
  var dec_ss = (((dec_float - dec_dd) * 60.0) - dec_mm) * 60.0;
  
  return dec_dd.toString() + ":" + dec_mm.toString() + ":" + dec_ss.toFixed(5).toString();
}
  

// This function will primarily be used for the convert RA and Dec page - it basically reads in the inputs from the RA and Dec fields and uses the above 
// functions to convert them into whatever the desired format before outputting this back onto the page.
function printRADec(){
  // Take RA and Dec from the input fields
  var ra_in = document.getElementById("RA").value;
  var dec_in = document.getElementById("Dec").value;
  
  if (isNaN(ra_in) === false && isNaN(dec_in) === false) { // If both RA and Dec can be parsed as numbers (i.e. not not a number).
    // Use the above functions to convert the ra and dec
    var ra_out = RA_degreesTohms(ra_in);
    var dec_out = Dec_degreesTodms(dec_in);
    
    // Output the result into the display 
    document.getElementById('display').innerHTML = 'RA: ' + ra_out + ', Dec: ' + dec_out;

  
  } else if ((ra_in.indexOf(":") > -1) && (dec_in.indexOf(":") > -1)) { // If there are : symbols present in the strings...
    // Split the string up into subarrays containing the numbers in between the : symbols
    var ra_split = ra_in.split(":");
    var dec_split = dec_in.split(":");
    
    // Convert into degrees
    var ra_out = RA_hmsToDegrees(ra_in);
    var dec_out = Dec_dmsToDegrees(dec_in);
 
    // Output the result into the display 
    document.getElementById('display').innerHTML = "RA: " + ra_out + ", Dec: " + dec_out;
    
  } else {
    
    // Output the result into the display 
    document.getElementById('display').innerHTML = "Sorry I do not recognise that format, please try again!";
    
  }
 
}
