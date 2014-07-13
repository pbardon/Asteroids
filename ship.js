Function.prototype.inherits = function(object) {
  function Surrogate() {};
  Surrogate.prototype = object.prototype;
  this.prototype = new Surrogate();
};

(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, game) {
    this.game = game;
    Asteroids.MovingObject.call(this, pos , vel, Ship.RADIUS, Ship.COLOR);
    this.img1 = new Image();
    this.img1.src = 'ship.png';
    this.img2 = new Image();
    this.img2.src = 'ship2.png';
    this.theta = Math.PI/180;
  };

  Ship.RADIUS = 23;
  Ship.COLOR = "blue";


  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.draw = function(canvas) {
    this.posX = this.posX;
    this.posY = this.posY;
    canvas.save();
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    canvas.translate((this.posX - this.img1.width/2), (this.posY - this.img1.height/2));
    canvas.rotate(this.theta);
    if (this.thrusting)   {
      canvas.drawImage(this.img2, -this.img1.width/2 , -this.img1.height/2);
    } else {
      canvas.drawImage(this.img1, -this.img1.width/2 , -this.img1.height/2);
    }
    canvas.restore();
  };


  Ship.prototype.power = function(impulse) {
    this.thrusting = true;
    this.velX += (0.2 * -Math.cos(( Math.PI)/2 + this.theta));
    this.velY += (0.2 * -Math.sin((Math.PI)/2 + this.theta));
    this.vel = [this.velX, this.velY];
  };

  Ship.prototype.retroRockets = function() {
    this.velX -= (0.2 * -Math.cos(( Math.PI)/2 + this.theta));
    this.velY -= (0.2 * -Math.sin((Math.PI)/2 + this.theta));
    this.vel = [this.velX, this.velY];
  }

  Ship.prototype.turn = function(dir) {
    this.thrusting = false;
    if (dir === "left") {
      this.theta -= .2;
    } else if (dir === "right") {
      this.theta += .2;
    }
  };

  Ship.prototype.removeShip = function () {

  };


  Ship.prototype.fireBullet = function() {
    var ship = this;
    var bulletTrajec = function() {
      var velX = -Math.cos((Math.PI)/2 + ship.theta);
      var velY = -Math.sin((Math.PI)/2 + ship.theta);
      var speed = Math.sqrt((velX * velX) + (velY * velY));
      return [(velX * 25) / speed, (velY * 25) / speed ];
    };
      var bulX = (ship.pos[0] - ship.img1.width/2);
      var bulY = (ship.pos[1] - ship.img1.height/2);
      return new Asteroids.Bullet([bulX, bulY], bulletTrajec(), ship.game);
  };

  Ship.prototype.isCollidedWith = function(otherObject) {
    var dist = Math.sqrt(Math.pow(otherObject.posX - (this.posX - (this.img1.width/2)), 2) +
                         Math.pow(otherObject.posY - (this.posY - (this.img1.height/2)), 2));
    if (dist < this.rad + otherObject.rad) {
      return true;
    } else {
      return false;
    }
  };

})(this);
