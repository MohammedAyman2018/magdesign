$(document).ready(function(){
  $('#arrow').click(function(){
    $('ul.inner-list').slideToggle();
  });
  $('#close_sidebar').click(function(){
    $('#sidebar').css('right','-300px');
  });
  $('#menu').click(function(){
    $('#sidebar').css('right','0px');

  });

});