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
    return [parametersObject.x, parametersObject.y, leftFrom(parametersObject.cardinalDirection)];
  },

  "r": function(parametersObject){
    return [parametersObject.x, parametersObject.y, rightFrom(parametersObject.cardinalDirection)];
  }
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


    function detectObstacle(coordinates){
      return ((parameters.x === parameters.obstacles[X_COORDINATE]) && (parameters.y + 1 === parameters.obstacles[Y_COORDINATE]));
    }

    console.log('Starting Coordinates (' + coordinates[X_COORDINATE]+','+ coordinates[Y_COORDINATE]+') command(s) ' + command);
    for(var i=0; i < command.length; i++){
      var translationFn = translations[parameters.commands[i]];
      if (translationFn){
        var nextCoordinates = translationFn(parameters);
        if (!detectObstacle(nextCoordinates)) {
          parameters['cardinalDirection'] = nextCoordinates[CARDINAL_DIRECTION];
        }

        console.log('Turning to (' + parameters.x, parameters.y, parameters.cardinalDirection + ')');
      }else if ((parameters.commands[i] === 'f') || (parameters.commands[i] === 'b')){
        if (detectObstacle(parameters)){
          console.log('You\'ve detected an obstacle on (' + parameters.obstacles + ')');
          break;
        }
        if(direction[parameters.cardinalDirection]){
          newCoordinates = direction[parameters.cardinalDirection](parameters, i);
          parameters.x = newCoordinates[X_COORDINATE];
          parameters.y = newCoordinates[Y_COORDINATE];
          parameters.cardinalDirection = newCoordinates[CARDINAL_DIRECTION];
        }else{
          alert('Move forward/backward: Not supposed to happen');
        }
        console.log('Moving to (' + parameters.x, parameters.y, parameters.cardinalDirection + ')');
      }else{
        alert('Unrecognized command ' + command[i]);
      }
    }
    console.log('Stopped at (' + parameters.x, parameters.y, parameters.cardinalDirection + ')');
    return [parameters.x, parameters.y, parameters.cardinalDirection];
  },
};

var direction = {
  N: function (parametersObject, index) {
    var newCoordinates;
    if (parametersObject.commands[index] === 'f'){
      newCoordinates =  northForward(parametersObject);
    }else if(parametersObject.commands[index] === 'b'){
      newCoordinates = northBackward(parametersObject);
    }else{
      alert('North: Not supposed to get here');
    }
    return newCoordinates;
  },

  E: function (parametersObject, index) {
    var newCoordinates;
    if (parametersObject.commands[index] === 'f'){
      newCoordinates = eastForward(parametersObject);
    }else if(parametersObject.commands[index] === 'b'){
      newCoordinates = eastBackward(parametersObject);
    }else{
      alert('East: Not supposed to get here');
    }
    return newCoordinates;
  },

  S: function (parametersObject, index) {
    var newCoordinates;
    if (parametersObject.commands[index] === 'f'){
      newCoordiantes = northBackward(parametersObject);
    }else if(parametersObject.commands[index] === 'b'){
      newCoordinates = northForward(parametersObject);
    }else{
      alert('South: Not supposed to get here');
    }
    return newCoordinates;
  },

  W: function (parametersObject, index) {
    var newCoordinates;
    if (parametersObject.commands[index] === 'f'){
      newCoordinates = eastBackward(parametersObject);
    }else if(parametersObject.commands[index] === 'b'){
      newCoordinates = eastForward(parametersObject);
    }else{
      alert('West: Not supposed to get here');
    }
    return newCoordinates;
  }
};

var northForward = function(parametersObject) {
  var newCoordinates, y;
  y = parametersObject.y;
  if(upcomingForwardCoordinate(parametersObject.y) === parametersObject.gridDimensions[Y_COORDINATE]){
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
  if(upcomingBackwardCoordinate(parametersObject.y) === 0){
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
  if(upcomingForwardCoordinate(parametersObject.x) === parametersObject.gridDimensions[X_COORDINATE]){
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
  if(upcomingBackwardCoordinate(parametersObject.x) === 0){
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




