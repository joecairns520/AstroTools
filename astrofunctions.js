// This function will read in the RA and Dec of a source in the either degrees or sexagesimal format and will convert into the other. Note that the code can
// read in either 00h00m00s +00d00m00s or 00:00:00 +00:00:00 format and convert to degrees, but when converting the from degrees to sexagesimal, the 00:00:00 
// +00:00:00 format will always be used.

function printRADec(){
  // Take RA and Dec from the input fields
  var ra_in = document.getElementById("RA").value;
  var dec_in = document.getElementById("Dec").value;
  
  // If there are : symbols present in the strings...
  if (ra_in.indexOf(':') > -1)
  {
    // Split the string up into subarrays containing the numbers in between the : symbols
    var ra_split = ra_in.split(":");
    var dec_split = dec_in.split(":");
    
    // Convert into degrees
    var ra_out = ((360.0 / 24.0) * parseFloat(ra_split.slice(0, 1))) + ((360.0 / 24.0) * (parseFloat(ra_split.slice(0, 2)) / 60.0)) + ((360.0 / 24.0) * (parseFloat(ra_split.slice(0, 3)) / 3600.0));
    var dec_out = parseFloat(dec_split.slice(0, 1)) + (parseFloat(dec_split.slice(0, 2)) / 60.0) + (parseFloat(dec_split.slice(0, 3)) / 3600.0);
    
    // Output the result into the display 
    document.getElementById('display').innerHTML = 'RA: ' + ra_out.toFixed(5).toString() + ', Dec: ' + dec_out.toFixed(5).toString();
  }
 
}
