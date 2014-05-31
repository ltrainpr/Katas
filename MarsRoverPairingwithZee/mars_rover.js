(function(){
  function Rover (position){
    this.attributes.position = position;
  }

  var globalScope = this;
  globalScope.Rover = Rover;

  var rotations = {
    north: { left: 'west', right: 'east' },
    west: { left: 'south', right: 'north' },
    south: { left: 'east', right: 'west' },
    east: { left: 'north', right: 'south'}
  };

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
      return { x: position.x, y: position.y - 1, facing: position.facing };
    },
    F: function moveForward (position) {
       var args = movements[position.facing];
       return move(position, args.axis, args.qty);
    },
    L: function rotateLeft (position) {
      return rotate(position, "left");
    },
    R: function rotateRight (position) {
      return rotate(position, "right");
    }
  };

  var movements = {
      east: { axis: "x", qty: 1},
      west: { axis: "x", qty: -1},
      north:{ axis: "y", qty: 1},
      south:{ axis: "y", qty: -1}
  };


  Rover.prototype.sendCommands = function (commands){
    this.attributes.position = commandFunctions[commands](this.attributes.position);
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