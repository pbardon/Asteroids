Function.prototype.inherits = function(object) {
  function Surrogate() {};
  Surrogate.prototype = object.prototype;
  this.prototype = new Surrogate();
};

(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    this.game = game;
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  };

  Bullet.RADIUS = 3;
  Bullet.COLOR = "green";

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;
    bullet.game.asteroids.forEach( function (ast) {
      if(bullet.isCollidedWith(ast)) {
        bullet.game.removeBullet(bullet);
        bullet.game.removeAsteroid(ast);
      }
    });
  };

  Bullet.prototype.move = function() {
    var xVel = this.vel[0];
    var yVel = this.vel[1];
    this.posX = (this.posX + xVel)
    this.posY = (this.posY + yVel)
    this.pos = [this.posX, this.posY];
  };

  // Bullet.prototype.removeBullet = function(bullet) {
  //   var bullets = this.game.bullets;
  //   for (var i = 0; i < bullets.length; i++){
  //     if (bullets[i] === bullet) {
  //       bullets.splice(i, 1);
  //     }
  //   }
  // };


  Bullet.prototype.runStep = function() {
    this.hitAsteroids();
  };


})(this);
