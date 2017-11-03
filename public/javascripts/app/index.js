$(function () {
    var speed = 1024;

    $('#imgStream').height($(window).height());

    $('.div-ctl').on('touchstart', function () {
        event.preventDefault();
        move($(this).attr('dir'), speed);
    })

    $('.div-ctl').on('touchend', function () {
        move('f', 0);
    })

    function move(dir, speed) {
        var url = '/api/move?dir=' + dir + '&speed=' + speed + '&_=' + new Date().getTime();
        $.get(url, function () {
        });
    }

})


