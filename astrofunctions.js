function printRADec(){
  var ra_in = document.getElementById("RA").value;
  var dec_in = document.getElementById("Dec").value;
  
  if (ra_in.indexOf(':') > -1)
  {
    var ra_split = ra_in.split(":");
    var dec_split = dec_in.split(":");
    
    var ra_out = ((360 / 24) * ra_split.slice(0, 1)) + ((360 / 24) * (ra_split.slice(0, 2) / 60)) + ((360 / 24) * (ra_split.slice(0, 3) / 3600));
    var dec_out = dec_split.slice(0, 1) + ((360 / 24) * (dec_split.slice(0, 2) / 60)) + ((360 / 24) * (dec_split.slice(0, 3) / 3600));
    document.getElementById('display').innerHTML = 'RA: ' + ra_out + ', Dec: ' + dec_out;
  }
 
}
