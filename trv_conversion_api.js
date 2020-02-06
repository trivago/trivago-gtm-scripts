'use strict'
var TRV = TRV || {};
TRV.Tag = TRV.Tag || {};

var DATA_TRV = DATA_TRV;
var method = 'post';

function trvCheckGetCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function findTrvRef(name) {
    var theCookies = document.cookie.split(';');
    for (var i = 1 ; i <= theCookies.length; i++) {
		  if (theCookies[i-1].includes(name)){
        var value = theCookies[i-1].split('=')[1];
        if (value !== "false") {
          return value;
        }
      }
    }
}

TRV.Tag.doEvent = function() {
  var tf_source=0;
  if (TRV.Tag.trv_reference){
    //trv_reference is not empty, do nothing
  } else {
    //attempt to extract trv_reference from the cookie
    TRV.Tag.trv_reference = trvCheckGetCookie('GTM_TRV_REFERENCE_TR');
    tf_source=1;
  }
  if (TRV.Tag.trv_reference){ 
    //trv_reference is not empty, do nothing
  } else {
    TRV.Tag.trv_reference = localStorage.getItem('GTM_TRV_REFERENCE_TR');
    tf_source=2;
  }
  
  if (TRV.Tag.trv_reference=="deleted"){ 
    TRV.Tag.trv_reference = trvCheckGetCookie('GTM_TRV_REFERENCE_TR');
    tf_source=3;
  }
  
  if (TRV.Tag.trv_reference=="deleted"){ 
    TRV.Tag.trv_reference = localStorage.getItem('GTM_TRV_REFERENCE_TR');
    tf_source=4;
  }
  
  if (TRV.Tag.trv_reference=="false"){
    TRV.Tag.trv_reference = findTrvRef('GTM_TRV_REFERENCE_TR');
    tf_source=5;
  }
  
  let opts = {
    advertiser_id: TRV.Tag.advertiser_id,
    trv_reference: TRV.Tag.trv_reference,
    hotel: TRV.Tag.hotel,
    arrival: TRV.Tag.arrival,
    departure: TRV.Tag.departure,
    date_format: TRV.Tag.date_format,
    booking_date: TRV.Tag.booking_date,
    booking_date_format: TRV.Tag.booking_date_format,
    volume: TRV.Tag.volume,
    currency: TRV.Tag.currency,
    booking_id: TRV.Tag.booking_id,
    locale: TRV.Tag.locale,
    margin: TRV.Tag.margin,
    margin_absolute: TRV.Tag.margin_absolute,
    refund_confirmation: TRV.Tag.refund_confirmation,
    refund_amount: TRV.Tag.refund_amount,
    channel: "gtm",
    source: tf_source
  }

  if (!TRV.Tag.trv_reference){
    return;
  }
  
  if (TRV.Tag.refund_confirmation == true) {
    method = 'delete';
  } else {
    method = 'post';
  }
  
  fetch('https://secde.trivago.com/tracking/booking', {
    method: method,
    body: JSON.stringify(opts),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-Trv-Ana-key': TRV.Tag.key
    }
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.state);
        if (data.state == 'FAILED'){
          DATA_TRV.gtmOnFailure();
        } else {
          DATA_TRV.gtmOnSuccess();
        }
        
      }) 
    .catch(function(data) {
      console.log('Error happened: ' + data);
      DATA_TRV.gtmOnFailure();
    })
}

TRV.Tag.main = function() {
  TRV.Tag.doEvent()
}
TRV.Tag.main()
