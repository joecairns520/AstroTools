// This file contains a number of useful functions for my AstroTools webpage. 

// This first function will convert RA from hms to decimal degrees. For this function, the RA must be in an array with three elements (e.g. [hh, mm, ss])
function RA_hmsToDegrees(ra) {
  return (((360.0 / 24.0) * parseFloat(ra.slice(0, 1))) + ((360.0 / 24.0) * (parseFloat(ra.slice(1, 2)) / 60.0)) + ((360.0 / 24.0) * (parseFloat(ra.slice(2, 3)) / 3600.0))).toFixed(5).toString();
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
  if (parseFloat(dec.slice(0, 1)) >= 0) {
    var dec_out = (parseFloat(dec.slice(0, 1)) + (parseFloat(dec.slice(1, 2)) / 60.0) + (parseFloat(dec.slice(2, 3)) / 3600.0)).toFixed(5).toString();
  } else {
    var dec_out = return (parseFloat(dec.slice(0, 1)) - (parseFloat(dec.slice(1, 2)) / 60.0) - (parseFloat(dec.slice(2, 3)) / 3600.0)).toFixed(5).toString();
  }
  return dec_out;
}

// Finally, we have a function that converts Dec from decimal degrees to dms
function Dec_degreesTodms(dec) {
  var dec_float = parseFloat(dec);
  
  if (dec_float >= 0) {
      var dec_dd = Math.floor(dec_float);
      var dec_mm = Math.floor((dec_float - dec_dd) * 60.0);
      var dec_ss = (((dec_float - dec_dd) * 60.0) - dec_mm) * 60.0;
    } else {
      var dec_dd = Math.ceil(dec_float);
      var dec_mm = Math.ceil((dec_float - dec_dd) * 60.0);
      var dec_ss = (((dec_float - dec_dd) * 60.0) - dec_mm) * 60.0;
    }
  
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
    var ra_out = RA_hmsToDegrees(ra_split);
    var dec_out = Dec_dmsToDegrees(dec_split);
 
    // Output the result into the display 
    document.getElementById('display').innerHTML = "RA: " + ra_out + ", Dec: " + dec_out;
    
  } else {
    
    // Output the result into the display 
    document.getElementById('display').innerHTML = "Sorry I do not recognise that format, please try again!";
    
  }
 
}


// This function will be used by the elevation calculator, and calculates the Julian date given a day, month, year and UT time
function JD(day, month, year, UT) {
   var julian_day = (367 * year) - Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4) + Math.floor(275 * month / 9) + day + 1721013.5 + (UT / 24);
   return julian_day;
}

// This function reads in a Julian date and converts it into a J2000 epoch date (e.g. days since 1st January 2000 at 1200
function daysSinceJ2000(JD) {
  return  JD - 2451545.0;
}

// This function calculates the Local Sidereal Time (LST). In this function, d is the days since J2000, UT is the decimal hours and long is the longitude
// in decimal degrees.
function returnLST(d, UT, long) {
  return 100.46 + (0.985647 * d) + long + (15.0 * UT);
}

// This function returns the Hour angle of a source, which basically takes into account the rotation of the Earth. It is essentially just the Local Sidereal time
// minus the RA of the source, both in decimal degrees. Note that we write this function such that, if the hour angle is negative, we add 360 degrees so that
// we keep the HA in the range 0 ---> 360.
function returnHA(LST, RA) {
  if (LST - RA < 0.0) {
    var HA = LST - RA + 360.0;
  } else {
    var HA = LST - RA;
  }
  return HA;
}

// This function reads in the Dec and HA of a source along with the Latitude of the observer, and returns the altitude (or elevation) of the source. 
function returnElevation(Dec, HA, lat) {
  return Math.asin(Math.sin(Dec) * Math.sin(lat) + Math.cos(Dec) * Math.cos(lat) * Math.cos(HA));
}

// This function puts basically all of the above functions together - reading in the RA and Dec of a source in decimal degrees along with the longitude and
// latitude of the observer and the UT time and date of the observations, and returning the elevation of the source at that time and location. Note here that
// the date parameter must be in ddmmyyyy format.
function elevationFromObserver(){
  // Take RA and Dec from the input fields
  var RA = parseFloat(document.getElementById("RA").value);
  var Dec = parseFloat(document.getElementById("Dec").value);
  var long = parseFloat(document.getElementById("long").value);
  var lat = parseFloat(document.getElementById("lat").value);
  var UT = parseFloat(document.getElementById("UT").value);
  var date = document.getElementById("date").value;
  
  // First, split the date up into day, month and year
  var day = parseFloat(date.slice(0, 2));
  var month = parseFloat(date.slice(2, 4));
  var year = parseFloat(date.slice(4, 8));
  
  // Calculate the Julian Date
  var julian_date = JD(day, month, year, UT);
  
  // Calculate days since J2000
  var days_since_J2000 = daysSinceJ2000(julian_date);
  
  // Calculate Local Sidereal Time
  var LST = returnLST(days_since_J2000, UT, long);
  
  // Calculate the Hour Angle of the source
  var HA = returnHA(LST, RA);
  
  // Calculate the Elevation of the source
  var El = returnElevation(Dec, HA, lat);
  
  // Output the result into the display 
  document.getElementById('display').innerHTML = "HA: " + HA + ", El: " + El;
  
}
