
/**You must use JQuery
 * 1. function Carousel (typeCarousel, widthImg, heightImg, ...locations) - the constructor to
 *    create an object. There can be any quantity of carousels on a page.
 *
 *      typeCarousel: slide - sliding images horizontally (with buttons)
 *                    fade - fading out/in images at the same time(scroll)
 *                    overlap - overlapping images vertically (scroll)
 *      widthImg - the width of your images in pixels
 *      heightImg - the height of your images in pixels
 *      ...locations - paths to your images (separate by commas)
 *
 * 2. obj.setHTML(suffix, locStop, locPlay, widthButtons, nativeDiv) - HTML settings.
 *
 *      suffix - suffix for the class or id
 *      locStop - the path to the image for a button stop
 *      locPlay - the path to the image for a button play
 *      widthButtons - the width of your play/stop buttons
 *      nativeDiv - the parent div of your slider (set CSS selector like "#anyDiv" or ".anyDiv" etc.)
 *
 * 3. obj.setViewButtons(locLeftButton, locRightButton, percentageWrapper = 15, widthImg = 48,
 *    heightImg = 48, opacity = 0.5) Do not use with fade or overlap (only for slide).
 *
 *      locLeftButton - the path for left button
 *      locRightButton - the path for right button
 *      percentageWrapper - the width of a block for a button (the percentage from your image)
 *                                                                             (default = 15%)
 *      widthImg - width of your image (default = 48px)
 *      heightImg - height of your image (default = 48px)
 *      opacity - opacity of the block for a button (default = 0.5)
 *
 * 4. obj.run(speed = 500, frequency = 4000)
 *
 *      speed - shift image speed (default = 500ms)
 *      frequency - image changing frequency (default = 4000ms)**/


'use strict';
function Carousel (typeCarousel, widthImg, heightImg, ...locations){
    this._type = typeCarousel;
    this._w = widthImg;
    this._h = heightImg;
    this._imagesLoc = locations;
}

