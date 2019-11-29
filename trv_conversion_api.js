'use strict'
var TRV = TRV || {}
TRV.Tag = TRV.Tag || {}
var RSLT_TRV = RSLT_TRV || {}

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

  fetch('https://secde.trivago.com/tracking/booking', {
    method: 'post',
    body: JSON.stringify(opts),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-Trv-Ana-key': TRV.Tag.api_key
    }
  })
    .then(function(response) {
      console.log(response.json());
      RSLT_TRV.status = true;
      RSLT_TRV.message = response.json();
      data.gtmOnSuccess();
    })
    .catch(function(data) {
      RSLT_TRV.status = false;
      RSLT_TRV.message = data;
      console.log('Error happened: ' + data);
    })
}

TRV.Tag.main = function() {
  TRV.Tag.doEvent()
}
TRV.Tag.main()
