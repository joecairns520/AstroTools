function printRADec(){
  var ra_in = document.getElementById("RA").value;
  var dec_in = document.getElementById("Dec").value;
  
  if (ra_in.indexOf(':') > -1)
  {
    var ra_split = ra_in.split(":");
    var dec_split = dec_in.split(":");
    document.getElementById('display').innerHTML = ra_split.slice(0, 1);
  }
 
}
