var X_COORDINATE=0, Y_COORDINATE=1, CARDINAL_DIRECTION=2;
var startOfColumnOrRow = 0;

Object.defineProperty(Array.prototype, 'compare', {value: compareFunction});
function compareFunction(array){
  if(!array){
    return false;
  }

  if(this.length != array.length){
    return false;
  }

  for(var i = 0, l=this.length; i < l; i++) {
    if(this[i] instanceof Array && array[i] instanceof Array){
      if(!this[i].compare(array[i])){
        return false;
      }
    } else if (this[i] != array[i]){
      return false;
    }
  }
  return true;
}

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
  "l": function(parametersObject){
    var left = leftFrom(parametersObject.cardinalDirection);
    console.log('Turning left to (' + parametersObject.x, parametersObject.y, left + ')');
    return [parametersObject.x, parametersObject.y, left];
  },

  "r": function(parametersObject){
    var right = rightFrom(parametersObject.cardinalDirection);
    console.log('Turning right to (' + parametersObject.x, parametersObject.y, right + ')');
    return [parametersObject.x, parametersObject.y, right];
  },

  "f": function(parametersObject){
    var newCoordinates = forward[parametersObject.cardinalDirection](parametersObject);
    console.log('Moving forward to (' + newCoordinates[X_COORDINATE], newCoordinates[Y_COORDINATE], newCoordinates[CARDINAL_DIRECTION] + ')');
    return newCoordinates;
  },

  "b": function (parametersObject) {
    var newCoordinates = backward[parametersObject.cardinalDirection](parametersObject);
    console.log('Moving backward to (' + newCoordinates[X_COORDINATE], newCoordinates[Y_COORDINATE], newCoordinates[CARDINAL_DIRECTION] + ')');
    return newCoordinates;
  }
};

var forward = {
  N: function (parametersObject) {
    return northForward(parametersObject);
  },

  E: function (parametersObject) {
    return eastForward(parametersObject);
  },

  S: function (parametersObject) {
    return northBackward(parametersObject);
  },

  W: function (parametersObject) {
    return eastBackward(parametersObject);
  }
};

var backward = {
  N: function (parametersObject) {
    return northBackward(parametersObject);
  },

  E: function (parametersObject) {
    return eastBackward(parametersObject);
  },

  S: function (parametersObject) {
    return northForward(parametersObject);
  },

  W: function (parametersObject) {
    return eastForward(parametersObject);
  }
};

var marsRover = {
  move: function (coordinates, command, grid, obstacle) {
    var newCoordinates, nextCoordinates;
    var coordinatesCopy = coordinates;
    var parameters = {
      x: coordinatesCopy[X_COORDINATE],
      y: coordinatesCopy[Y_COORDINATE],
      cardinalDirection: coordinatesCopy[CARDINAL_DIRECTION],
      commands: command,
      gridDimensions: grid,
      obstacles: obstacle
    };
    var newParameters = (newParameters || parameters);

    console.log('Starting Coordinates (' + coordinates[X_COORDINATE] + ',' + coordinates[Y_COORDINATE] + ',' +
     coordinates[CARDINAL_DIRECTION] + ') command(s) ' + command);
    for(var i=0; i < command.length; i++){
      var translationFn = translations[parameters.commands[i]];
      nextCoordinates = translationValidation(translationFn, parameters.commands, newParameters);
      newParameters = {x: nextCoordinates[0], y: nextCoordinates[1], cardinalDirection: nextCoordinates[2], commands: parameters.commands, gridDimensions: parameters.gridDimensions, obstacles: parameters.obstacles};
    }
    console.log('Stopped at (' + nextCoordinates[0], nextCoordinates[1], nextCoordinates[2] + ')');
    return nextCoordinates;
  },
};

var translationValidation = function(translationFn, command, newParameters){
  if (translationFn){
    return translationFn(newParameters);
  }else{
    alert('Unrecognized command ' + command[i]);
  }
};

var northForward = function(parametersObject) {
  var newCoordinate, y;
  y = parametersObject.y;
  if(upcomingForwardCoordinate(y) === parametersObject.gridDimensions[Y_COORDINATE]){
    y = startOfColumnOrRow;
  }else{
    y += 1;
  }
  newCoordinate = [parametersObject.x, y];
  return detectObstacle(newCoordinate, parametersObject);
};

var northBackward = function (parametersObject) {
  var newCoordinate, y;
  y = parametersObject.y;
  if(upcomingBackwardCoordinate(y) === 0){
    y = parametersObject.gridDimensions[Y_COORDINATE] - 1;
  }else{
    y -= 1;
  }
  newCoordinate = [parametersObject.x, y];
  return detectObstacle(newCoordinate, parametersObject);
};

var eastForward = function (parametersObject) {
  var newCoordinate, x;
  x = parametersObject.x;
  if(upcomingForwardCoordinate(x) === parametersObject.gridDimensions[X_COORDINATE]){
    x = startOfColumnOrRow;
  }else{
    x += 1;
  }
  newCoordinate = [x, parametersObject.y];
  return detectObstacle(newCoordinate, parametersObject);
};

var eastBackward = function(parametersObject) {
  var newCoordinate, x;
  x = parametersObject.x;
  if(upcomingBackwardCoordinate(x) === 0){
    x = parametersObject.gridDimensions[X_COORDINATE] - 1;
  }else{
    x -= 1;
  }
  newCoordinate = [x, parametersObject.y];
  return detectObstacle(newCoordinate, parametersObject);
};

var detectObstacle = function(newCoordinate, parametersObject){
  var currentCoordinate = [parametersObject.x, parametersObject.y];
  if(checkForObstacle(newCoordinate, parametersObject)){
    currentCoordinate.push(parametersObject.cardinalDirection);
    console.log('Encountered obstacle at ' + newCoordinate);
    return currentCoordinate;
  } else {
    newCoordinate.push(parametersObject.cardinalDirection);
    return newCoordinate;
  }
};

var checkForObstacle = function(newCoordinates, parametersObject){
  return newCoordinates.compare(parametersObject.obstacles);
};

var upcomingForwardCoordinate = function(axis){
  return axis + 1;
};

var upcomingBackwardCoordinate = function(axis){
  return axis - 1;
};




