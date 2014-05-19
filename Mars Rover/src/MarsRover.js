var X_COORDINATE=0, Y_COORDINATE=1, CARDINAL_DIRECTION=2;
var startOfColumnOrRow = 0;

var deepCompareArray = function(a, b) {
  if(!a || !b || a.length != b.length){
    return false;
  }

  for(var i = 0, l=a.length; i < l; i++) {
    if(a[i] instanceof Array && b[i] instanceof Array){
      if(!deepCompareArray(a[i], b[i])){
        return false;
      }
    } else if (a[i] != b[i]){
      return false;
    }
  }
  return true;
};

var rightFrom = function (currentDirection) {
  switch(currentDirection.toUpperCase()){
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    case 'W':
      return 'N';
    default:
      alert('Right: default');
  }
};

var leftFrom = function (currentDirection) {
  switch(currentDirection.toUpperCase()){
    case 'N':
      return 'W';
    case 'E':
      return 'N';
    case 'S':
      return 'E';
    case 'W':
      return 'S';
    default:
      alert('Left: default');
  }
};

var translations = {
  "l": function(coordinates){
    var left = leftFrom(coordinates[CARDINAL_DIRECTION]);
    console.log('Turning left to (' + coordinates[X_COORDINATE], coordinates[Y_COORDINATE], left + ')');
    return [coordinates[X_COORDINATE], coordinates[Y_COORDINATE], left];
  },

  "r": function(coordinates){
    var right = rightFrom(coordinates[CARDINAL_DIRECTION]);
    console.log('Turning right to (' + coordinates[X_COORDINATE], coordinates[Y_COORDINATE], right + ')');
    return [coordinates[X_COORDINATE], coordinates[Y_COORDINATE], right];
  },

  "f": function(coordinates, gridDimensions){
    var newCoordinates = forward[coordinates[CARDINAL_DIRECTION]](coordinates, gridDimensions);
    console.log('Moving forward to (' + newCoordinates[X_COORDINATE], newCoordinates[Y_COORDINATE], newCoordinates[CARDINAL_DIRECTION] + ')');
    return newCoordinates;
  },

  "b": function (coordinates, gridDimensions) {
    var newCoordinates = backward[coordinates[CARDINAL_DIRECTION]](coordinates, gridDimensions);
    console.log('Moving backward to (' + newCoordinates[X_COORDINATE], newCoordinates[Y_COORDINATE], newCoordinates[CARDINAL_DIRECTION] + ')');
    return newCoordinates;
  }
};

var forward = {
  N: function (coordinates, gridDimensions) {
    return northForward(coordinates, gridDimensions);
  },

  E: function (coordinates, gridDimensions) {
    return eastForward(coordinates, gridDimensions);
  },

  S: function (coordinates, gridDimensions) {
    return northBackward(coordinates, gridDimensions);
  },

  W: function (coordinates, gridDimensions) {
    return eastBackward(coordinates, gridDimensions);
  }
};

var backward = {
  N: function (coordinates, gridDimensions) {
    return northBackward(coordinates, gridDimensions);
  },

  E: function (coordinates, gridDimensions) {
    return eastBackward(coordinates, gridDimensions);
  },

  S: function (coordinates, gridDimensions) {
    return northForward(coordinates, gridDimensions);
  },

  W: function (coordinates, gridDimensions) {
    return eastForward(coordinates, gridDimensions);
  }
};

var marsRover = {
  move: function (coordinates, command, grid, obstacle) {
    var newCoordinates, nextCoordinates;
    var coordinatesCopy = coordinates.slice();
    var commands = command;
    var gridDimensions = grid;
    var obstacles = obstacle;

    console.log('Starting Coordinates (' + coordinates[X_COORDINATE] + ',' + coordinates[Y_COORDINATE] + ',' +
     coordinates[CARDINAL_DIRECTION] + ') command(s) ' + command);
    for(var i=0; i < command.length; i++){
      var translationFn = translations[commands[i]];
      newCoordinates = newCoordinates || coordinatesCopy;
      if (!translationFn){
        alert('Unrecognized command ' + command);
        return translationFn;
      }

      nextCoordinates = translationFn(newCoordinates, gridDimensions);

      if(detectObstacle(nextCoordinates, obstacles)){
        console.log('Encountered obstacle at ' + newCoordinates);
        break;
      }

      newCoordinates = edgeOfWorld(nextCoordinates, newCoordinates, gridDimensions);

      newCoordinates = translationFn(newCoordinates, gridDimensions);
    }
    console.log('Stopped at (' + newCoordinates[0], newCoordinates[1], newCoordinates[2] + ')');
    return newCoordinates;
  },
};

var edgeOfWorld = function(nextCoordinates, newCoordinates, gridDimensions){
  var coordinates = newCoordinates.slice();
  if(nextCoordinates[X_COORDINATE] === gridDimensions[X_COORDINATE]){
    coordinates[X_COORDINATE] = - 1;
  } else if (nextCoordinates[Y_COORDINATE] === gridDimensions[Y_COORDINATE]){
    coordinates[Y_COORDINATE] = - 1;
  } else if (nextCoordinates[X_COORDINATE] < 0){
    coordinates[X_COORDINATE] = gridDimensions[X_COORDINATE];
  } else if (nextCoordinates[Y_COORDINATE] < 0){
    coordinates[Y_COORDINATE] = gridDimensions[Y_COORDINATE];
  }
  return coordinates;
};

var detectObstacle = function(newCoordinates, obstacle){
  return ((newCoordinates[X_COORDINATE] === obstacle[X_COORDINATE]) && (newCoordinates[Y_COORDINATE] === obstacle[Y_COORDINATE]));
};


var northForward = function(coordinates, gridDimensions) {
  var newY = coordinates[Y_COORDINATE];
  var newCoordinate = [coordinates[X_COORDINATE], plusOne(newY), coordinates[CARDINAL_DIRECTION]];
  return newCoordinate;
};


var northBackward = function (coordinates, gridDimensions) {
  var newY = coordinates[Y_COORDINATE];
  var newCoordinate = [coordinates[X_COORDINATE], minusOne(newY), coordinates[CARDINAL_DIRECTION]];
  return newCoordinate;
};

var eastForward = function (coordinates, gridDimensions) {
  var x = coordinates[X_COORDINATE];
  var newCoordinate = [plusOne(x), coordinates[Y_COORDINATE], coordinates[CARDINAL_DIRECTION]];
  return newCoordinate;
};

var eastBackward = function(coordinates, gridDimensions) {
  var x = coordinates[X_COORDINATE];
  var newCoordinate = [minusOne(x), coordinates[Y_COORDINATE], coordinates[CARDINAL_DIRECTION]];
  return newCoordinate;
};

var plusOne = function(num){
  num += 1;
  return num;
};

var minusOne = function(num){
  num -= 1;
  return num;
};




