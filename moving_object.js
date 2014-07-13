(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, rad, color) {
    this.pos = pos;
    this.posX = pos[0];
    this.posY = pos[1];
    this.vel = vel;
    this.velX = vel[0]
    this.velY = vel[1]
    this.rad = rad;
    this.color = color;
  };

  MovingObject.prototype.step = function () {
    this.move();
    this.runStep();
  }

  MovingObject.prototype.runStep = function () {};

  MovingObject.prototype.move = function() {
    var xVel = this.vel[0];
    var yVel = this.vel[1];
    if (this.posX < 0) {
      this.posX = Asteroids.Game.DIM_X;
    }
    if (this.posY < 0) {
      this.posY = Asteroids.Game.DIM_Y;
    }

    this.posX = (this.posX + xVel) % (Asteroids.Game.DIM_X + 70/2);
    this.posY = (this.posY + yVel) % (Asteroids.Game.DIM_Y + 60/2);
    this.pos = [this.posX, this.posY];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.posX,
      this.posY,
      this.rad,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dist = Math.sqrt(Math.pow((otherObject.posX - this.posX), 2) +
                         Math.pow((otherObject.posY - this.posY), 2));
    if (dist < this.rad + otherObject.rad) {
      return true;
    } else {
      return false;
    }
  };
})(this);
