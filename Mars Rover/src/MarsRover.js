var marsRover = {

	move: function (startingCoordinates, command) {
		var x, y, newDirection;
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
						marsRover.north(startingCoordinates, command[i]);
						xyCoordinates(startingCoordinates);
						break;
					case 'e':
						marsRover.east(startingCoordinates, command[i]);
						xyCoordinates(startingCoordinates);
						break;
					case 's':
						marsRover.south(startingCoordinates, command[i]);
						xyCoordinates(startingCoordinates);
						break;
					case 'w':

						marsRover.west(startingCoordinates, command[i]);
						xyCoordinates(startingCoordinates);
						break;
					default:
						alert('Move: Not supposed to happen');
				}
			}
		}
		return [x,y,startingCoordinates[2].toUpperCase()];
	},

	north: function (startingCoordinates, singleCommand) {
		if (singleCommand == 'f'){
			startingCoordinates[1] = startingCoordinates[1] + 1;
			startingCoordinates[0] = startingCoordinates[0];
		}else if(singleCommand == 'b'){
			startingCoordinates[1] = startingCoordinates[1] - 1;
			startingCoordinates[0] = startingCoordinates[0];
		}else{
			alert('North: Not supposed to get here');
		}
		return startingCoordinates;
	},

	east: function (startingCoordinates, singleCommand) {
		if (singleCommand == 'f'){
			startingCoordinates[1] = startingCoordinates[1];
			startingCoordinates[0] = startingCoordinates[0] + 1;
		}else if(singleCommand == 'b'){
			startingCoordinates[1] = startingCoordinates[1];
			startingCoordinates[0] = startingCoordinates[0] + 1;
		}else{
			alert('North: Not supposed to get here');
		}
		return startingCoordinates;
	},

	south: function (startingCoordinates, singleCommand) {
		if (singleCommand == 'f'){
			startingCoordinates[1] = startingCoordinates[1] - 1;
			startingCoordinates[0] = startingCoordinates[0];
		}else if(singleCommand == 'b'){
			startingCoordinates[1] = startingCoordinates[1] + 1;
			startingCoordinates[0] = startingCoordinates[0];
		}else{
			alert('North: Not supposed to get here');
		}
		return startingCoordinates;
	},

	west: function (startingCoordinates, singleCommand) {
		if (singleCommand == 'f'){
			startingCoordinates[1] = startingCoordinates[1];
			startingCoordinates[0] = startingCoordinates[0] - 1;
		}else if(singleCommand == 'b'){
			startingCoordinates[1] = startingCoordinates[1];
			startingCoordinates[0] = startingCoordinates[0] + 1;
		}else{
			alert('North: Not supposed to get here');
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
