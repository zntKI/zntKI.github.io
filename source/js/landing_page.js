$(document).ready(function () {

    if ($(window).width() > 1280) {

        const $imageToShow = $('#image-me-landing');
        const imageOriginalSize = $imageToShow.data('width');

        $('#header-landing').hover(function () {

            // $imageToShow.css('position', 'static');
            $imageToShow.stop().animate({
                width: imageOriginalSize,
                borderRadius: `${10}%`
            }, 'slow');

        }, function () {

            $imageToShow.stop().animate({
                width: 0,
                borderRadius: `${50}%`
            }, 400, function () {
                // $imageToShow.css('position', 'absolute');
            });

        });


        $('.nav-el-cont-landing').hover(function () {

            const $text = $(this).find(':header');
            $text.data('originalFontSize', parseFloat($text.css('font-size')));

            // $text.css('color', '#EDAE49');
            $text.stop().animate({
                fontSize: $text.data('originalFontSize') * 1.2
            }, 'fast');

            const $hr = $(this).find('hr');
            $hr.show();
            $hr.css('border-color', '#EDAE49');
            $hr.stop().animate({
                width: $(this).width()
            }, 'fast');

            $(this).find('svg').show();

        }, function () {

            const $text = $(this).find(':header');

            // $text.css('color', 'white');
            $text.stop().animate({
                fontSize: $text.data('originalFontSize')
            }, 'fast');

            const $hr = $(this).find('hr');
            $hr.stop().animate({
                width: `${0}%`
            }, 'fast', function () {
                $hr.hide();
                $hr.css('border-color', 'white');
            });

            $(this).find('svg').hide();

        });

    }

});