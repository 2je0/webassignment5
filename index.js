$('.modal').hide();
$('#AddBtn').on('click', function () {
    $('.modal').show();
    $('.modal-dialog').animate({
        opacity: "0",
        top: '40px'
    },0);
    $('.modal-dialog').animate({
        opacity: "1",
        top: '80px'
    },1000);
});
$('#modal_X').on('click', function () {
   $('.modal').hide();
});
$('#modal_close').on('click', function () {
   $('.modal').hide();
});



