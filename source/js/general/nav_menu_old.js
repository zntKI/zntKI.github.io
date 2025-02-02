$(document).ready(function () {

    const $navContainer = $('#nav-projects');

    $('.nav-to-show-el-projects').each(function () {
        $(this).css('left', -$navContainer.width())
    });

    const $mapIcon = $('#map-icon-projects');

    let isHovering = false;

    const $otherElementsToShow = $('.nav-to-show-el-projects');

    const originalIconHeight = $mapIcon.height();

    $mapIcon.mouseenter(function () {

        isHovering = true;

        $mapIcon.attr("stroke", "#EDAE49");
        $mapIcon.attr("stroke-width", "1.5");

        const changeInIconHeight = originalIconHeight;

        $mapIcon.stop().animate({
            height: originalIconHeight + changeInIconHeight,
            width: $mapIcon.width()
        }, {
            duration: 'fast',
            progress: function (_, progress) {

                if (progress >= 0.1) {

                    // Animate other elements while iterating an array
                    animateOther(false, 0);

                }

            }
        });

    });

    $navContainer.mouseleave(function () {

        if (isHovering) {

            isHovering = false;

            // Animate other elements while iterating an array
            animateOther(true, $otherElementsToShow.length - 1);

        }

    });

    function animateOther(isOrderReversed, index) {

        const $element = $otherElementsToShow.eq(index);

        $element.stop().animate({
            left: !isOrderReversed ? 0 : -$navContainer.width()
        }, {
            duration: !isOrderReversed ? 150 : 100,
            progress: function (_, progress) {

                if (progress >= 0.05) {

                    if (!isOrderReversed && index + 1 < $otherElementsToShow.length) {
                        animateOther(isOrderReversed, index + 1);
                    }
                    else if (isOrderReversed) {

                        if (index - 1 >= 0) {
                            animateOther(isOrderReversed, index - 1);
                        }
                        else {
                            $mapIcon.stop().animate({
                                height: originalIconHeight,
                                width: $mapIcon.width()
                            }, 'fast', function () {
                                $mapIcon.attr("stroke", "white");
                                $mapIcon.attr("stroke-width", "1");
                            });
                        }

                    }

                }

            }
        });

    }

    $('.nav-el-cont-projects').hover(function () {

        if (isHovering) {

            const $text = $(this).find('p');
            $text.data('originalFontSize', parseFloat($text.css('font-size')));

            // $text.css('color', '#EDAE49');
            $text.stop().animate({
                fontSize: $text.data('originalFontSize') * 1.2
            }, 'fast');

            const $hr = $(this).find('hr');
            $hr.css('border-color', '#EDAE49');
            $hr.stop().animate({
                left: $(this).width() - $hr.width()
            }, 'fast');

            $(this).find('svg').show();

        }

    }, function () {

        if (isHovering) {

            const $text = $(this).find('p');

            // $text.css('color', 'white');
            $text.stop().animate({
                fontSize: $text.data('originalFontSize')
            }, 'fast');

            const $hr = $(this).find('hr');
            $hr.css('border-color', 'white');
            $hr.stop().animate({
                left: 0
            }, 'fast');

            $(this).find('svg').hide();

        }

    });

});