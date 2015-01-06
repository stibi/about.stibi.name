$(function() {

    var upElement = $("#up");

    function gimeRandomPosition() {
        var posx = (Math.random() * (upElement.width() - 150)).toFixed();
        var posy = (Math.random() * (upElement.height() - 20)).toFixed();
        // TODO return as object
        return [posx, posy];
    }

    function checkCollision(posx, posy, callback) {
        randomElemLeft = parseInt(posx);
        randomElemTop = parseInt(posy);
        randomElemeWidth = 150;
        randomElemHeigt = 20;
        randomElemFarY = randomElemTop + randomElemHeigt;
        randomElemFarX = randomElemLeft + randomElemeWidth;

        // pokud tam jeste zadny neni, tak ho tam rovnou prdni
        var hashtagsLen = $('div.hashtag').length
        if (hashtagsLen === 0) {
            callback(posx, posy, "weeeee");
            return;
        }

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
            var newPosition = gimeRandomPosition();
            checkCollision(newPosition[0], newPosition[1], callback);
        } else {
            console.log("good, div created");
            callback(posx, posy, "weeeee");
        }
    }

    function createDiv(posx, posy, textValue) {
        var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
        $newdiv = $('<div/>');
        $newdiv.css({
            'position':'absolute',
            'left': posx+'px',
            'top': posy+'px',
            'width': '150px',
            'height': '20px',
            'background-color': color
        }).addClass("hashtag");
            $newp = $('</p>').text(textValue + " x=" + posx + "y=" + posy);
            $newp.css({
                'margin' : '0',
                'padding' : '0'
            });
            $newp.appendTo($newdiv);
            $newdiv.appendTo(upElement);
    }

    (function makeDiv() {
        //var divsize = ((Math.random()*100) + 50).toFixed();

        var hashtagy = [ "prvni", "druhy", "treti", "ctvrty", "paty", "sesty", "sedmy", "osmy", "devaty", "desaty", "jedenacty", "dvanacty", "trinacty", "ctrnacty", "patnacty", "sestnacty", "sedmnacty", "osmncaty", "devatenacty", "dvacaty" ];

        $.each(hashtagy, function( index, value ) {
            var randomPos = gimeRandomPosition();
            checkCollision(randomPos[0], randomPos[1], createDiv);
        });
    })();
});
