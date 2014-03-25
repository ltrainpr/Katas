var marsRover = {
	move: function (coordinates, command, grid, obstacle) {
		var x, y, newDirection;
		function xyCoordinates (coordinates) {
			x = coordinates[0];
			y = coordinates[1];
		}

		function detectObstacle(){
			return ((coordinates[0] === obstacle[0]) && (coordinates[1] + 1 === obstacle[1]));
		}

		console.log('Starting Coordinates (' + coordinates[0]+','+ coordinates[1]+') command(s) ' + command);
		for(var i=0; i < command.length; i++){
			if (command[i] == 'l'){
				coordinates[2] = marsRover.left(coordinates[2]);
				xyCoordinates(coordinates);
				console.log('Turning to (' + x,y,coordinates[2].toUpperCase() + ')');
			}else if (command[i] == 'r'){
				coordinates[2] = marsRover.right(coordinates[2]);
				xyCoordinates(coordinates);
				console.log('Turning to (' + x,y,coordinates[2].toUpperCase() + ')');
			}else if ((command[i] == 'f') || (command[i] == 'b')){
				if (detectObstacle()){
					console.log('You\'ve detected an obstacle on (' + obstacle + ')');
					break;
				}
				switch(coordinates[2].toLowerCase()){
					case 'n':
						marsRover.north(coordinates, command[i], grid, obstacle);
						xyCoordinates(coordinates);
						break;
					case 'e':
						marsRover.east(coordinates, command[i], grid, obstacle);
						xyCoordinates(coordinates);
						break;
					case 's':
						marsRover.south(coordinates, command[i], grid, obstacle);
						xyCoordinates(coordinates);
						break;
					case 'w':
						marsRover.west(coordinates, command[i], grid, obstacle);
						xyCoordinates(coordinates);
						break;
					default:
						alert('Move: Not supposed to happen');
				}
				console.log('Moving to (' + x,y,coordinates[2].toUpperCase() + ')');
			}else{
				alert('Unrecognized command ' + command[i]);
			}
		}
		console.log('Stopped at (' + x,y,coordinates[2].toUpperCase() + ')');
		return [x,y,coordinates[2].toUpperCase()];
	},

	north: function (coordinates, singleCommand, grid, obstacle) {
		if (singleCommand == 'f'){
			northForward();
		}else if(singleCommand == 'b'){
			northBackward();
		}else{
			alert('North: Not supposed to get here');
		}
		return coordinates;

		function northForward () {
			if((coordinates[1] + 1) === grid[1]){
				marsRover.wrapToZero(coordinates,1);
			}else{
				marsRover.plus(coordinates, 1);
			}
		}

		function northBackward () {
			if((coordinates[1] - 1) === 0){
				coordinates[1] = grid[1] - 1;
			}else{
				marsRover.minus(coordinates, 1);
			}
		}
	},

	east: function (coordinates, singleCommand, grid) {
		if (singleCommand == 'f'){
			eastForward();
		}else if(singleCommand == 'b'){
			eastBackward();
		}else{
			alert('East: Not supposed to get here');
		}
		return coordinates;

		function eastForward() {
			if((coordinates[0] + 1) === grid[0]){
				marsRover.wrapToZero(coordinates, 0);
			}else{
				marsRover.plus(coordinates, 0);
			}
		}

		function eastBackward() {
			if(coordinates[0] === 0){
				coordinates[0] = grid[0] - 1;
			}else{
				marsRover.minus(coordinates, 0);
			}
		}
	},

	south: function (coordinates, singleCommand, grid) {
		if (singleCommand == 'f'){
			southForward();
		}else if(singleCommand == 'b'){
			southBackward();
		}else{
			alert('South: Not supposed to get here');
		}
		return coordinates;

		function southForward() {
			if(coordinates[1] === 0){
				coordinates[1] = grid[1] -1;
			}else{
				marsRover.minus(coordinates, 1);
			}
		}

		function southBackward() {
			if((coordinates[1] + 1) === grid[1]){
				marsRover.wrapToZero(coordinates,1);
			}else{
				marsRover.plus(coordinates, 1);
			}
		}
	},

	west: function (coordinates, singleCommand, grid) {
		if (singleCommand == 'f'){
			westForward();
		}else if(singleCommand == 'b'){
			westBackward();
		}else{
			alert('West: Not supposed to get here');
		}
		return coordinates;

		function westForward () {
			if(coordinates[0] === 0){
				coordinates[0] = grid[0] - 1;
			}else{
				marsRover.minus(coordinates, 0);
			}
		}

		function westBackward () {
			if((coordinates[0] + 1) === grid[0]){
				marsRover.wrapToZero(coordinates, 0);
			}else{
				marsRover.plus(coordinates, 0);
			}
		}
	},

	wrapToZero: function (coordinates, index) {
		coordinates[index] = 0;
	},

	minus: function(coordinates, index){
		coordinates[index] -= 1;
	},

	plus: function(coordinates, index){
		coordinates[index] += 1;
	},

	right: function (currentDirection) {
		switch(currentDirection.toLowerCase()){
			case 'n':
				return 'e';
			case 'e':
				return 's';
			case 's':
				return 'w';
			case 'w':
				return 'n';
			default:
				alert('Right: default');
		}
	},

	left: function (currentDirection) {
		switch(currentDirection.toLowerCase()){
			case 'n':
				return 'w';
			case 'e':
				return 'n';
			case 's':
				return 'e';
			case 'w':
				return 's';
			default:
				alert('Left: default');
		}
	}
};