Carousel.prototype.setHTML = function (suffix, locStop, locPlay, widthButtons, nativeDiv){
    let self = this;
    this._suffix = suffix ? suffix: '';
    this._stop = locStop;
    this._play = locPlay;
    let suf = this._suffix;

    let imgTags = function (classImg){

        let firstImg = `<img class=${classImg} src=${self._imagesLoc[self._imagesLoc.length - 1]}>`;
        let str;

        function getImgToStr (){
            let s = '';
            for (let i = 0; i < self._imagesLoc.length; i++){
                s += (`<img class=${classImg} src=${self._imagesLoc[i]}>`);
            }
            return s;
        }

        let lastImg = `<img class=${classImg} src=${self._imagesLoc[0]}>`;

        if (self._type == 'slide') str = firstImg + getImgToStr() + lastImg;
        else return getImgToStr();

        return str;
    }(`img${suf}`);

    let divView = function (classesImg, classButton){
        let s = `<div id=scrollMe${suf}>Scroll Me</div>`;

        if (self._type == 'slide') s = '';

        for (let i = 0; i < self._imagesLoc.length; i++){
            s += `<div class=${classesImg}></div>`;
        }
        return s + `<div class=${classButton}><img src=${self._stop}></div>`;
    }(`viewImg${suf}`, `button${suf}`);

    let html = function (){
        let result;
        let divFrame = `<div id=divFrame${suf}>`;
        let wrapper = `<div id=wrapper${suf}>
                           <div id=rightButton${suf}>
                               <img id=rightArrow${suf}>
                           </div>
                           <div id=leftButton${suf}>
                               <img id=leftArrow${suf}>
                           </div>
                       </div>`;

        let divImg = `<div id=divImg${suf}>${imgTags}</div>
                      <div id=divView${suf}>${divView}</div>
                      </div>`;

        if (self._type == 'slide') result = divFrame + wrapper + divImg;
        else return divFrame + divImg;

        return result;
    }();

    $(nativeDiv).prepend(html);

    let divFrame = $(`#divFrame${suf}`);
    let divImg = $(`#divImg${suf}`);
    let classImg = $(`.img${suf}`);
    let view = $(`#divView${suf}`);
    let classViewImg = $(`.viewImg${suf}`);
    let classButton = $(`.button${suf}`);
    let divScrollMe = $(`#scrollMe${suf}`);

    classViewImg.addClass(`line${suf}`);
    classButton.addClass(`line${suf}`);
    let lineSuf = $(`.line${suf}`);

    let cssScrollMe = () => {
        divScrollMe.css({
            'text-align': 'center',
            width: 64 + 'px',
            'background-color': 'black',
            position: 'absolute',
            color: '#e1e1e1',
            'font-size': 13 + 'px',
            float: 'left',
            top: -self._h + 'px',
            padding: 4 + 'px',
            'border-bottom-left-radius': 5 + 'px',
            'border-bottom-right-radius': 5 + 'px',
            opacity: 0.49
        });
    };

    let cssFunc = () => {

        view.css({
            top: 0,
            float: 'left',
            left: Math.round(self._w / 2 - (self._imagesLoc.length * 11 + widthButtons) / 2) + 'px',
            position: 'absolute',
            'margin-top': (self._h - 30) + 'px',
            'z-index': 9999
        });
        lineSuf.css({
            display: 'inline-block'
        });
        classViewImg.css({
            width: 4 + 'px',
            height: 4 + 'px',
            border: 2 + 'px solid black',
            opacity: 0.49,
            'border-radius': 100 + '%',
            'margin-bottom': 1 + 'px',
            'margin-right': 3 + 'px'
        });
        classViewImg.eq(0).css('background-color', 'black');
    };

    let cssDivFrame = {
        position: 'relative',
        overflow: 'hidden',
        width: self._w + 'px',
        height: self._h + 'px',
        'vertical-align': 'middle'
    };
    let cssDivImg = {
        width: self._w + 'px',
        position: 'relative'
    };

    switch (this._type){
        case 'fade':    divImg.css(cssDivImg);
                        divFrame.css(cssDivFrame);
                        classImg.css({
                            position: 'absolute'
                        });
                        for (let i = 1; i < classImg.length; i++){
                            classImg.eq(i).css({
                                opacity: 0,
                                'z-index': -i
                            });
                        }

                        cssFunc();
                        cssScrollMe();

            break;
        case 'overlap': divImg.css(cssDivImg);
                        divFrame.css(cssDivFrame);
                        classImg.css({
                            position: 'absolute',
                            'z-index': -1
                        });
                        classImg.eq(0).css({
                            top: 0,
                            'z-index': 0
                        });

                        cssFunc();
                        cssScrollMe();
            break;
        case 'slide':
             default:   divImg.css({
                            width: (self._imagesLoc.length + 2) * self._w + 'px',
                            position: 'relative',
                            left: -self._w + 'px'
                        });

                        divFrame.css({
                            position: 'relative',
                            overflow: 'hidden',
                            width: self._w + 'px'
                        });

                        cssFunc();

    }
};

Carousel.prototype.setViewButtons = function (locLeftButton,
                                              locRightButton,
                                              percentageWrapper = 15,
                                              widthImg = 48, heightImg = 48,
                                              opacity = 0.5){
    let self = this;
    let suf = this._suffix;

    $(`#leftArrow${suf}`).attr('src', locLeftButton);
    $(`#rightArrow${suf}`).attr('src', locRightButton);

    $(`#wrapper${suf}`).css({
        display: 'none',
        position: 'absolute',
        'z-index': 999,
        width: 'inherit'
    });

    $(`#leftButton${suf}, #rightButton${suf}`).css({
        float: 'left',
        width: self._w / (100 / percentageWrapper) + 'px',
        height: self._h + 'px',
        'background-color': 'black',
        opacity: opacity,
        cursor: 'pointer'
    });
    $(`#rightButton${suf}`).css({float: 'right'});

    $(`#leftArrow${suf}, #rightArrow${suf}`).css({
        position: 'relative',
        top: (self._h / 2) - (heightImg / 2) + 'px',
        left: (parseInt($(`#leftButton${suf}`).css('width')) / 2) - (widthImg / 2) + 'px'
    });
};


