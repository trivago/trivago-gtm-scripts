'use strict'
var TRV = TRV || {}
TRV.Tag = TRV.Tag || {}

console.log('script starting');
console.log(data);
console.log(DATA_TRV);
var DATA_TRV = DATA_TRV;

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
    .then(response => response.json())
    .then(data => {
        console.log(data);
        DATA_TRV.gtmOnSuccess();
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
