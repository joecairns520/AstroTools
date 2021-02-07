function printRADec(){
  var ra_in = document.getElementById("RA").value;
  var dec_in = document.getElementById("Dec").value;
  document.getElementById('display').innerHTML = 5 + 5;
  
  if (ra_in.indexOf(':') > -1)
  {
    document.getElementById('display').innerHTML = 'There is a : here!';
  }
 
}
