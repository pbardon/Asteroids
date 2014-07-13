Function.prototype.inherits = function(object) {
  function Surrogate() {};
  Surrogate.prototype = object.prototype;
  this.prototype = new Surrogate();
};

(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, rad, game) {
    this.game = game;
    Asteroids.MovingObject.call(this, pos, vel, rad, Asteroid.COLOR)
  };

  Asteroid.COLOR = "red";
  Asteroid.RADIUS =  75;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var rPos = [(dimX * Math.random()), (dimY * Math.random())];
    var rVel = [((Math.random() * 2) - 1), ((Math.random() * 2) - 1)];
    return new Asteroid(rPos, rVel, Asteroid.RADIUS);
  };

})(this);
