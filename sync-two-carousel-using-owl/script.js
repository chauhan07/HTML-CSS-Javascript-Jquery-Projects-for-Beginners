jQuery(document).ready(function() {
    var sync1 = $('#sync1'),
        sync2 = $('#sync2'),
        duration = 300,
        thumbs = 4;

    // Sync nav
    sync1.on('click', '.owl-next', function() {
        sync2.trigger('next.owl.carousel')
    });
    sync1.on('click', '.owl-prev', function() {
        sync2.trigger('prev.owl.carousel')
    });

    // Start Carousel
    sync1.owlCarousel({
        // rtl: true,
        // center: true,
        loop: true,
        items: 1,
        margin: 0,
        smartSpeed: 700,
        lazyLoad: true,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
    }).on('dragged.owl.carousel', function(e) {
        if (e.relatedTarget.state.direction == 'left') {
            sync2.trigger('next.owl.carousel')
        } else {
            sync2.trigger('prev.owl.carousel')
        }
    });


    sync2.owlCarousel({
        // rtl: true,
        loop: true,
        items: thumbs,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 700,
        nav: false,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        // center: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            }
        }
    }).on('click', '.owl-item', function() {
        var i = $(this).index() - (thumbs + 1);
        sync2.trigger('to.owl.carousel', [i, duration, true]);
        sync1.trigger('to.owl.carousel', [i, duration, true]);
    });
});