Carousel.prototype.run = function (speed = 500, frequency = 4000){
    let self = this;
    let suf = this._suffix;

    let divImg = $(`#divImg${suf}`);
    let rightButton = $(`#rightButton${suf}`);
    let leftButton = $(`#leftButton${suf}`);
    let classImg = $(`.img${suf}`);

    switch (this._type){
        case 'fade': setFade();
            break;

        case 'overlap': setOverlap();
            break;

        case 'slide':
        default : setSlide();
    }

    function setOverlap (){
        let divImg = document.getElementById(`divImg${suf}`);
        let top, index, numIndex, inc;
        let currentIndex = 0;
        let viewImg = $(`.viewImg${suf}`);
        let buttonImg = $(`.button${suf}`).find('img');
        let divScrollMe = $(`#scrollMe${suf}`);
        let frame = $(`#divFrame${suf}`);

        function move (event){

            if (event == undefined) return f;

                let delta =  event.deltaY;

                if (delta > 0) {
                    top = -self._h;
                    index = -1;
                    numIndex = classImg.length - 1;
                    inc = 1;
                } else {
                    top = self._h;
                    index = 0;
                    numIndex = -classImg.length;
                    inc = -1;
                }

            function f (){

                if (event == undefined){top = -self._h;
                                        index = -1;
                                        numIndex = classImg.length - 1;
                                        inc = 1;}
                classImg.eq(currentIndex + inc).css({top: top, 'z-index': 1});

                classImg.eq(currentIndex + inc).animate({top: 0}, speed, null, function () {
                    classImg.eq(currentIndex).css({
                        'z-index': 1,
                        top: top
                    });
                    classImg.eq(currentIndex + inc).css({'z-index': 0});
                    classImg.eq(currentIndex + inc).clearQueue();

                    viewImg.eq(currentIndex + inc).css('background-color', 'black');
                    viewImg.eq(currentIndex).css('background-color', 'inherit');

                    currentIndex = currentIndex + inc;
                    if (currentIndex == numIndex) currentIndex = index;

                });
            }
            f();
            clearInterval(timer);
            buttonImg.attr('src', self._play);
            event.preventDefault();
        }

        function scrollAnimate(){
            let val;

            if (divScrollMe.css('top') == -self._h+'px' && frame.is(':hover') == true) {
                val = '+';
            } else if (divScrollMe.css('top') == (-self._h + 30)+'px' && frame.is(':hover') == false) {
                val = '-';
            } else return;
            divScrollMe.animate({top: val + '=30px'}, 100, 'linear');
        }

        frame.hover(scrollAnimate, scrollAnimate);

        divImg.addEventListener("wheel", move);
        let timer = setInterval(move(), frequency);

        buttonImg.hover(() => {
            buttonImg.css({
                cursor: 'pointer'
            })
        }).click(() => {
            let src = buttonImg.attr('src');
            if (src == self._stop) {
                clearInterval(timer);
                buttonImg.attr('src', self._play);
            } else {
                timer = setInterval(move(), frequency);
                buttonImg.attr('src', self._stop);
            }
        });
    }


    function setFade (){
        let divImg = document.getElementById(`divImg${suf}`);
        let currentIndex = 0;
        let index, numIndex, inc;
        let viewImg = $(`.viewImg${suf}`);
        let buttonImg = $(`.button${suf}`).find('img');
        let divScrollMe = $(`#scrollMe${suf}`);
        let frame = $(`#divFrame${suf}`);

        function move (event){

            if (event == undefined) return f;

                let delta = event.deltaY;

                if (delta > 0) {
                    index = -1;
                    //numIndex = 4;
                    numIndex = classImg.length - 1;
                    inc = 1;
                } else {
                    index = 0;
                    numIndex = -classImg.length;
                    inc = -1;
                }

                event.preventDefault();

                function f (){

                    if (event == undefined){index = -1;
                                            numIndex = classImg.length - 1;
                                            inc = 1;}

                    if (classImg.eq(currentIndex).css('opacity') != 1 ||
                    classImg.eq(currentIndex + inc).css('opacity') != 0) return;

                    classImg.eq(currentIndex).animate({opacity: 0}, speed, null, () => {
                        classImg.eq(currentIndex).css({
                            'z-index': -1
                        });
                    });
                    classImg.eq(currentIndex + inc).animate({opacity: 1}, speed, null, () => {
                        classImg.eq(currentIndex).css({
                            'z-index': 0
                        });
                    });

                    viewImg.eq(currentIndex + inc).css('background-color', 'black');
                    viewImg.eq(currentIndex).css('background-color', 'inherit');

                    currentIndex = currentIndex + inc;
                    if (currentIndex == numIndex) currentIndex = index;
                }
            f();

            clearInterval(timer);
            buttonImg.attr('src', self._play);
        }

        function scrollAnimate (){
            let val;

            if (divScrollMe.css('top') == -self._h+'px' && frame.is(':hover') == true) {
                val = '+';
            } else if (divScrollMe.css('top') == (-self._h + 30)+'px' && frame.is(':hover') == false) {
                val = '-';
            } else return;
            divScrollMe.animate({top: val + '=30px'}, 100, 'linear');
        }

        frame.hover(scrollAnimate, scrollAnimate);

        divImg.addEventListener("wheel", move);
        let timer = setInterval(move(), frequency);

        buttonImg.hover(() => {
            buttonImg.css({
                cursor: 'pointer'
            })
        }).click(() => {
            let src = buttonImg.attr('src');
            if (src == self._stop) {
                clearInterval(timer);
                buttonImg.attr('src', self._play);
            } else {
                timer = setInterval(move(), frequency);
                buttonImg.attr('src', self._stop);
            }
        });
    }

    function setSlide (){

        let currentIndex = 0;
        let inc = 1;
        let viewImg = $(`.viewImg${suf}`);
        let buttonImg = $(`.button${suf}`).find('img');
        function getCurrentLeft (){
            return divImg.css('left');
        }

        function setDisplay (value){
            return () => {
                $(`#wrapper${suf}`).css({
                    display: value
                });
            };
        }

        function move (){
            if (getCurrentLeft() == -self._w * self._imagesLoc.length + 'px') divImg.css('left', 0);
            divImg.animate({left: "-=" + self._w}, speed, 'linear', () => {
                divImg.clearQueue();
            });

            viewImg.eq(currentIndex + inc).css('background-color', 'black');
            viewImg.eq(currentIndex).css('background-color', 'inherit');
            currentIndex = currentIndex + inc;
            if (currentIndex == (classImg.length - 2) - 1) currentIndex = -1;
        }
        leftButton.click(() => {
            if (getCurrentLeft() == '0px') divImg.css('left', -self._w * self._imagesLoc.length);
            divImg.animate({left: "+=" + self._w}, speed, null, () => {
                divImg.clearQueue();
            });

            viewImg.eq(currentIndex - inc).css('background-color', 'black');
            viewImg.eq(currentIndex).css('background-color', 'inherit');
            currentIndex = currentIndex - inc;
            if (currentIndex == -(classImg.length - 2)) currentIndex = 0;
        });

        rightButton.click(move);

        let timer = setInterval(move, frequency);

        buttonImg.hover(() => {
            buttonImg.css({
                cursor: 'pointer'
            })
        }).click(() => {
            let src = buttonImg.attr('src');
            if (src == self._stop) {
                clearInterval(timer);
                buttonImg.attr('src', self._play);
            } else {
                timer = setInterval(move, frequency);
                buttonImg.attr('src', self._stop);
            }
        });

        $(`#divFrame${suf}`)
            .hover(setDisplay('block'), setDisplay('none'))
            .click(() => {
                if (leftButton.is(':hover') == true || rightButton.is(':hover') == true) {
                    clearInterval(timer);
                    buttonImg.attr('src', self._play);
                }
            });
    }
};
