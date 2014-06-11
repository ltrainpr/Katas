(function(){
  function Rover (position){
    this.attributes.position = position;
  }

  var globalScope = this;
  globalScope.Rover = Rover;


  function rotateFacing (facing, rotationDirection) {
    return rotations[facing][rotationDirection];
  }

  function rotate (position, rotationDirection) {
    return { x: position.x,
             y: position.y,
             facing: rotateFacing(position.facing, rotationDirection) };
  }

  var move = function (pos, axis,  qty) {
    var newPos = { x: pos.x, y: pos.y, facing: pos.facing };
    newPos[axis] = pos[axis] + qty;
    return newPos;
  };

  Rover.prototype.attributes = {};

  var commandFunctions = {
    B: function moveBackward (position) {
        var args = backwardMovements[position.facing];
        return move(position, args.axis, args.qty);
    },
    F: function moveForward (position) {
        var args = forwardMovements[position.facing];
        return move(position, args.axis, args.qty);
    },
    L: function rotateLeft (position) {
        return rotate(position, "left");
    },
    R: function rotateRight (position) {
        return rotate(position, "right");
    }
  };

  var forwardMovements = {
      east: { axis: "x", qty: 1},
      west: { axis: "x", qty: -1},
      north:{ axis: "y", qty: 1},
      south:{ axis: "y", qty: -1}
  };

  var backwardMovements = {
      east: { axis: "x", qty: -1},
      west: { axis: "x", qty: 1},
      north:{ axis: "y", qty: -1},
      south:{ axis: "y", qty: 1}
  };

  var rotations = {
    north: { left: 'west', right: 'east' },
    west: { left: 'south', right: 'north' },
    south: { left: 'east', right: 'west' },
    east: { left: 'north', right: 'south'}
  };

  Rover.prototype.sendCommands = function (commands){
    var self = this;
    commands.map(function(command){
      self.attributes.position = commandFunctions[command](self.attributes.position);
    });
  };


  Rover.prototype.location = function () {
    return { x: this.attributes.position.x,
             y: this.attributes.position.y };
  };

  Rover.prototype.facing = function() {
    return this.attributes.position.facing;
  };
}).call(this);




// 1. arguments = local scope
// 2. this = object scope
// 3. clojure scope function offsetter(qty) { var offset = qty; return function(v) { return v + offset; }}
// var off4 = offsetter(4); off4(5) // 9