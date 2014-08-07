Function.prototype.inherits = function(object) {
  function Surrogate() {};
  Surrogate.prototype = object.prototype;
  this.prototype = new Surrogate();
};

(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, rad, game) {
    this.game = game;
    this.rad = Math.floor(rad);
    var randomizer = Math.random();
    var randDir = 1;
    if (randomizer > .50) {
      randDir = -1
    }
    this.theta = (randDir*(Math.PI/2)  * Math.random() *10);
    Asteroids.MovingObject.call(this, pos, vel, rad, Asteroid.COLOR)
    if(rad > 70) {
      this.img = new Image();
      this.img.src = 'asteroid1.png';
    }else if (this.rad > 40){
      this.img = new Image();
      this.img.src = 'asteroid2.png';
    }else if (this.rad > 30){
      this.img = new Image();
      this.img.src = 'asteroid3.png';
    }else if (this.rad > 20){
      this.img = new Image();
      this.img.src = 'asteroid4.png';
    }
  };

  Asteroid.COLOR = "red";
  Asteroid.RADIUS =  75;
  Asteroid.GROUPER = true;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.draw = function(canvas) {
    this.posX = this.posX;
    this.posY = this.posY;
    canvas.save();
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    canvas.translate((this.posX), (this.posY));
    var thetaScalingFactor = 0.01;
    if (this.rad < 70) {
      thethaScalingFactor = 0.5;
    }
    if (this.theta > 0){
      this.theta += thetaScalingFactor;
    }else {
      this.theta -= thetaScalingFactor;
    }
    canvas.rotate(this.theta);

    canvas.drawImage(this.img, (-this.img.width/2)  , (-this.img.height/2));

    canvas.restore();
  };

  Asteroid.randomAsteroid = function(dimX, dimY) {
    if (Asteroid.GROUPER){
      var rPos = [(dimX/8 * Math.random()), (dimY/8 * Math.random())];
    } else {
      var rPos = [((dimX/8 * Math.random())+ (3*(dimX/4))), ((dimY/8 * Math.random())+ (3*(dimX/4)))];
    }
    Asteroid.GROUPER = false
    var rPos = [(dimX/2 * Math.random()), (dimY/2 * Math.random())];
    var rVel = [((Math.random() * 2) - 1), ((Math.random() * 2) - 1)];

    return new Asteroid(rPos, rVel, Asteroid.RADIUS);
  };

})(this);
