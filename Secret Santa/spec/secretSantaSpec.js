describe("Secret Santa Gift Exchange", function(){
	var nuggets = ['Darrell Arthur', 'Aaron Brooks', 'Wilson Chandler', 'Kenneth Faried', 'Evan Fournier', 'Randy Foye', 'Danilo Gallinari', 'JJ Hickson', 'Ty Lawson', 'JaVale McGee', 'Quincy Miller', 'Timofey Mozgov', 'Anthony Randolph', 'Nate Robinson', 'Jan Vesely'];
	it("Checks for function to return empty array", function () {
		
		expect(secretSanta.pairPeople()).toEqual([]);
	});

	it("Checks for function to return empty array", function () {
		var familyMembers = ['Jane', 'Jack', 'James'];

		expect(secretSanta.pairPeople(familyMembers)).not.toContain('Darrell Arthur');
	});
});
// describe("MarsRover Kata Tests", function() {
//   var command, grid, startingPosition, obstacle;
//   var move = function (startingCoordinates, command, grid, obstacle) {
// 		return marsRover.move(startingCoordinates, command, grid, obstacle);
//   };
//   beforeEach(function(){
// 		obstacle = [];
// 		grid = [30, 30];
// 		startingPosition = [0, 0, 'N'];
// 	});

//   it("moves rover facing north one coordinate forward", function(){
// 		command = ['f'];
		
// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([0,1,'N']);
//   });

//   it("moves rover facing north to face East", function(){
// 		command = ['r'];
		
// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([0,0,'E']);
//   });

//   it("moves rover facing north to face East", function(){
// 		command = ['r', 'f'];
		
// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([1,0,'E']);
//   });

//   it("turns rover right twice and moves forward twice and backwards once", function(){
// 		startingPosition = [5, 6, 'E'];
// 		command = ['r', 'r', 'f', 'f', 'b'];
		
// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([4,6,'W']);
//   });

//   it("wrapping of X axis grid", function(){
// 		startingPosition = [29, 0, 'E'];
// 		command = ['f'];

// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([0, 0, 'E']);
//   });

//   it("wrapping of Y axis grid", function(){
// 		startingPosition = [5, 29, 'N'];
// 		command = ['f'];

// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([5, 0, 'N']);
//   });

//   it("rover encounters obstacle and moves up to the last possible point", function(){
// 		startingPosition = [10, 10, 'E'];
// 		command = ['f', 'f', 'f', 'l', 'f', 'f', 'f'];
// 		obstacle = [13, 12];

// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([13, 11, 'N']);
//   });

//   it("rover encounters obstacle and moves up to the last possible point", function(){
// 		startingPosition = [10, 10, 'S'];
// 		command = ['b', 'b', 'b', 'b', 'b', 'b', 'b'];
// 		obstacle = [10, 12];

// 		expect(move(startingPosition, command, grid, obstacle)).toEqual([10, 11, 'S']);
//   });
// });