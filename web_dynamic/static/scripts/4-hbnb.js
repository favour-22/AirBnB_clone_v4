$(document).ready(function () {
  const myDict = {};

  // CHANGE BACK TO 0.0.0.0 INSTEAD OF localhost
  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    success: function (result) {
      let format;
      console.log(result);
      let place = '';
      for (place in result) {
        format = '<div class="title">' +
          '<h2>' + result[place].name + '</h2>' +
          '<div class="price_by_night">' + result[place].price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
          '<div class="max_guest">' +
          '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          result[place].max_guest + 'Guests' +
          '</div>' +
          '<div class="number_rooms">' +
          '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          result[place].number_rooms + 'Bedrooms' +
          '</div>' +
          '<div class="number_bathrooms">' +
          '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          result[place].number_bathrooms + 'Bathroom' +
          '</div>' +
          '</div>' +
          '<div class="description">' +
          result[place].description +
          '</div>';

        $('.places').html('<ARTICLE>' + format + '</ARTICLE>');
      }
    },
    contentType: 'application/json'
  });

  // CHANGE BACK TO 0.0.0.0 INSTEAD OF localhost
  $.get('http://0.0.0.0:5001/api/v1/status/', function (body) {
    if (body.status === 'OK') {
    //  alert('make red');
      $('DIV#api_status').addClass('available');
    } else {
    //  alert('make grey');
      $('DIV#api_status').removeClass('available');
    }
  });

  $(':checkbox').click(function () {
    $(this).each(function () {
      if ($(this).prop('checked')) {
        myDict[($(this).attr('data-name'))] = $(this).attr('data-id');
        $('H4#amenities_dict').html(Object.keys(myDict).join(', '));
      } else {
        delete (myDict[($(this).attr('data-name'))]);
        $('H4#amenities_dict').html(Object.keys(myDict).join(', '));
      }
    });
  });

  $('BUTTON').click(function () {
    const myAmenitiesDict = { amenities: Object.keys(myDict) };
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify(myAmenitiesDict),
      success: function (result) {
        const format = [];
        console.log(result);
        let place = '';
        for (place in result) {
          format.push('<div class="title">' +
          '<h2>' + result[place].name + '</h2>' +
          '<div class="price_by_night">' + result[place].price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
          '<div class="max_guest">' +
          '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          result[place].max_guest + 'Guests' +
          '</div>' +
          '<div class="number_rooms">' +
          '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          result[place].number_rooms + 'Bedrooms' +
          '</div>' +
          '<div class="number_bathrooms">' +
          '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          result[place].number_bathrooms + 'Bathroom' +
          '</div>' +
          '</div>' +
          '<div class="description">' +
          result[place].description +
          '</div>');

          $('.places').html('<ARTICLE>' + format + '</ARTICLE>');
        }
      },
      contentType: 'application/json'
    });
  });
});
