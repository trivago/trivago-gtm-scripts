'use strict'
var TRV = TRV || {}
TRV.Tag = TRV.Tag || {}
window.RSLT_TRV = {}

TRV.Tag.doEvent = function() {
  let opts = {
    advertiser_id: TRV.Tag.advertiser_id,
    trv_reference: TRV.Tag.trv_reference,
    hotel: TRV.Tag.hotel,
    arrival: TRV.Tag.arrival,
    departure: TRV.Tag.departure,
    volume: TRV.Tag.volume,
    booking_id: TRV.Tag.booking_id,
    margin: TRV.Tag.margin,
    currency: TRV.Tag.currency,
    date_format: TRV.Tag.date_format,
    booking_date: TRV.Tag.booking_date
  }

  console.log('calling endpoint');
  console.log(opts);
  fetch('https://secde.trivago.com/tracking/booking', {
    method: 'post',
    body: JSON.stringify(opts),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-Trv-Ana-key': TRV.Tag.api_key
    }
  })
    .then(function(response=>response.json())
    .then(data=>{
      console.log(data);
      window.RSLT_TRV.status = true;
      window.RSLT_TRV.message = data;
    }) 
    .catch(function(data) {
      window.RSLT_TRV.status = false;
      window.RSLT_TRV.message = data;
      console.log('Error happened: ' + data);
    })
}

TRV.Tag.main = function() {
  TRV.Tag.doEvent()
}
TRV.Tag.main()
