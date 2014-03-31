var X_COORDINATE=0, Y_COORDINATE=1, CARDINAL_DIRECTION=2;

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
    var x, y, newDirection;
    function xyCoordinates (coordinates) {
      x = coordinates[X_COORDINATE];
      y = coordinates[Y_COORDINATE];
    }

    function detectObstacle(coordinates){
      return ((coordinates[X_COORDINATE] === obstacle[X_COORDINATE]) && (coordinates[Y_COORDINATE] + 1 === obstacle[Y_COORDINATE]));
    }

    console.log('Starting Coordinates (' + coordinates[X_COORDINATE]+','+ coordinates[Y_COORDINATE]+') command(s) ' + command);
    for(var i=0; i < command.length; i++){
      var translationFn = translations[command[i]];
      if (translationFn){
        var nextCoordinates = translationFn(coordinates);
        if (!detectObstacle(nextCoordinates)) {
          coordinates = nextCoordinates;
        }
        xyCoordinates(coordinates);
        console.log('Turning to (' + x,y,coordinates[CARDINAL_DIRECTION].toUpperCase() + ')');
      }else if ((command[i] == 'f') || (command[i] == 'b')){
        if (detectObstacle(coordinates)){
          console.log('You\'ve detected an obstacle on (' + obstacle + ')');
          break;
        }
        if(direction[coordinates[CARDINAL_DIRECTION]]){
          direction[coordinates[CARDINAL_DIRECTION]](coordinates, command[i], grid, obstacle);
          xyCoordinates(coordinates);
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


  wrapToZero: function (coordinates, index) {
    coordinates[index] = 0;
  },

  minus: function(coordinates, index){
    coordinates[index] -= 1;
  },

  plus: function(coordinates, index){
    coordinates[index] += 1;
  }
};

var direction = {
  N: function (coordinates, singleCommand, grid) {
    if (singleCommand == 'f'){
      northForward(coordinates, grid);
    }else if(singleCommand == 'b'){
      northBackward(coordinates, grid);
    }else{
      alert('North: Not supposed to get here');
    }
    return coordinates;
  },

  E: function (coordinates, singleCommand, grid) {
    if (singleCommand == 'f'){
      eastForward(coordinates, grid);
    }else if(singleCommand == 'b'){
      eastBackward(coordinates, grid);
    }else{
      alert('East: Not supposed to get here');
    }
    return coordinates;
  },

  S: function (coordinates, singleCommand, grid) {
    if (singleCommand == 'f'){
      northBackward(coordinates, grid);
    }else if(singleCommand == 'b'){
      northForward(coordinates, grid);
    }else{
      alert('South: Not supposed to get here');
    }
    return coordinates;
  },

  W: function (coordinates, singleCommand, grid) {
    if (singleCommand == 'f'){
      eastBackward(coordinates, grid);
    }else if(singleCommand == 'b'){
      eastForward(coordinates, grid);
    }else{
      alert('West: Not supposed to get here');
    }
    return coordinates;
  }
};

var northForward = function(coordinates, grid) {
  if((coordinates[Y_COORDINATE] + 1) === grid[Y_COORDINATE]){
    marsRover.wrapToZero(coordinates,1);
  }else{
    marsRover.plus(coordinates, 1);
  }
};

var northBackward = function (coordinates, grid) {
  if((coordinates[Y_COORDINATE] - 1) === 0){
    coordinates[Y_COORDINATE] = grid[Y_COORDINATE] - 1;
  }else{
    marsRover.minus(coordinates, 1);
  }
};

var eastForward = function (coordinates, grid) {
  if((coordinates[X_COORDINATE] + 1) === grid[X_COORDINATE]){
    marsRover.wrapToZero(coordinates, 0);
  }else{
    marsRover.plus(coordinates, 0);
  }
};

var eastBackward = function(coordinates, grid) {
  if(coordinates[X_COORDINATE] === 0){
    coordinates[X_COORDINATE] = grid[X_COORDINATE] - 1;
  }else{
    marsRover.minus(coordinates, 0);
  }
};





