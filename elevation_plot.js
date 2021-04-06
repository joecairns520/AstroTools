


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
