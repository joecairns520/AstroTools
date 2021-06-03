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
   var LST = 100.46 + (0.985647 * d) + long + (15.0 * UT);
   
   // If the LST is not between 0 and 360, we must keep adding/subtracting multiples
   // of 360 to get it into this range
   if (LST < 0) {
     while (LST < 0) {
     	LST += 360
   	}
   }
   
   if (LST > 360) {
     while (LST > 360) {
     	LST -= 360
   	}
   }
   
   
   return LST;
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
	// Convert all angles into radians
    Dec = Dec * (Math.PI / 180.0)
    lat = lat * (Math.PI / 180.0)
    HA = HA * (Math.PI / 180.0)
    ALT = Math.asin(Math.sin(Dec)*Math.sin(lat) + Math.cos(Dec)*Math.cos(lat)*Math.cos(HA));
    
    // And convert back into degrees
    ALT = ALT * (180.0 / Math.PI)
    return ALT;
}

// This function puts basically all of the above functions together - reading in the RA and Dec of a source in decimal degrees along with the longitude and
// latitude of the observer and the UT time and date of the observations, and returning the elevation of the source at that time and location. Note here that
// the date parameter must be in ddmmyyyy format.
function elevationFromObserver(RA, Dec, long, lat, date){
   // Take RA and Dec from the input fields
//      var RA = parseFloat(document.getElementById("RA").value);
//      var Dec = parseFloat(document.getElementById("Dec").value);
//      var long = parseFloat(document.getElementById("long").value);
//      var lat = parseFloat(document.getElementById("lat").value);
//      var date = document.getElementById("date").value;

   // We're going to want the UT to span the whole day for the plot 
   var UT_time = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

   // Split the date up into day, month and year
   var day = parseFloat(date.slice(0, 2));
   var month = parseFloat(date.slice(2, 4));
   var year = parseFloat(date.slice(4, 8));
   
   // Define the empty array where we will push the elevation results
   var elevations = [];
	
   // Now the stuff that we need the UT for we'll have to put inside the loop
	for (var i = 0; i < UT_time.length; i++) {
      		// Calculate the Julian Date
		var julian_date = JD(day, month, year, UT_time[i]);

      		// Calculate days since J2000
       		var days_since_J2000 = daysSinceJ2000(julian_date);

      		// Calculate Local Sidereal Time
        	var LST = returnLST(days_since_J2000, UT_time[i], long);

      		// Calculate the Hour Angle of the source
        	var HA = returnHA(LST, RA);

      		// Calculate the Elevation of the source
        	var El = returnElevation(Dec, HA, lat);
      
      		elevations.push(El);
    	} 

	return elevations;
}

var elevation = elevationFromObserver(250.425, 36.466667, -1.9166667, 52.5 , '10081998')

// Our labels along the x-axis
var UT_time = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
// For drawing the lines
// var elevation = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
var elevation = elevationFromObserver(333.75, -11.8, 0.1278, 51.5, '04062021')

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: UT_time,
    datasets: [
      { 
        data: elevation,
        label: "Target",
        borderColor: "#3e95cd",
	color: "#FFFFFF"
        fill: false
      }
    ]
  }
});
