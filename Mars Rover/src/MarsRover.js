var X_COORDINATE=0, Y_COORDINATE=1, CARDINAL_DIRECTION=2;
var x, y, newDirection;
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
  "l": function(coordinates){
    return [coordinates[X_COORDINATE], coordinates[Y_COORDINATE], leftFrom(coordinates[CARDINAL_DIRECTION])];
  },

  "r": function(coordinates){
    return [coordinates[X_COORDINATE], coordinates[Y_COORDINATE], rightFrom(coordinates[CARDINAL_DIRECTION])];
  }
};

var marsRover = {
  move: function (coordinates, command, grid, obstacle) {

      x = coordinates[X_COORDINATE];
      y = coordinates[Y_COORDINATE];


    function detectObstacle(coordinates){
      return ((x === obstacle[X_COORDINATE]) && (y + 1 === obstacle[Y_COORDINATE]));
    }

    console.log('Starting Coordinates (' + coordinates[X_COORDINATE]+','+ coordinates[Y_COORDINATE]+') command(s) ' + command);
    for(var i=0; i < command.length; i++){
      var translationFn = translations[command[i]];
      if (translationFn){
        var nextCoordinates = translationFn(coordinates);
        if (!detectObstacle(nextCoordinates)) {
          coordinates = nextCoordinates;
        }

        console.log('Turning to (' + x,y,coordinates[CARDINAL_DIRECTION].toUpperCase() + ')');
      }else if ((command[i] === 'f') || (command[i] === 'b')){
        if (detectObstacle(coordinates)){
          console.log('You\'ve detected an obstacle on (' + obstacle + ')');
          break;
        }
        if(direction[coordinates[CARDINAL_DIRECTION]]){
          direction[coordinates[CARDINAL_DIRECTION]](coordinates, command[i], grid, obstacle);

        }else{
          alert('Move forward/backward: Not supposed to happen');
        }
        console.log('Moving to (' + x,y,coordinates[CARDINAL_DIRECTION].toUpperCase() + ')');
      }else{
        alert('Unrecognized command ' + command[i]);
      }
    }
    console.log('Stopped at (' + x,y,coordinates[CARDINAL_DIRECTION].toUpperCase() + ')');
    return [x,y,coordinates[CARDINAL_DIRECTION].toUpperCase()];
  },
};

var direction = {
  N: function (coordinates, singleCommand, grid) {
    if (singleCommand === 'f'){
      northForward(coordinates, grid);
    }else if(singleCommand === 'b'){
      northBackward(coordinates, grid);
    }else{
      alert('North: Not supposed to get here');
    }
  },

  E: function (coordinates, singleCommand, grid) {
    if (singleCommand === 'f'){
      eastForward(coordinates, grid);
    }else if(singleCommand === 'b'){
      eastBackward(coordinates, grid);
    }else{
      alert('East: Not supposed to get here');
    }
  },

  S: function (coordinates, singleCommand, grid) {
    if (singleCommand === 'f'){
      northBackward(coordinates, grid);
    }else if(singleCommand === 'b'){
      northForward(coordinates, grid);
    }else{
      alert('South: Not supposed to get here');
    }
  },

  W: function (coordinates, singleCommand, grid) {
    if (singleCommand === 'f'){
      eastBackward(coordinates, grid);
    }else if(singleCommand === 'b'){
      eastForward(coordinates, grid);
    }else{
      alert('West: Not supposed to get here');
    }
  }
};

var northForward = function(coordinates, grid) {
  if(upcomingForwardCoordinate(y) === grid[Y_COORDINATE]){
    y = startOfColumnOrRow;
  }else{
    y += 1;
  }
};

var northBackward = function (coordinates, grid) {
  if(upcomingBackwardCoordinate(y) === 0){
    y = grid[Y_COORDINATE] - 1;
  }else{
    y -= 1;
  }
};

var eastForward = function (coordinates, grid) {
  if(upcomingForwardCoordinate(x) === grid[X_COORDINATE]){
    x = startOfColumnOrRow;
  }else{
    x += 1;
  }
};

var eastBackward = function(coordinates, grid) {
  if(upcomingBackwardCoordinate(x) === 0){
    x = grid[X_COORDINATE] - 1;
  }else{
    x -= 1;
  }
};

var upcomingForwardCoordinate = function(axis){
  return axis + 1;
};

var upcomingBackwardCoordinate = function(axis){
  return axis - 1;
};




