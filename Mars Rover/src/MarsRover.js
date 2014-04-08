var X_COORDINATE=0, Y_COORDINATE=1, CARDINAL_DIRECTION=2;
var startOfColumnOrRow = 0;

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
    // console.log(eastBackward(parametersObject));
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


var detectObstacle = function (nextCoordinate, obstacle){
  return (yAxisObstacleDetection(nextCoordinate, obstacle) || xAxisObstacleDetection(nextCoordinate, obstacle));
};

var yAxisObstacleDetection = function(nextCoordinate, obstacle){
  return ((nextCoordinate[X_COORDINATE] === obstacle[X_COORDINATE]) && (nextCoordinate[Y_COORDINATE] + 1 === obstacle[Y_COORDINATE]));
};

var xAxisObstacleDetection = function(nextCoordinate, obstacle){
  return ((nextCoordinate[X_COORDINATE] + 1 === obstacle[X_COORDINATE]) && (nextCoordinate[Y_COORDINATE] === obstacle[Y_COORDINATE]));
};

var marsRover = {
  move: function (coordinates, command, grid, obstacle) {
    var newCoordinates;
    var coordinatesCopy = coordinates;
    var parameters = {
      x: coordinatesCopy[X_COORDINATE],
      y: coordinatesCopy[Y_COORDINATE],
      cardinalDirection: coordinatesCopy[CARDINAL_DIRECTION],
      commands: command,
      gridDimensions: grid,
      obstacles: obstacle
    };

    console.log('Starting Coordinates (' + coordinates[X_COORDINATE] + ',' + coordinates[Y_COORDINATE] + ',' +
     coordinates[CARDINAL_DIRECTION] + ') command(s) ' + command);
    for(var i=0; i < command.length; i++){
      var translationFn = translations[parameters.commands[i]];
      if (translationFn){
        nextCoordinates = translationFn(parameters);
        if (detectObstacle(nextCoordinates, obstacle)) {
          console.log('Encountered an obstacle.  Stopping at  ' + nextCoordinates);
          return nextCoordinates;
        }
        parameters.x = nextCoordinates[X_COORDINATE];
        parameters.y = nextCoordinates[Y_COORDINATE];
        parameters.cardinalDirection = nextCoordinates[CARDINAL_DIRECTION];
      }else{
        alert('Unrecognized command ' + command[i]);
      }
    }
    console.log('Stopped at (' + parameters.x, parameters.y, parameters.cardinalDirection + ')');
    return nextCoordinates;
  },
};

var northForward = function(parametersObject) {
  var newCoordinates, y;
  y = parametersObject.y;
  if(upcomingForwardCoordinate(y) === parametersObject.gridDimensions[Y_COORDINATE]){
    y = startOfColumnOrRow;
  }else{
    y += 1;
  }
  newCoordinates = [parametersObject.x, y, parametersObject.cardinalDirection];
  return newCoordinates;
};

var northBackward = function (parametersObject) {
  var newCoordinates, y;
  y = parametersObject.y;
  if(upcomingBackwardCoordinate(y) === 0){
    y = parametersObject.gridDimensions[Y_COORDINATE] - 1;
  }else{
    y -= 1;
  }
  newCoordinates = [parametersObject.x, y, parametersObject.cardinalDirection];
  return newCoordinates;
};

var eastForward = function (parametersObject) {
  var newCoordinates, x;
  x = parametersObject.x;
  if(upcomingForwardCoordinate(x) === parametersObject.gridDimensions[X_COORDINATE]){
    x = startOfColumnOrRow;
  }else{
    x += 1;
  }
  newCoordinates = [x, parametersObject.y, parametersObject.cardinalDirection];
  return newCoordinates;
};

var eastBackward = function(parametersObject) {
  var newCoordinates, x;
  x = parametersObject.x;
  if(upcomingBackwardCoordinate(x) === 0){
    x = parametersObject.gridDimensions[X_COORDINATE] - 1;
  }else{
    x -= 1;
  }
  newCoordinates = [x, parametersObject.y, parametersObject.cardinalDirection];
  return newCoordinates;
};

var upcomingForwardCoordinate = function(axis){
  return axis + 1;
};

var upcomingBackwardCoordinate = function(axis){
  return axis - 1;
};




