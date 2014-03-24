describe("MarsRover Kata Tests", function() {
  var command;
  var move = function (startingCoordinates, command) {
		return marsRover.move(startingCoordinates, command);
  };
  

  it("moves rover facing north one coordinate forward", function(){
		var startingPosition = [0, 0, 'N'];
		command = ['f'];
		
		expect(move(startingPosition, command)).toEqual([0,1,'N']);
  });

  it("moves rover facing north to face East", function(){
		var startingPosition = [0, 0, 'N'];
		command = ['r'];
		
		expect(move(startingPosition, command)).toEqual([0,0,'E']);
  });

  it("moves rover facing north to face East", function(){
		var startingPosition = [0, 0, 'N'];
		command = ['r', 'f'];
		
		expect(move(startingPosition, command)).toEqual([1,0,'E']);
  });

  it("turns rover right twice and moves forward twice and backwards once", function(){
		var startingPosition = [5, 6, 'E'];
		command = ['r', 'r', 'f', 'f', 'b'];
		
		expect(move(startingPosition, command)).toEqual([4,6,'W']);
  });
});