function Game(container, ms)
{
    this.container  = $(container).get(0),
    this.ms         = ms,
    this.width      = this.container.width,
    this.height     = this.container.height,
    this.ctx        = this.container.getContext("2d"),
    this.play       = true,

    this.rightDown  = false,
    this.leftDown   = false,
    this.topDown    = false,
    this.bottomDown = false,
    this.spaceDown  = false,

    // FUNCTION MAIN :
    this.init = function()
    {
        this.initKeys();
        setInterval(this.mainLoop, this.ms);
    },

    // CONTROL AU CLAVIER
    this.initKeys = function()
    {
        $(document).keydown(function(e) {
            if (game.play === true)
            {
                if (e.keyCode === 39)
                    game.rightDown = true;
                else if (e.keyCode === 37)
                    game.leftDown = true;
                else if (e.keyCode === 38)
                    game.topDown = true;
                else if (e.keyCode === 40)
                    game.bottomDown = true;
            }
        });

        $(document).keyup(function(e) {
            if (game.play === true)
            {
                if (e.keyCode === 39)
                    game.rightDown = false;
                else if (e.keyCode === 37)
                    game.leftDown = false;
                else if (e.keyCode === 38)
                    game.topDown = false;
                else if (e.keyCode === 40)
                    game.bottomDown = false;
            }
        });
    },

    this.mainLoop = function()
    {
        if (game.play === true)
        {
            game.ctx.clearRect(0, 0, game.width, game.height);

            firstLevel.generate();

            player.create("./assets/images/pacman.png");
            player.move();

            redGhost.create("./assets/images/redghost.png");
            redGhost.move(2);

            blueGhost.create("./assets/images/blueghost.png");
            blueGhost.move(3);

            yellowGhost.create("./assets/images/yellowghost.png");
            yellowGhost.move(2);

            pinkGhost.create("./assets/images/pinkghost.png");
            pinkGhost.move(3);

            $("#score").html(player.score);

            if (player.score >= 1910)
            {
                alert("TU AS GAGNE !");
                game.play = false;
            }
        }
        game.keyManager();
    },

    // CONTROL AU CLAVIER
    this.keyManager = function()
    {
        if (game.rightDown)
            player.direction = 0;
        if (game.leftDown)
            player.direction = 1;
        if (game.topDown)
            player.direction = 2;
        if (game.bottomDown)
            player.direction = 3;
    };
}



var game        = new Game("canvas", 24);
var player      = new Player(19, 19, 1, 1, "#3498DB");

var redGhost    = new Ghost(19, 19, 9, 10, "#FF0000");
var blueGhost   = new Ghost(19, 19, 9, 10, "#0000FF");
var yellowGhost = new Ghost(19, 19, 9, 10, "#FFFF00");
var pinkGhost   = new Ghost(19, 19, 9, 10, "#FF00FF");

var food        = new Food(2);
var firstLevel  = new Map(firstMap, 19);

game.init();



console.log(food);
console.log('%c    message   ', 'font-size: 2em; background-color: blue; color: yellow;');



