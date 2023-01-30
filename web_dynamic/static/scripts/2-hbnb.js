$(document).ready(function () {
  const myDict = {};

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
});
