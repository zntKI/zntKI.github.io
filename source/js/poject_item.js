$(document).ready(function () {

    $('.item-bg-projects').each(function () {

        const $this = $(this);

        $this.data('originalBoxShadow', $this.css('box-shadow'));

        // Set initial bg image
        let originalBgSrc = $this.data('thumbnail-src'); // Get src from data attribute
        if (originalBgSrc != 'none') {
            $this.css('background-image', 'url("' + originalBgSrc + '")');
            adjustHeightToFitImage($this, originalBgSrc); // Adjust height so that it matches the image' width
        }

        // Preload the GIF (for better experienve)
        let gifSrc = $this.data("demo-src");
        let img = new Image();
        img.src = gifSrc;

    });

    $('.item-bg-projects').mouseenter(
        function () {

            const $this = $(this);

            // Switch to 'on-hover' box shadow
            $this.css('box-shadow', '10px 5px 20px 0px #765724'); // '-10px 5px 20px 0px #765724'

            // Switch to 'on-hover' background image (gif)
            let newBgSrc = $this.data('demo-src');
            $this.css('background-image', 'url("' + newBgSrc + '")');

        }
    );

    $('.item-bg-projects').mouseleave(
        function () {

            const $this = $(this);

            // Switch back to original box shadow
            $this.css('box-shadow', $this.data('originalBoxShadow'));

            // Switch back to original background image (thumbnail)
            let originalBgSrc = $this.data('thumbnail-src');
            $this.css('background-image', 'url("' + originalBgSrc + '")');

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

            $element.height(height);
            $element.siblings().height(height);
        };
    }

    $(window).resize(function () {
        $('.item-bg-projects').each(function () {

            const $this = $(this);

            let originalBgSrc = $this.data('thumbnail-src'); // Get src from data attribute
            if (originalBgSrc != 'none') {
                adjustHeightToFitImage($this, originalBgSrc); // Adjust height so that it matches the image' width
            }

        });
    });
});