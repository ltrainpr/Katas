describe("MarsRover Kata Tests", function() {
  var command;
  var move = function (startingCoordinates, command) {
		return marsRover.move(startingCoordinates, command);
  };

  var variables = function (xAxis, yAxis, direction) {
		return [xAxis, yAxis, direction.toLowerCase()];
  };

  it("moves rover facing north one coordinate forward", function(){
		var startingPosition = variables(0, 0, 'N');
		command = ['f'];
		
		expect(move(startingPosition, command)).toEqual([0,1,'N']);
  });

  it("moves rover facing north to face East", function(){
		var startingPosition = variables(0, 0, 'N');
		command = ['r'];
		
		expect(move(startingPosition, command)).toEqual([0,0,'E']);
  });

  it("moves rover facing north to face West", function(){
		var startingPosition = variables(0, 0, 'N');
		command = ['l'];
		
		expect(move(startingPosition, command)).toEqual([0,0,'W']);
  });

  it("turns rover left and moves forward one", function(){
		var startingPosition = variables(0, 0, 'N');
		command = ['l', 'f'];
		
		expect(move(startingPosition, command)).toEqual([-1,0,'W']);
  });
});