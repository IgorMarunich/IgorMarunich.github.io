You must use JQuery
1. function Carousel (typeCarousel, widthImg, heightImg, ...locations) - the constructor to create an object.
There can be any quantity of carousels on a page.

	typeCarousel: slide - sliding images horizontally (with buttons)
 	       	       fade - fading out/in images at the same time(scroll)
                           	       overlap - overlapping images vertically (scroll)
	widthImg - the width of your images in pixels
	heightImg - the height of your images in pixels
	...locations - paths to your images (separate by commas)

2. obj.setHTML(suffix, locStop, locPlay, widthButtons, nativeDiv) - HTML settings.

	suffix - suffix for the class or id
	locStop - the path to the image for a button stop
	locPlay - the path to the image for a button play
	widthButtons - the width of your play/stop buttons
	nativeDiv - the parent div of your slider (set CSS selector like "#anyDiv" or ".anyDiv" etc.)

3. obj.setViewButtons(locLeftButton, locRightButton, percentageWrapper = 15, widthImg = 48, heightImg = 48, opacity = 0.5)
Do not use with fade or overlap (only for slide).

	locLeftButton - the path for left button
	locRightButton - the path for right button
	percentageWrapper - the width of a block for a button (the percentage from your image)(default = 15%)
	widthImg - width of your image (default = 48px)
	heightImg - height of your image (default = 48px)
	opacity - opacity of the block for a button (default = 0.5)

4. obj.run(speed = 500, frequency = 4000)

	speed - shift image speed (default = 500ms)
	frequency - image changing frequency (default = 4000ms)