// This code will use a number of functions to generate the data and the plot for the elevation-plot.html page.

// First, I'll define a function that returns the number of days from J2000.
function JD(day, month, year, UT) {
   var julian_day = (367 * year) - Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4) + Math.floor(275 * month / 9) + day + 1721013.5 + (UT / 24);
   return julian_day;
}


