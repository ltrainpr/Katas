describe("MarsRover Kata Tests", function() {
  var command, grid, startingPosition;
  var move = function (startingCoordinates, command, grid) {
		return marsRover.move(startingCoordinates, command, grid);
  };

  it("moves rover facing north one coordinate forward", function(){
		grid = [30, 30];
		startingPosition = [0, 0, 'N'];
		command = ['f'];
		
		expect(move(startingPosition, command, grid)).toEqual([0,1,'N']);
  });

  it("moves rover facing north to face East", function(){
		grid = [30, 30];
		startingPosition = [0, 0, 'N'];
		command = ['r'];
		
		expect(move(startingPosition, command, grid)).toEqual([0,0,'E']);
  });

  it("moves rover facing north to face East", function(){
		grid = [30, 30];
		startingPosition = [0, 0, 'N'];
		command = ['r', 'f'];
		
		expect(move(startingPosition, command, grid)).toEqual([1,0,'E']);
  });

  it("turns rover right twice and moves forward twice and backwards once", function(){
		grid = [30, 30];
		startingPosition = [5, 6, 'E'];
		command = ['r', 'r', 'f', 'f', 'b'];
		
		expect(move(startingPosition, command, grid)).toEqual([4,6,'W']);
  });

  it("wrapping of X axis grid", function(){
		grid = [30, 30];
		startingPosition = [29, 0, 'E'];
		command = ['f'];

		expect(move(startingPosition, command, grid)).toEqual([0, 0, 'E']);
  });

  it("wrapping of Y axis grid", function(){
		grid = [30, 30];
		startingPosition = [5, 29, 'N'];
		command = ['f'];

		expect(move(startingPosition, command, grid)).toEqual([5, 0, 'N']);
  });
});