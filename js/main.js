$(document).ready(function(){
    function buildBoard() {

    };

    function setUpBoard() {

    };

    function movePieceTo($piece,newTop,newLeft) {
      $piece.css('top',newTop);
      $piece.css('left',newLeft);
    };

    function addPieces() {

    };

    function setUpPieces() {
      $('div.piece:even').addClass('light');
      $('div.piece:odd').addClass('dark');
    };

    $('div.piece.light').each(function(index,piece) {

        var y = Math.floor(index / 4);
        var x = (index % 4) * 2 + (1 - y%2);

        var pixelPosition = getPixels(x,y);

        movePieceTo($(piece),pixelPosition.top,pixelPosition.left);
    });

    $('div.piece.dark').each(function(index,piece) {

        var y = Math.floor(index/4) + 5;
        var x = (index % 4) * 2 + (1-y%2);

        var pixelPosition = getPixels(x,y);

        movePieceTo($(piece),pixelPosition.top,pixelPosition.left);
    });


    $('div.piece').click(function() {

        var $this = $(this);

        toggleSelect($this);

        resetMovables();

        if ($this.hasClass('selected')) {
            getMovableSquares($this).addClass('movable');
        }

    });

    $('div.square').click(function() {

        var $this = $(this);

        if ($this.hasClass('movable')) {

            var $selectedPiece = $('div.piece.selected');

            if ($selectedPiece.length == 1) {

                var index = $this.prevAll().length;
                var x = index % 8;
                var y = Math.floor(index / 8);
                var pixels = getPixels(x,y);

                movePieceTo($selectedPiece,pixels.top,pixels.left);

                checkKing($selectedPiece,$this.prevAll().length);

                handleCapturedPieces($this);

                incrementMoveCount();

                $selectedPiece.removeClass('selected');

                resetMovables();
            }

        }
    });


});
