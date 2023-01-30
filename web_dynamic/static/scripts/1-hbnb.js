$(document).ready(function () {
  const myDict = {};

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
