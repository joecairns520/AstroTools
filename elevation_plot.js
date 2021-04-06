// This code will use a number of functions to generate the data and the plot for the elevation-plot.html page.

// First, I'll define a function that returns the number of days from J2000.
// function days_from_J2000(date_str, time_str) {
//    
//    var leap_years = [2008., 2012., 2016., 2020., 2024.];
//    
   // The html page will work by having individual text inputs for dd, mm and yyyy. Then after reading this in I will concatenate them into one string and spli
   // the string up here (this just means that this function has fewer inputs which makes it easier to read.
//    var dd = parseFloat(date_str.slice(0, 2));
//    var mm = parseFloat(date_str.slice(2, 4));
//    var yyyy = parseFloat(date_str.slice(4, 8));
   
   // Then convert the time into hours as a float - the same as above applies for this, this will be two separate fields that I concatenate together.
//    var hours = parseFloat(time_str.slice(0, 2)) + parseFloat(time_str.slice(2, 4) / 60.0);
//    var day_frac = hours / 24.0;
   
   // Now we're going to use a couple of arrays to define the cumulative number of days in the year for a normal year and a leap year/
//    var year_days = [0.0, 31.0, 59.0, 90.0, 120.0, 151.0, 181.0, 212.0, 243.0, 273.0, 304.0, 334.0];
//    var leap_year_days = [0.0, 31.0, 60.0, 91.0, 121.0, 152.0, 182.0, 213.0, 244.0, 274.0, 305.0, 335.0];
   
   // Calculate how many days have passed in the current year, depending on whether or not it is a leap year.
//    var days_in_year = 0;
//    if (leap_years.includes(yyyy)) { 
//       days_in_year = leap_year_days.slice(Math.round(mm), Math.round(mm) + 1);
//    } else {
//       days_in_year = year_days.slice(Math.round(mm), Math.round(mm) + 1);
//    }
   
   // Calculate how many days from the start of the year to J2000
//    var days_to_J2000 = 0;
//    if (yyyy == 1998.) {
//      days_to_J2000 = -731.5;
//    } elif (yyyy == 2008.) { 
//      days_to_J2000 = 2920.5;
//    } elif (yyyy == 2019.) {
//      days_to_J2000 = 6938.5;
//  } elif (yyyy == 2020.) {
//      days_to_J2000 = 7303.5;
//    } elif (yyyy == 2021.) {
//      days_to_J2000 = 7669.5;
//    }
// 
// 
//    var total_date = days_to_J2000 + days_in_year + dd + day_frac;
//    return total_date;
// }


// Our labels along the x-axis
var UT_time = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300];
// For drawing the lines
var elevation = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: UT_time,
    datasets: [
      { 
        data: elevation,
        label: "Source",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  }
});
