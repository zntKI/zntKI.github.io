$(document).ready(function () {

    $('.item-bg-projects').each(function () {
        $(this).data('originalWidth', $(this).width());
        $(this).data('originalHeight', $(this).height());
        $(this).data('originalBg', $(this).css('background-image'));
        $(this).data('originalBoxShadow', $(this).css('box-shadow'));
    });

    const $gridContainer = $('#main-projects-grid');

    let $previousItemSelected;

    $('.item-bg-projects').mouseenter(
        function () {

            const $this = $(this);
            const width = $this.outerWidth();

            if ($previousItemSelected != null) {
                return;
            }
            $previousItemSelected = $this;

            const isLeft = $this.hasClass("left-item-projects")
            const offsetAmount = isLeft ? -width : width;

            $this.animate(
                {
                    width: $gridContainer.width(),
                    left: `${isLeft
                        ? offsetAmount - ($gridContainer.width() * (parseFloat($gridContainer.css('column-gap')) / 100)/* Get that extra gap */)
                        : 0}px`
                },
                'slow',
                function () {

                    $this.css('box-shadow', isLeft ? '-10px 5px 20px 0px #765724' : '10px 5px 20px 0px #765724');
                    $this.css('z-index', 3);

                    // Enlarge height
                    let newBgSrc = $this.data('demo-src');

                    // let background = $this.css('background-image');

                    if (newBgSrc != 'none') {

                        // background = background.replace('url("', '').replace('")', '');

                        $this.css('background-image', 'url("' + newBgSrc + '")');
                        adjustHeightToFitImage($this, newBgSrc);

                    }
                });

            $this.siblings().each(function () {
                $(this).stop(true).animate({ left: `${-offsetAmount + (isLeft ? 1 : -1) * ($gridContainer.width() * (parseFloat($gridContainer.css('column-gap')) / 100)/* Get that extra gap */)}px` }, 'slow');
            });

        }
    );

    $('.item-bg-projects').mouseleave(
        function () {

            const $this = $(this);

            $this.stop(true).animate(
                {
                    width: $this.data('originalWidth'),
                    height: $this.data('originalHeight'),
                    left: '0px'
                },
                'fast',
                function () {
                    $this.css('background-image', $this.data('originalBg'));
                    $this.css('box-shadow', $this.data('originalBoxShadow'));
                    $this.css('z-index', 2);

                    $previousItemSelected = null;
                });

            $this.siblings().each(function () {
                $(this).stop(true).animate({ left: '0px' }, function () {
                });
            });

        }
    );

    function adjustHeightToFitImage($element, imgUrl) {
        // Create a temporary image to get natural dimensions
        const tempImage = new Image();
        tempImage.src = imgUrl;

        // Once image loads, calculate and set height based on width
        tempImage.onload = function () {
            const aspectRatio = tempImage.width / tempImage.height;
            const width = $element.width();
            const height = width / aspectRatio; // Calculate height based on width and aspect ratio

            $element.animate(
                {
                    height: height
                },
                'slow');
        };
    }

});