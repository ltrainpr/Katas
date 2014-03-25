var marsRover = {
	move: function (startingCoordinates, command, grid) {
		var x, y, newDirection, maxHorizontal, maxVertical;
		function xyCoordinates (startingCoordinates) {
			x = startingCoordinates[0];
			y = startingCoordinates[1];
		}
		for(var i=0; i < command.length; i++){
			if (command[i] == 'l'){
				startingCoordinates[2] = marsRover.left(startingCoordinates[2]);
				xyCoordinates(startingCoordinates);
			}else if (command[i] == 'r'){
				startingCoordinates[2] = marsRover.right(startingCoordinates[2]);
				xyCoordinates(startingCoordinates);
			}else if (command[i] == 'f'){
				switch(startingCoordinates[2].toLowerCase()){
					case 'n':
						marsRover.north(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					case 'e':
						marsRover.east(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					case 's':
						marsRover.south(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					case 'w':
						marsRover.west(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					default:
						alert('Move: Not supposed to happen');
				}
			}else if (command[i] == 'b'){
				switch(startingCoordinates[2].toLowerCase()){
					case 'n':
						marsRover.north(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					case 'e':
						marsRover.east(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					case 's':
						marsRover.south(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					case 'w':
						marsRover.west(startingCoordinates, command[i], grid);
						xyCoordinates(startingCoordinates);
						break;
					default:
						alert('Move: Not supposed to happen');
				}
			}
		}
		console.log(x,y,startingCoordinates[2].toUpperCase());
		return [x,y,startingCoordinates[2].toUpperCase()];
	},

	north: function (startingCoordinates, singleCommand, grid) {
		if (singleCommand == 'f'){
			if((startingCoordinates[1] + 1) === grid[1]){
				marsRover.wrapToZero(startingCoordinates,1);
			}else{
				marsRover.plus(startingCoordinates, 1);
			}
		}else if(singleCommand == 'b'){
			if((startingCoordinates[1] - 1) === 0){
				startingCoordinates[1] = grid[1] - 1;
			}else{
				marsRover.minus(startingCoordinates, 1);
			}
		}else{
			alert('North: Not supposed to get here');
		}
		return startingCoordinates;
	},

	wrapToZero: function (startingCoordinates, index) {
		startingCoordinates[index] = 0;
	},

	minus: function(startingCoordinates, index){
		startingCoordinates[index] -= 1;
	},

	plus: function(startingCoordinates, index){
		startingCoordinates[index] += 1;
	},

	east: function (startingCoordinates, singleCommand, grid) {
		if (singleCommand == 'f'){
			if((startingCoordinates[0] + 1) === grid[0]){
				marsRover.wrapToZero(startingCoordinates, 0);
			}else{
				marsRover.plus(startingCoordinates, 0);
			}
		}else if(singleCommand == 'b'){
			if(startingCoordinates[0] === 0){
				startingCoordinates[0] = grid[0] - 1;
			}else{
				marsRover.minus(startingCoordinates, 0);
			}
		}else{
			alert('East: Not supposed to get here');
		}
		return startingCoordinates;
	},

	south: function (startingCoordinates, singleCommand, grid) {
		if (singleCommand == 'f'){
			if(startingCoordinates[1] === 0){
				startingCoordinates[1] = grid[1] -1;
			}else{
				marsRover.minus(startingCoordinates, 1);
			}
		}else if(singleCommand == 'b'){
			if((startingCoordinates[1] + 1) === grid[1]){
				marsRover.wrapToZero(startingCoordinates,1);
			}else{
				marsRover.plus(startingCoordinates, 1);
			}
		}else{
			alert('South: Not supposed to get here');
		}
		return startingCoordinates;
	},

	west: function (startingCoordinates, singleCommand, grid) {
		if (singleCommand == 'f'){
			if(startingCoordinates[0] === 0){
				startingCoordinates[0] = grid[0] - 1;
			}else{
				marsRover.minus(startingCoordinates, 0);
			}
		}else if(singleCommand == 'b'){
			if((startingCoordinates[0] + 1) === grid[0]){
				marsRover.wrapToZero(startingCoordinates, 0);
			}else{
				marsRover.plus(startingCoordinates, 0);
			}
		}else{
			alert('West: Not supposed to get here');
		}
		return startingCoordinates;
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
				alert('default');
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
				alert('default');
		}
	}
};
