$(document).ready(function () {

    const $scrollBarContainer = $('.progress-bar-container');
    const $scrollBar = $('.progress-bar');

    let distanceFromTop = $(window).scrollTop();
    let distanceRatio = (distanceFromTop + $(window).height()) / $(document).height();

    let scrollBarHeight = distanceRatio * $scrollBarContainer.height();

    if (!sessionStorage.getItem('isReload')) { // TODO: Do it also on window resizing
        console.log("Page loaded");
        sessionStorage.setItem('isReload', 'true');

        $scrollBar.data('startHeight', scrollBarHeight);
        $scrollBar.data('currentHeight', scrollBarHeight);
    }

    $scrollBar.height(scrollBarHeight);

    let isManualScroll = false;

    // Add a mouse down event

    $scrollBarContainer.click(function (event) {

        isManualScroll = true;

        const mouseY = event.clientY;
        const scrollBarContPosY = /*$scrollBar.data('offsetFromTop')*//*Because it is set as sticky +*/ $scrollBarContainer.offset().top - $(window).scrollTop();

        const previousHeight = $scrollBar.data('currentHeight');
        const newHeight = mouseY - scrollBarContPosY;

        const pageAmountToMove = ((newHeight - previousHeight) / $scrollBarContainer.height()) * $(document).height();

        $('html, body').animate({
            scrollTop: $(window).scrollTop() + pageAmountToMove
        }, 'fast', function () {
            isManualScroll = false;
        });

        const startHeight = $scrollBar.data('startHeight');
        const clampedHeight = newHeight <= startHeight ? startHeight : newHeight;
        $scrollBar.stop().animate({
            height: clampedHeight
        }, 'slow', function () {
            $scrollBar.data('currentHeight', clampedHeight);
        });

    })

    $(window).scroll(function () {

        if (!isManualScroll) {

            distanceFromTop = $(window).scrollTop();
            distanceRatio = (distanceFromTop + $(window).height()) / $(document).height();

            scrollBarHeight = distanceRatio * $scrollBarContainer.height();

            $scrollBar.stop().animate({
                height: scrollBarHeight
            }, 'slow', function () {
                $scrollBar.data('currentHeight', scrollBarHeight);
            });
            // $scrollBar.height(scrollBarHeight);
            // $scrollBar.data('currentHeight', scrollBarHeight);
        }

    });
});