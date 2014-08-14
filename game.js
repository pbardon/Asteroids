(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.canvas = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([(Game.DIM_X)/2, (Game.DIM_Y)/2], [0, 0], this);
    this.addAsteroids(5);
    this.bullets = [];
    this.img = new Image();
    this.img.src = 'sky2.png';
    this.points = 0;

  };

  Game.DIM_X = 1100;
  Game.DIM_Y = 700;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids) {
    var game = this;
    var asteroids = [];
    while(asteroids.length < numAsteroids) {
      var asteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y)
      if (Math.abs(this.ship.posX - asteroid.posX) > 200 && Math.abs(this.ship.posY - asteroid.posY) > 200){
        asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
      }
    }
    asteroids.forEach(function(ast){
      game.asteroids.push(ast);
    });
  };


  Game.prototype.isOutOfBounds = function(obj) {
    if (obj.posX - obj.rad > Game.DIM_X  || obj.posX + obj.rad < 0) {
      return true;
    } else if (obj.posY - obj.rad > Game.DIM_Y || obj.posY + obj.rad < 0) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.draw = function() {
    var game = this;
    document.getElementById('points').innerHTML = this.points;
    game.canvas.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    game.canvas.drawImage(this.img, 0, 0);

    game.ship.draw(game.canvas);
    game.asteroids.forEach(function(ast) {
      ast.draw(game.canvas);
    });
    game.bullets.forEach(function(b) {
      b.draw(game.canvas);
    });
    this.ship.thrusting = false;
  };

  var stopAnim = function() {
    clearInterval(renderInter);
  };


  Game.prototype.renderGameWin = function() {
    var game = this;
    var i = 0;
    game.canvas.fillStyle = "#42FF00";
    renderInter = setInterval(function() {
      game.canvas.font= (i+20) + "px Verdana";
      game.canvas.clearRect(0,0, Game.DIM_X, Game.DIM_Y)
      game.canvas.fillText("You Win!", Game.DIM_X/2 - 275, Game.DIM_Y/2 - 50);
      i++;
      if (i  > 150) {
        stopAnim();
      }


    }, Game.FPS);
  };

  Game.prototype.renderGameLose = function() {
    var game = this;

    game.canvas.fillStyle = "#42FF00";

    var i = 0;
    renderInter = setInterval(function() {
      game.canvas.font= ((i*2)+20) + "px Verdana";
      game.canvas.clearRect(0,0, Game.DIM_X, Game.DIM_Y)
      game.canvas.fillText("GAME OVER!",Game.DIM_X/2 - 550, Game.DIM_Y/2 - 50);
      i++;
      if ((i*2)  > 150) {
        stopAnim();
      }

    }, Game.FPS);

  };

  Game.prototype.move = function() {
    this.ship.move();

    this.bullets.forEach(function(b) {
      b.step();
    });

    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });

  };

  Game.prototype.step = function() {
    var game = this;
    game.bindKeyHandlers();
    game.move();
    game.bullets.forEach(function(b) {
      if (game.isOutOfBounds(b)) {
        game.removeBullet(b);
      }
    });
    game.draw();
    game.checkShipCollisions();
    if (game.checkWin()) {
      game.renderGameWin();
      game.stop();
    }
    game.checkAsteroids();
  };

  Game.prototype.checkShipCollisions = function() {
    var game = this;
    game.asteroids.forEach(function(ast) {
      if (game.ship.isCollidedWith(ast)) {
        game.renderGameLose();
        game.stop();
      }
    });
  };

  Game.prototype.checkWin = function() {
    if (this.asteroids.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.checkAsteroids = function() {
    if (this.asteroids.length < 5) {
      this.addAsteroids(2);
    }
  };

  Game.prototype.fireBullet = function () {
    this.bullets.push(this.ship.fireBullet());
  };

  Game.prototype.removeAsteroid = function(asteroid) {
    for (var i = 0; i < this.asteroids.length; i++){
      if (this.asteroids[i] === asteroid) {
        this.points += 1;
        var iPosX = this.asteroids[i].pos[0] + Math.random() * 15;
        var iPosY = this.asteroids[i].pos[1] + Math.random() * 15;
        var iPos = [iPosX, iPosY];

        var newRad = this.asteroids[i].rad / 1.5;
        var iVel = [Math.random() * 3, Math.random() * 5];
        this.asteroids.splice(i, 1);
        for(var j = 0; j < 3; j++) {
          if (newRad > 20) {
            this.asteroids.push(new Asteroids.Asteroid(iPos, iVel, newRad, this));
          }
        }
      }
    }
  };

  Game.prototype.removeBullet = function(bullet) {
    for (var i = 0; i < this.bullets.length; i++){
      if (this.bullets[i] === bullet) {
        this.bullets.splice(i, 1);
      }
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    if (key.isPressed('w')) {
      game.ship.power([0, -1]);
    }else if (key.isPressed('s')) {
      game.ship.retroRockets();
    }

    if (key.isPressed('a')) {
      game.ship.turn("left");
    }else if (key.isPressed('d')) {
      game.ship.turn("right");
    }

    if (key.isPressed('space')) {
      game.fireBullet();

    }
    return false;
  };


  window.onkeydown = function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
    }
  };

  window.onload = function() {
   document.getElementById("restart").addEventListener('click', function() {
      window.location.reload();
   }, false);
  };



  var interID;

  Game.prototype.start = function() {
    var game = this;
    game.draw();
    interID = setInterval(function() {game.step();}, Game.FPS);
  };

  Game.prototype.stop = function() {
    clearInterval(interID);
  };

})(this);
