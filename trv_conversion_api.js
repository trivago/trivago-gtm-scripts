'use strict'
var TRV = TRV || {};
TRV.Tag = TRV.Tag || {};

var DATA_TRV = DATA_TRV;
var method = 'post';

TRV.Tag.doEvent = function() {
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
    channel: TRV.Tag.channel,
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
