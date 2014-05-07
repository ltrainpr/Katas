describe("MarsRover Kata Tests", function() {
  var command, grid, startingPosition, obstacle;
  var move = function (startingCoordinates, command, grid, obstacle) {
    return marsRover.move(startingCoordinates, command, grid, obstacle);
  };
  beforeEach(function(){
    Array.prototype.compare = function(array){
      if(!array){
        return false;
      }

      if(this.length != array.length){
        return false;
      }

      for(var i = 0, l=this.length; i < l; i++) {
        if(this[i] instanceof Array && array[i] instanceof Array){
          if(!this[i].compare(array[i])){
            return false;
          }
        } else if (this[i] != array[i]){
          return false;
        }
      }
      return true;
    };
		obstacle = [];
		grid = [30, 30];
		startingPosition = [0, 0, 'N'];
	});

  it("moves rover facing north one coordinate forward", function(){
		command = ['f'];

		expect(move(startingPosition, command, grid, obstacle)).toEqual([0,1,'N']);
  });

  // it("moves rover facing north to face East", function(){
		// command = ['r'];

		// expect(move(startingPosition, command, grid, obstacle)).toEqual([0,0,'E']);
  // });

  // it("moves rover facing north to face East and goes forward", function(){
		// command = ['r', 'f'];

		// expect(move(startingPosition, command, grid, obstacle)).toEqual([1,0,'E']);
  // });

  // it("turns rover right twice and moves forward twice and backwards once", function(){
		// startingPosition = [5, 6, 'E'];
		// command = ['r', 'r', 'f', 'f', 'b'];

		// expect(move(startingPosition, command, grid, obstacle)).toEqual([4,6,'W']);
  // });

  // it("wrapping of X axis grid", function(){
		// startingPosition = [29, 0, 'E'];
		// command = ['f'];

		// expect(move(startingPosition, command, grid, obstacle)).toEqual([0, 0, 'E']);
  // });

  // it("wrapping of Y axis grid", function(){
		// startingPosition = [5, 29, 'N'];
		// command = ['f'];

		// expect(move(startingPosition, command, grid, obstacle)).toEqual([5, 0, 'N']);
  // });

  // it("rover encounters obstacle and moves up to the last possible point", function(){
		// startingPosition = [10, 10, 'E'];
		// command = ['f', 'f', 'f', 'l', 'f', 'f', 'f'];
		// obstacle = [13, 12];

		// expect(move(startingPosition, command, grid, obstacle)).toEqual([13, 11, 'N']);
  // });

  // it("rover encounters obstacle and moves up to the last possible point", function(){
  //   startingPosition = [10, 10, 'S'];
  //   command = ['b', 'b', 'b', 'b', 'b', 'b', 'b'];
  //   obstacle = [10, 12];

  //   expect(move(startingPosition, command, grid, obstacle)).toEqual([10, 11, 'S']);
  // });

  // it("rover encounters obstacle and moves up to the last possible point", function(){
		// startingPosition = [4, 4, 'S'];
		// command = ['l', 'b'];
		// obstacle = [3, 4];

		// expect(move(startingPosition, command, grid, obstacle)).toEqual([4, 4, 'E']);
  // });
});