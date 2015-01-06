$(function() {

    var upElement = $("#up");

    function gimeRandomPosition(elementWidth, elementHeight) {
        var posx = (Math.random() * (upElement.width() - elementWidth)).toFixed();
        // #me height is ignored, no div placed there, 10 is margin
        var posy = (Math.random() * (upElement.height() - elementHeight - $("#me").height() - 10)).toFixed();
        // TODO return as object
        return [posx, posy];
    }

    function checkCollision(hashtagDiv) {

        newdivSize = hashtagDiv.getDivSize();
        randomPosition = gimeRandomPosition(newdivSize[0], newdivSize[1]);
        hashtagDiv.posx = randomPosition[0];
        hashtagDiv.posy = randomPosition[1];

        randomElemLeft = parseInt(randomPosition[0]);
        randomElemTop = parseInt(randomPosition[1]);
        randomElemeWidth = newdivSize[0];
        randomElemHeigt = newdivSize[1];
        randomElemFarY = randomElemTop + randomElemHeigt;
        randomElemFarX = randomElemLeft + randomElemeWidth;

        var col;

        $('div.hashtag').each(function(index, existingElem) {
            var existingElemPos = $(existingElem).offset();
            var existingElemPosLeft = parseInt(existingElemPos.left);
            var existingElemPosTop = parseInt(existingElemPos.top);
            var existingElemWidth = parseInt($(existingElem).outerWidth(true));
            var existingElemHeight = parseInt($(existingElem).outerHeight(true));
            var existingElemFarY = existingElemPosTop + existingElemHeight;
            var existingElemFarX = existingElemPosLeft + existingElemWidth;

            if (existingElemFarY < randomElemTop ||
                existingElemPosTop > randomElemFarY ||
                existingElemFarX < randomElemLeft ||
                existingElemPosLeft > randomElemFarX) {
                col = false;
            } else {
                col = true;
                return false;
            }
        });

        if (col) {
            console.log("collision detected!");
            checkCollision(hashtagDiv);
        } else {
            console.log("good, div created");
            hashtagDiv.createDiv();
        }
    }

    function HashTagDiv(textValue) {
        this.posx;
        this.posy;
        this.textValue = textValue;
        this.div = $("<div/>");
        this.div.css({
            "position" : "absolute",
            "display" : "none"
        })
        this.div.addClass("hashtag");
        this.divp = $('</p>').text(textValue);
        this.divp.appendTo(this.div);
        this.div.appendTo(upElement);
    }

    HashTagDiv.prototype.createDiv = function() {
        this.div.css({
            "left" : this.posx+"px",
            "top" : this.posy+"px",
            "display" : "block"
        });
    }

    HashTagDiv.prototype.getDivSize = function() {
        var hashTagDivWidth = $(this.div).outerWidth(true);
        var hashTagDivHeight = $(this.div).outerHeight(true);
        return [hashTagDivWidth, hashTagDivHeight]
    }

    function createDiv2(posx, posy) {
        //var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
        $newdiv = $('<div/>');
        $newdiv.css({
            'position':'absolute',
            'left': posx+'px',
            'top': posy+'px',
            'z-index' : 2
        }).addClass("hashtag");
            $newp = $('</p>').text(this.textValue);
            $newp.css({
                'margin' : '0',
                'padding' : '0'
            });
            $newp.appendTo($newdiv);
            $newdiv.appendTo(upElement);
    }

    (function makeDiv() {
        var hashtagy = [ "#linux", "#zsh", "#java", "#python", "#ansible", "#raspberrypi", "#ansible", "#devops", "#android", "#space", "#google", "#github", "#archlinux", "#iot", "#agile", "#bash", "#travelling", "#ostrava", "#CZ", "#books", "#git", "#arduino", "#reading", "#movies", "#i3wm", "#tmux" ];

        $.each(hashtagy, function( index, value ) {
            var newHashtagDiv = new HashTagDiv(value);
            checkCollision(newHashtagDiv);
        });
    })();
});
