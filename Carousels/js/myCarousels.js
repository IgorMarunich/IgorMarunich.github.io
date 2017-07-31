'use strict';
(() => {

    let elements = new Carousel('fade', 1000, 300,
        'images/4elems/еarth.jpg',
        'images/4elems/water.jpg',
        'images/4elems/flame.jpg',
        'images/4elems/air.jpg'
    );

    elements.setHTML('Elements',
        "images/buttons/pause_small.png",
        "images/buttons/play_small.png", 10, '#first');
    elements.run(1000, 4500);

    let things = new Carousel('overlap', 220, 276,
        'images/things_with_price/car.png',
        'images/things_with_price/guitar.png',
        'images/things_with_price/house.png',
        'images/things_with_price/ring.png',
        'images/things_with_price/phone.png',
        'images/things_with_price/watch.png',
        'images/things_with_price/yacht.png'
    );
    things.setHTML('Things',
        "images/buttons/pause_small.png",
        "images/buttons/play_small.png", 10, '#second');
    things.run(400, 3000);

    let design = new Carousel('slide', 420, 262,
        'images/design/design1.jpg',
        'images/design/design2.jpg',
        'images/design/design3.jpg'
    );

    design.setHTML('Design',
        "images/buttons/pause_small.png",
        "images/buttons/play_small.png", 10, '#third');
    design.setViewButtons(
        'images/buttons/round_arrow_left.png',
        'images/buttons/round_arrow_right.png', 18, 32, 32, 0.6);
    design.run(300, 5000);

    let texture = new Carousel('overlap', 1000, 100,
        'images/texture/1.jpg',
        'images/texture/2.jpg',
        'images/texture/3.jpg',
        'images/texture/4.jpg',
        'images/texture/5.jpg'
    );
    texture.setHTML('Texture',
        "images/buttons/pause_small.png",
        "images/buttons/play_small.png", 10, '#fourth');
    texture.run(350, 6000);

})();
