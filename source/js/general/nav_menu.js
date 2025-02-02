$(document).ready(function () {

    let isHovering = false;

    const $currentTitle = $('#current-title');
    $currentTitle.data('originalFontSize', parseFloat($currentTitle.css('font-size')));

    $('.possible-title').mouseenter(function () {

        const $possibleTitle = $(this);

        if ($possibleTitle.data('isHovering'))
            return;

        $possibleTitle.data('isHovering', true);

        console.log("in");


        $possibleTitle.data('originalFontSize', parseFloat($possibleTitle.css('font-size')));

        const $titleCont = $possibleTitle.parent();

        const fontSizeFactor = 1.2;
        const newHeight = $possibleTitle.height() * fontSizeFactor;

        // $text.css('color', '#EDAE49');
        $possibleTitle.stop().animate({
            fontSize: $possibleTitle.data('originalFontSize') * fontSizeFactor,
            top: -($titleCont.height() / 2) + newHeight / 2
        }, 'fast', function () {

            // Get the 'hr' el
            const $hr = $possibleTitle.next();
            $hr.css('top', `${-($titleCont.height() / 2) + newHeight / 1.5}px`);
            $hr.show();
            $hr.animate({
                width: $titleCont.width() * 0.8,
            }, 200);

        });


        $currentTitle.stop().animate({
            fontSize: $possibleTitle.data('originalFontSize'),
            bottom: -($titleCont.height() / 2) + ($possibleTitle.height() / 2)
        }, 'fast');
    });

    $('.possible-title-cont').mouseleave(function () {

        const $possibleTitle = $(this).find('h6');

        if ($possibleTitle.data('isHovering')) {

            console.log("out");

            const $hr = $possibleTitle.next();
            $hr.stop(true).animate({
                width: 0
            }, 100, function () {

                $hr.hide();
                $hr.css('top', '0px');

                $possibleTitle.stop().animate({
                    fontSize: $possibleTitle.data('originalFontSize'),
                    top: 0
                }, 200, function () {
                    $possibleTitle.data('isHovering', false);
                });


                $currentTitle.stop().animate({
                    fontSize: $currentTitle.data('originalFontSize'),
                    bottom: 0
                }, 200);

            });

        }

    });

});