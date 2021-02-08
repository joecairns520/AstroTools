function printRADec(){
  var ra_in = document.getElementById("RA").value;
  var dec_in = document.getElementById("Dec").value;
  
  if (ra_in.indexOf(':') > -1)
  {
    var ra_split = ra_in.split(":");
    var dec_split = dec_in.split(":");
    
    var ra_out = ((360.0 / 24.0) * parseFloat(ra_split.slice(0, 1))) + ((360.0 / 24.0) * (parseFloat(ra_split.slice(0, 2)) / 60.0)) + ((360.0 / 24.0) * (parseFloat(ra_split.slice(0, 3)) / 3600.0));
    var dec_out = parseFloat(dec_split.slice(0, 1)) + (parseFloat(dec_split.slice(0, 2)) / 60.0) + (parseFloat(dec_split.slice(0, 3)) / 3600.0);
    document.getElementById('display').innerHTML = 'RA: ' + ra_out.toString() + ', Dec: ' + dec_out.toString();
  }
 
}
