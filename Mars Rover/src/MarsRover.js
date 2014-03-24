var marsRover = {

	move: function (startingCoordinates, command) {
		var x, y;
		for(var i=0; i < command.length; i++){

			if (command[i] == 'f'){
				y = startingCoordinates[1] + 1;
				x = startingCoordinates[0];
			}else if(command[i] == 'b'){
				y = startingCoordinates[1] - 1;
				x = startingCoordinates[0];
			}else if(command[i] == 'l'){
				y = startingCoordinates[1];
				x = startingCoordinates[0];
				startingCoordinates[2] = marsRover.left(startingCoordinates[2]);
			}else if (command[i] == 'r'){
				y = startingCoordinates[1];
				x = startingCoordinates[0];
				startingCoordinates[2] = marsRover.right(startingCoordinates[2]);
			}
			return [x,y,startingCoordinates[2].toUpperCase()];
		}
	},

	right: function (currentDirection) {
		switch(currentDirection){
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
		switch(currentDirection){
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
