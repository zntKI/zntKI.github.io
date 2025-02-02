$(document).ready(function () {

    if ($(window).width() > 1280) {

        const $spotLight = $('#spotlight');

        $(document).mousemove(function (event) {

            $spotLight.css('left', `${event.clientX + window.scrollX}px`);
            $spotLight.css('top', `${event.clientY + window.scrollY}px`);

        });

    }

});