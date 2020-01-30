/* eslint-disable no-console */
function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var TRV_REF = TRV_REF || {};
var query = window.location.search.substring(1);
var qs = parse_query_string(query);

if (!TRV_REF.placeholder) {
  TRV_REF.placeholder = "trv_reference";
}
var trv_reference_val = qs[TRV_REF.placeholder];


fetch('https://secde.trivago.com/page_check.php?pagetype=trv_ref&ref=329&trv='+trv_reference_val, {
    method: 'GET'
  });


if (trv_reference_val) {
  setCookie("GTM_TRV_REFERENCE_TR", trv_reference_val, 30);
  localStorage.setItem("GTM_TRV_REFERENCE_TR", trv_reference_val);
} else {
  //no trv_referense is present
}
