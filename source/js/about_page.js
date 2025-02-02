$(document).ready(function () {

    const $imageToShow = $('#image-me-about');
    const imageOriginalSize = $imageToShow.data('width');

    $('#output').hover(function () {

        // $imageToShow.css('position', 'static');
        $imageToShow.stop().animate({
            width: imageOriginalSize,
            borderRadius: `${5}%`
        }, 'slow');

    }, function () {

        $imageToShow.stop().animate({
            width: `${0}%`,
            borderRadius: `${50}%`
        }, 400, function () {
            // $imageToShow.css('position', 'absolute');
        });

    });

});